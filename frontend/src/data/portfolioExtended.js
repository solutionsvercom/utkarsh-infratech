export const ongoingProjects = [
  {
    id: 'singh-automobiles-fatehpur',
    title: 'Singh Automobiles (Fatehpur)',
    location: 'Fatehpur, Uttar Pradesh',
    imageUrl:
      'https://images.unsplash.com/photo-1581093196277-9f6078e5e0e2?auto=format&fit=crop&w=1400&q=80',
    description:
      'Construction of a TATA Motors showroom (~13,800 sq ft) and workshop MS shed (~19,800 sq ft), with execution focused on quality, durability, and efficient space planning.',
    highlights: [
      'Development of an 8-acre farm area',
      'Boundary wall',
      'Store shed',
      'Farmhouse residential building',
      'Artificial lake',
      'Internal CC roads',
      'Site infrastructure and civil development',
    ],
  },
  {
    id: 'alwar-ecoharvest-farm',
    title: 'Alwar Ecoharvest Farm',
    location: 'Alwar, Rajasthan',
    imageUrl:
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=80',
    description:
      'Large-scale eco farm infrastructure project focused on sustainable and functional land utilization.',
    highlights: [
      'Residential, agricultural, and utility civil works',
      'Site development',
      'Boundary works',
      'Road access',
      'Utility structures',
      'Eco-friendly infrastructure planning',
    ],
  },
];

export const equipmentItems = [
  {
    id: 'jcb-machine',
    name: 'JCB Machine',
    quantity: 'x1',
    iconKey: 'truck',
  },
  {
    id: 'concrete-mixer-with-lift',
    name: 'Concrete Mixer with Lift',
    quantity: 'x3',
    iconKey: 'box',
  },
  {
    id: 'shuttering-material',
    name: 'Shuttering Material',
    quantity: '10,000 Sqft',
    iconKey: 'grid',
  },
  {
    id: 'plate-vibrator',
    name: 'Plate Vibrator',
    quantity: 'x2',
    iconKey: 'move-vertical',
  },
  {
    id: 'needle-vibrator',
    name: 'Needle Vibrator',
    quantity: 'x3',
    iconKey: 'activity',
  },
  {
    id: 'ms-column-shuttering',
    name: 'MS Column Shuttering',
    quantity: 'Available',
    iconKey: 'building',
  },
  {
    id: 'scaffolding',
    name: 'Scaffolding',
    quantity: '3,000 Sqft',
    iconKey: 'layers',
  },
  {
    id: 'heavy-hilti-machine',
    name: 'Heavy Hilti Machine',
    quantity: 'x3',
    iconKey: 'hammer',
  },
  {
    id: 'monkey-lift-machine',
    name: 'Monkey Lift Machine',
    quantity: 'x2',
    iconKey: 'up',
  },
  {
    id: 'tractor-with-trolley',
    name: 'Tractor with Trolley',
    quantity: 'x1',
    iconKey: 'truck',
  },
  {
    id: 'water-tanker',
    name: 'Water Tanker',
    quantity: 'x1',
    iconKey: 'droplets',
  },
];

export function getOngoingProjectsJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Utkarsh Infratech Ongoing Projects',
    itemListElement: ongoingProjects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        areaServed: project.location,
        image: project.imageUrl,
      },
    })),
  };
}

// TODO: Add these files under /public/work-orders/ in frontend:
// - work-order-pnc-rest-areas.pdf
// - work-order-rcc-drain.pdf
// - work-order-jjm-oht-pumphouse.pdf
export const workOrderDocuments = [
  {
    id: 'pnc-rest-areas',
    title: 'Work Order - Rest Areas & Bus Stops',
    issuedBy: 'PNC Infratech Pvt. Ltd.',
    date: '2024-11-10',
    fileName: 'work-order-pnc-rest-areas.pdf',
  },
  {
    id: 'rcc-drain',
    title: 'Work Order - RCC Drain Package',
    issuedBy: 'PNC Infratech Pvt. Ltd.',
    date: '2025-01-18',
    fileName: 'work-order-rcc-drain.pdf',
  },
  {
    id: 'jjm-oht',
    title: 'Work Order - OHT & Pump House',
    issuedBy: 'Project Authority (JJM)',
    date: '2025-03-04',
    fileName: 'work-order-jjm-oht-pumphouse.pdf',
  },
];

export function workOrderPdfUrl(fileName) {
  return `/work-orders/${fileName}`;
}
