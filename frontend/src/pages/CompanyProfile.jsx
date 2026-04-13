import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  Eye,
  HardHat,
  Landmark,
  MapPin,
  Mail,
  Phone,
  Target,
  Star,
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55 },
};

function SectionCard({ icon: Icon, title, children }) {
  return (
    <motion.div
      {...fadeUp}
      className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
    >
      <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-300" />
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
            <Icon className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="text-gray-700 leading-relaxed">{children}</div>
      </div>
    </motion.div>
  );
}

function ListBlock({ items, icon: Icon = CheckCircle2 }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Icon className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <span className="text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-gray-100 last:border-0">
      <span className="text-orange-600 font-semibold text-sm uppercase tracking-wide sm:w-36 shrink-0">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}

function ContactCard({ icon: Icon, title, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 flex flex-col gap-3 hover:border-orange-300 transition-colors duration-300">
      <div className="flex items-center gap-2.5 text-orange-600">
        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed break-all">{value}</p>
    </div>
  );
}

export default function CompanyProfile() {
  const overview =
    'Utkarsh Infratech Builder and Contractor is a trusted name in the field of construction. We specialize in high-quality building, road, and infrastructure projects across Uttar Pradesh and other regions. Our aim is to deliver excellence through strong work ethics, timely completion, and sustainable construction practices.';

  const vision =
    'To become a leading and most reliable construction company recognized for its commitment, innovation, and excellence in every project undertaken.';

  const missionItems = [
    'Deliver quality infrastructure projects with modern construction techniques.',
    'Maintain high standards of safety, reliability, and performance.',
    'Ensure complete client satisfaction through cost-effective and durable solutions.',
    'Continuously improve workforce efficiency and project execution capability.',
  ];

  const services = [
    'Civil & Building Construction',
    'Road & Highway Works',
    'Industrial & Institutional Construction',
    'Overhead Tank and Pump House Works',
    'Drainage and Sewage Construction',
    'Renovation & Interior Works',
    'Waterproofing and Finishing Works',
  ];

  const certifications = [
    'Registered with Uttar Pradesh Construction and Infrastructure Development Corporation Limited (Lucknow)',
    'Registered Contractor — Irrigation Department, Lucknow',
    'Registered with Labour Department (U.P.)',
    'ESIC Certified Contractor',
    'EPF Registered',
    'MSME Registered Unit',
  ];

  const majorProjectsPnc = [
    'Construction of 2 Rest Areas (Truck Lay Bye) and 10 Bus Stops on Chakeri-Allahabad 6-Lane Highway.',
    'Construction of RCC Drain (3 km) — Chakeri-Allahabad 6-Lane Highway.',
    'Construction of 3 Overhead Tanks (OHT) and Pump House — Complete Civil & Mechanical Work under JJM Project, Barabanki.',
  ];

  const majorProjectsDps = [
    "Construction of Girls' Hostel (6,100 Sqft) — DPS Bareilly",
    'Construction of 10,000 Sqft Basketball / Multipurpose Professional Court — DPS Bareilly',
    'Construction of 3 Professional Badminton Courts — DPS Bareilly',
    'Construction of Lift and Renovation of 12 Toilets — DPS Bareilly',
    'Renovation of 12 Toilets — DPS Lucknow',
    'Paver Block Laying Work (Approx. 5,000 Sqft) — DPS Bareilly',
    'Brick Bat Coba Work (Approx. 10,000 Sqft) — DPS Bareilly',
    'External and Internal Painting — Academic Building, New Classroom & Old Classroom Blocks',
  ];

  const majorProjectsNiranjan = ['Renovation of ADA Club House, Agra.'];

  const clientele = [
    'PNC Infratech Pvt. Ltd.',
    'Superhouse Group, Kanpur (DPS Bareilly & Lucknow)',
    'Niranjan Kumar Garg & Sons, Agra',
  ];

  const strengths = [
    'Experienced and qualified management team.',
    'Strong reputation for timely completion of projects.',
    'Commitment to high-quality standards and client satisfaction.',
    'Skilled workforce and use of modern equipment.',
    'Financial stability and technical expertise.',
  ];

  const stats = [
    { label: 'Years Active', value: '5+' },
    { label: 'Projects Done', value: '20+' },
    { label: 'State Coverage', value: 'U.P.' },
    { label: 'MSME Status', value: 'Certified' },
  ];

  return (
    <main className="bg-gray-50 text-gray-900 min-h-screen">
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1541976590-713941681591?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/45" />
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 right-20 w-80 h-80 border border-orange-500 rotate-45" />
          <div className="absolute bottom-16 left-20 w-56 h-56 border border-orange-500 rotate-12" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2.5 bg-orange-500/20 border border-orange-500/30 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
              <Building2 className="w-4 h-4 text-orange-400" />
              <span className="text-orange-300 text-sm font-semibold tracking-widest uppercase">Utkarsh Infratech</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 leading-[1.05] text-white">
              Company
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Profile</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-3 font-medium tracking-wide">
              Builder &amp; Contractor — Est. Lucknow, U.P.
            </p>
            <p className="text-xl sm:text-2xl text-gray-200 italic font-light">
              "Building Trust Through Quality Construction"
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm px-6 py-4 text-center"
                >
                  <p className="text-2xl font-bold text-orange-400">{s.value}</p>
                  <p className="text-xs text-gray-300 uppercase tracking-widest mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 space-y-10">
          <SectionCard icon={Briefcase} title="Company Overview">
            <p className="text-lg leading-loose">{overview}</p>
          </SectionCard>

          <div className="grid lg:grid-cols-2 gap-8">
            <SectionCard icon={Eye} title="Vision">
              <p className="text-lg leading-loose">{vision}</p>
            </SectionCard>
            <SectionCard icon={Target} title="Mission">
              <ListBlock items={missionItems} />
            </SectionCard>
          </div>

          <SectionCard icon={HardHat} title="Our Services">
            <div className="grid sm:grid-cols-2 gap-3 mt-1">
              {services.map((s) => (
                <div key={s} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 hover:border-orange-300 transition-colors duration-300">
                  <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <span className="text-gray-800 text-sm font-medium">{s}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard icon={BadgeCheck} title="Registration Details">
            <div className="divide-y divide-gray-100">
              <DetailRow label="Company Name" value="Utkarsh Infratech Builder and Contractor" />
              <DetailRow label="Type" value="Contractor / Builder / Civil Construction" />
              <DetailRow label="GST No." value="09BXSPM6841FZW" />
              <DetailRow label="PAN No." value="BXSPM6841F" />
              <DetailRow label="Address" value="Khasra No. 1229, Meera Vihar, Panchamkheda Road, RBL Road, Lucknow — 226002" />
              <DetailRow label="Contact" value="+91 8770916755 / +91 7509123767" />
              <DetailRow label="Email" value="utkarshinfra170222@gmail.com" />
            </div>
          </SectionCard>

          <SectionCard icon={BadgeCheck} title="Certifications &amp; Departmental Registrations">
            <ListBlock items={certifications} />
          </SectionCard>

          <SectionCard icon={Landmark} title="Major Projects">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-4 py-1.5 mb-4">
                  <Star className="w-3 h-3 text-orange-600" />
                  <span className="text-orange-700 text-xs font-semibold tracking-wide uppercase">PNC Infratech Pvt. Ltd.</span>
                </div>
                <ListBlock items={majorProjectsPnc} />
              </div>
              <div className="h-px bg-gray-100" />
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-4 py-1.5 mb-4">
                  <Star className="w-3 h-3 text-orange-600" />
                  <span className="text-orange-700 text-xs font-semibold tracking-wide uppercase">Superhouse Group — DPS Bareilly &amp; Lucknow</span>
                </div>
                <ul className="space-y-3">
                  {majorProjectsDps.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="h-px bg-gray-100" />
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-4 py-1.5 mb-4">
                  <Star className="w-3 h-3 text-orange-600" />
                  <span className="text-orange-700 text-xs font-semibold tracking-wide uppercase">Niranjan Kumar Garg &amp; Sons, Agra</span>
                </div>
                <ListBlock items={majorProjectsNiranjan} />
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={Briefcase} title="Our Clientele">
            <div className="grid sm:grid-cols-3 gap-4 mt-1">
              {clientele.map((c) => (
                <div key={c} className="rounded-xl border border-gray-200 bg-gray-50 p-5 hover:border-orange-300 transition-colors duration-300 text-center">
                  <div className="w-10 h-10 rounded-full bg-orange-100 mx-auto mb-3 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-gray-800 text-sm font-medium leading-relaxed">{c}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard icon={CheckCircle2} title="Our Strengths">
            <ListBlock items={strengths} />
          </SectionCard>

          <SectionCard icon={MapPin} title="Contact Information">
            <div className="grid sm:grid-cols-3 gap-4">
              <ContactCard icon={MapPin} title="Office Address" value="Khasra No. 1229, Meera Vihar, Panchamkheda Road, RBL Road, Lucknow 226002" />
              <ContactCard icon={Phone} title="Mobile" value="+91 8770916755 / +91 7509123767" />
              <ContactCard icon={Mail} title="Email" value="utkarshinfra170222@gmail.com" />
            </div>
          </SectionCard>
        </div>

        <motion.div {...fadeUp} className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <Building2 className="w-4 h-4 text-orange-500" />
            <span>© {new Date().getFullYear()} Utkarsh Infratech Builder and Contractor. All rights reserved.</span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}