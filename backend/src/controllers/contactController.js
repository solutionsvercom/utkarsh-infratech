const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { renderSubmitterThankYou } = require('../templates/renderSubmitterThankYou');

function escapeHtml(s) {
  if (s == null || s === '') return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createMailTransport() {
  const host = process.env.EMAIL_HOST;
  const user = String(process.env.EMAIL_USER || '').trim();
  // Gmail app passwords are 16 chars; users often paste with spaces.
  const pass = String(process.env.EMAIL_PASS || '').replace(/\s+/g, '');
  if (!host || !user || !pass) {
    return null;
  }
  const port = Number(process.env.EMAIL_PORT) || 587;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function wasAccepted(info, targetEmail) {
  const accepted = Array.isArray(info?.accepted) ? info.accepted : [];
  const rejected = Array.isArray(info?.rejected) ? info.rejected : [];
  const normalizedTarget = String(targetEmail || '').toLowerCase();

  if (rejected.length > 0) return false;
  if (!normalizedTarget) return accepted.length > 0;
  return accepted.some((addr) => String(addr).toLowerCase() === normalizedTarget);
}

/** Logo for inline CID image (fallback: frontend asset path in dev) */
function resolveLogoPath() {
  const candidates = [
    path.join(__dirname, '..', '..', 'assets', 'logo.png'),
    path.join(__dirname, '..', '..', '..', 'frontend', 'src', 'assets', 'images', 'Logo.png'),
  ];
  return candidates.find((p) => fs.existsSync(p)) || null;
}

function buildCompanyEnquiryHtml(name, phone, email, message) {
  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email || 'Not provided');
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br/>');
  return `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;color:#1e293b;">
  <h2 style="color:#1e1b4b;">New contact form submission</h2>
  <p><strong>Name:</strong> ${safeName}</p>
  <p><strong>Phone:</strong> ${safePhone}</p>
  <p><strong>Email:</strong> ${safeEmail}</p>
  <p><strong>Message:</strong></p>
  <p style="white-space:pre-wrap;border-left:4px solid #f97316;padding-left:12px;">${safeMessage}</p>
</body></html>`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.submitContact = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, and message are required',
      });
    }

    if (!email || !EMAIL_RE.test(String(email).trim())) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required so we can confirm your enquiry.',
      });
    }

    const transporter = createMailTransport();
    if (!transporter) {
      console.error('SMTP not configured: set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS in backend/.env');
      return res.status(503).json({
        success: false,
        message: 'Email is not configured on the server. Please call or email us directly.',
      });
    }

    const authUser = String(process.env.EMAIL_USER || '').trim();
    const fromAddr = process.env.EMAIL_FROM || authUser;
    const companyInbox = process.env.COMPANY_EMAIL || process.env.EMAIL_USER;
    const trimmedEmail = String(email).trim();
    const safeMessage = escapeHtml(message);
    const greetingName = escapeHtml(name.trim().split(/\s+/)[0] || 'there');

    const logoPath = resolveLogoPath();
    const hasLogo = Boolean(logoPath);
    const logoBlock = hasLogo
      ? '<img src="cid:utkarsh-logo" alt="Utkarsh Infratech" width="120" style="display:block;margin:0 auto 16px;border:0;" />'
      : '';
    const attachments = hasLogo
      ? [
          {
            filename: 'logo.png',
            path: logoPath,
            cid: 'utkarsh-logo',
          },
        ]
      : [];

    const companyMail = {
      from: fromAddr,
      to: companyInbox,
      replyTo: trimmedEmail,
      subject: `New enquiry from ${name} — Utkarsh Infratech`,
      html: buildCompanyEnquiryHtml(name, phone, trimmedEmail, message),
    };

    const companyResult = await transporter.sendMail(companyMail);
    console.log('Company mail result:', {
      accepted: companyResult.accepted,
      rejected: companyResult.rejected,
      response: companyResult.response,
    });
    if (!wasAccepted(companyResult, companyInbox)) {
      throw new Error(`Company mailbox delivery rejected: ${JSON.stringify(companyResult?.rejected || [])}`);
    }

    const thankYouMail = {
      from: fromAddr,
      to: trimmedEmail,
      envelope: {
        from: authUser,
        to: [trimmedEmail],
      },
      replyTo: companyInbox,
      subject: 'Thank you for contacting Utkarsh Infratech',
      html: renderSubmitterThankYou({
        greetingName,
        messageBody: safeMessage,
        logoBlock,
      }),
      text: `Hello ${greetingName},

Thank you for reaching out to Utkarsh Infratech.
We have received your enquiry and our team will contact you shortly.

Your message:
${message}

Regards,
Utkarsh Infratech`,
      attachments,
    };

    let thankYouDelivered = false;
    try {
      const thankYouResult = await transporter.sendMail(thankYouMail);
      console.log('Submitter mail result (primary):', {
        accepted: thankYouResult.accepted,
        rejected: thankYouResult.rejected,
        response: thankYouResult.response,
      });
      thankYouDelivered = wasAccepted(thankYouResult, trimmedEmail);
      if (!thankYouDelivered) {
        throw new Error(`Submitter delivery rejected: ${JSON.stringify(thankYouResult?.rejected || [])}`);
      }
    } catch (replyErr) {
      console.error('Thank-you email failed, retrying without inline logo/template:', replyErr);
      try {
        const fallbackResult = await transporter.sendMail({
          from: fromAddr,
          to: trimmedEmail,
          envelope: {
            from: authUser,
            to: [trimmedEmail],
          },
          replyTo: companyInbox,
          subject: 'Thank you for contacting Utkarsh Infratech',
          text: `Hello ${greetingName},

Thank you for reaching out to Utkarsh Infratech.
We have received your enquiry and our team will contact you shortly.

Regards,
Utkarsh Infratech`,
        });
        console.log('Submitter mail result (fallback):', {
          accepted: fallbackResult.accepted,
          rejected: fallbackResult.rejected,
          response: fallbackResult.response,
        });
        thankYouDelivered = wasAccepted(fallbackResult, trimmedEmail);
      } catch (fallbackErr) {
        console.error('Fallback thank-you email also failed:', fallbackErr);
      }
    }

    if (!thankYouDelivered) {
      return res.status(202).json({
        success: true,
        message: 'Enquiry received, but confirmation email to sender could not be delivered.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Thank you! We will contact you soon.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.',
    });
  }
};
