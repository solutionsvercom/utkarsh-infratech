/**
 * Construction work orders
 *
 * ADD A NEW WORK ORDER:
 * 1. Copy your PDF into:  public/portfolio/work-orders/
 * 2. Add an entry below with matching `file` filename.
 */

export const workOrders = [
  {
    id: 'wo-nirvana-restaurant-block',
    title: 'Restaurant Block Civil Works',
    description:
      'Labour contract for restaurant block construction works including brickwork, shuttering, steel reinforcement, parapet wall construction, and external plastering under the Chakeri–Allahabad NH-2 project.',
    issuedBy: 'Nirvana Infratech',
    date: null,
    file: 'Nirvana Infratech-restaurant-block-civil-works.pdf',
  },
  {
    id: 'wo-drain-separator',
    title: 'Drain & Separator Civil Works',
    description:
      'Civil work contract for drain construction, PCC works, shuttering, reinforcement, separator works, and related highway infrastructure on the Chakeri–Allahabad NH-2 project.',
    issuedBy: 'PNC Infratech Pvt. Ltd.',
    date: null,
    file: 'Pnc-drain-separator-civil-works.pdf',
  },
  {
    id: 'wo-truck-lay-bye',
    title: 'Truck Lay Bye Construction',
    description:
      'Construction of a Truck Lay Bye facility including earthwork, RCC work, masonry, flooring, waterproofing, electrical, plumbing, and finishing works on the Chakeri–Allahabad NH-2 project.',
    issuedBy: 'PNC Infratech Pvt. Ltd.',
    date: null,
    file: 'PNC-truck-lay-bye-construction.pdf',
  },
  {
    id: 'wo-oht-pumphouse',
    title: 'OHT & Pump House',
    description:
      'Civil construction and finishing works including boundary wall construction, plastering, painting, labour deployment, and associated infrastructure works for the OHT & Pump House project.',
    issuedBy: 'IRCON International Pvt. Ltd.',
    date: null,
    file: 'ircon-oht-pump-house.pdf',
  },
  {
    id: 'wo-dps-bareilly-hostel',
    title: 'DPS Bareilly Hostel',
    description:
      'Comprehensive civil and finishing work contract for the DPS Bareilly Hostel project, including RCC, masonry, flooring, electrical, plumbing, aluminium works, painting, waterproofing, and miscellaneous construction activities.',
    issuedBy: 'Super House Education Foundation, DPS Bareilly',
    date: null,
    file: 'dps-bareilly-hostel-work-order.pdf',
  },
  {
    id: 'wo-highway-nest-toll-plaza',
    title: 'Highway Nest — Toll Plaza 1 (Ch. 527+310)',
    category: 'PNC Highway Package',
    description:
      'Construction of 2 Nos. Highway Nest buildings at Toll Plaza 1 on the Chakeri–Allahabad Highway project, including civil works, structural works, flooring, waterproofing, electrical works, plumbing, painting, doors, windows, and finishing works as per PNC specifications.',
    issuedBy: 'PNC Infratech Limited',
    date: null,
    file: 'Highway_Nest_Toll_Plaza_Ch527-310_PNC.pdf',
  },
  {
    id: 'wo-bus-shelters',
    title: 'Bus Shelters — Chakeri–Allahabad Highway',
    category: 'PNC Highway Package',
    description:
      'Construction of 4 Bus Shelters at Chainages Ch.619+650 (LHS), Ch.620+835, Ch.625+112, and Ch.628+160 (RHS) on the Chakeri–Allahabad Highway project, including complete civil construction and finishing works.',
    issuedBy: 'PNC Infratech Limited',
    date: null,
    file: 'Bus_Shelters_Chakeri_Allahabad_Highway_PNC.pdf',
  },
  {
    id: 'wo-boundary-wall-pump-house-jjm',
    title: 'Boundary Wall & Pump House — JJM Barabanki',
    category: 'Jal Jeevan Mission',
    description:
      'Construction of boundary walls, MS gates, interlocking pavement, drainage works, pump house structures, chlorination rooms, and associated civil infrastructure under the Jal Jeevan Mission (JJM) Barabanki Water Project.',
    issuedBy: 'PNC Infratech Limited',
    date: null,
    file: 'Boundary_Wall_Pump_House_JJM_Barabanki_PNC.pdf',
  },
];

export function workOrderFileUrl(filename) {
  return `/portfolio/work-orders/${encodeURIComponent(filename)}`;
}

export function getWorkOrderFileUrl(item) {
  return workOrderFileUrl(item.file);
}
