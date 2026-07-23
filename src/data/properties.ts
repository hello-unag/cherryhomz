// ─────────────────────────────────────────────
// Cherry Homz – Mock Property Data & Interfaces
// ─────────────────────────────────────────────

/* ───── Interfaces ───── */

export interface Property {
  id: string;
  title: string;
  address: string;
  suburb: string;
  state: string;
  price: number;
  priceLabel: string;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  area?: number; // sqm – omit when not available
  imageObjectFit?: 'cover' | 'contain';
  image: string;
  gallery?: string[];
  floorplan?: string;
  inspectionTimes?: string[];
  agent?: {
    name: string;
    photo: string;
    phone: string;
    email: string;
  };
  category: "buy" | "rent" | "sold" | "land";
  type: "house" | "apartment" | "townhouse" | "land";
  description: string;
  features: string[];
  coordinates: { lat: number; lng: number };
  postcode?: string;
  isNew: boolean;
  isFeatured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar: string; // initials
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix: string;
}

export interface Category {
  label: string;
  value: Property["category"];
  icon: string;
  count: number;
}

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
}

/* ───── Properties ───── */

export const properties: Property[] = [
  {
    id: "prop-strathfield-showcase",
    title: "Luxury Modern Residence – Strathfield",
    address: "Strathfield NSW",
    suburb: "Strathfield",
    state: "NSW",
    price: 0,
    priceLabel: "Showcase Only",
    bedrooms: 5,
    bathrooms: 4.5,
    carSpaces: 2,
    image: "/images/prop-strathfield-facade.png?v=2",
    gallery: [
      "/images/prop-strathfield-facade.png?v=2",
      "/images/prop-strathfield-interior.png?v=2",
      "/images/prop-strathfield-living.png?v=2",
      "/images/prop-strathfield-kitchen.png?v=2",
      "/images/prop-strathfield-void-high.png?v=2",
      "/images/prop-strathfield-pool.png?v=2",
      "/images/prop-strathfield-bedroom.png?v=2",
    ],
    category: "sold",
    type: "house",
    description:
      "A masterpiece of contemporary architectural design, this high-end double-storey home in Strathfield showcases the absolute pinnacle of luxury living. The house features an impressive architectural facade characterized by bold vertical slats, clean geometric lines, and a warm under-eave glow. Inside, a dramatic double-height void living space creates an abundance of natural light and volumetric scale, featuring glass balustrades, floating hardwood stairs, and premium polished marble flooring overlooking the private swimming pool.",
    features: [
      "Stunning double-height void living room with floor-to-ceiling windows",
      "Architectural facade with distinct vertical feature columns",
      "Open-plan gourmet kitchen with integrated butler's pantry",
      "Premium floating timber staircase with seamless glass balustrade",
      "Polished marble tiling throughout the ground floor",
      "Under-eave feature lighting and professional landscape design",
      "Double lock-up garage with internal access",
      "Direct sightlines to the rear entertaining patio and swimming pool",
    ],
    coordinates: { lat: -33.8808, lng: 151.0836 },
    isNew: false,
    isFeatured: true,
  },
  {
    id: "prop-wahroonga-showcase",
    title: "Contemporary Luxury Estate – Wahroonga",
    address: "Wahroonga NSW",
    suburb: "Wahroonga",
    state: "NSW",
    price: 0,
    priceLabel: "Showcase Only",
    bedrooms: 5,
    bathrooms: 4,
    carSpaces: 2,
    image: "/images/prop-wahroonga-facade.png?v=2",
    gallery: [
      "/images/prop-wahroonga-facade.png?v=2",
      "/images/prop-wahroonga-void.png?v=2",
      "/images/prop-wahroonga-living.png?v=2",
      "/images/prop-wahroonga-alfresco.png?v=2",
      "/images/prop-wahroonga-rumpus.png?v=2",
      "/images/prop-wahroonga-bathroom.png?v=2",
      "/images/prop-wahroonga-bedroom.png?v=2",
      "/images/prop-wahroonga-cinema.png?v=2",
      "/images/prop-wahroonga-backyard.png?v=2",
    ],
    category: "sold",
    type: "house",
    description:
      "Nestled in the leafy enclave of Wahroonga, this magnificent double-storey luxury residence is a showcase of grand scale and contemporary design. Specially constructed on a beautifully elevated block, the home welcomes you with an impressive stone-clad retaining wall, manicured gardens, and a grand entrance facade with warm feature lighting. Internally, the house exhibits a spectacular double-height formal lounge with dramatic high-set windows, brown leather sofas, and an elegant chandelier. The expansive open-plan rear family room flows seamlessly to a covered outdoor alfresco kitchen, while a private home theatre/cinema room with acoustic walls and a high-definition projector screen offers the ultimate entertainment space. Upstairs, a separate rumpus retreat with polished timber floorboards opens to an elevated balcony, alongside a lavish master bedroom suite and premium bathrooms featuring freestanding tubs and double vanities.",
    features: [
      "Stunning double-storey facade with stone retaining walls and manicured gardens",
      "Grand formal living room featuring a double-height void and statement chandelier",
      "Custom acoustic home cinema room equipped with HD projector and ambient downlights",
      "Expansive open-plan living, dining and family zones with sleek tiled floors",
      "Covered alfresco dining area with built-in BBQ, sink, and ceiling fan overlooking the grassy lawn",
      "Separate upper-level rumpus retreat with polished hardwood floorboards",
      "Gourmet kitchen with island waterfall bench and premium integrated appliances",
      "Luxury master bedroom suite with high tufted leather headboard and sitting area",
      "Designer bathrooms with freestanding oval bathtubs, double vanities and floor-to-ceiling tiling",
    ],
    coordinates: { lat: -33.7225, lng: 151.1158 },
    isNew: false,
    isFeatured: true,
  },
  {
    id: "prop-thornleigh-showcase",
    title: "Modern Custom Masterpiece – Thornleigh",
    address: "Thornleigh NSW",
    suburb: "Thornleigh",
    state: "NSW",
    price: 0,
    priceLabel: "Showcase Only",
    bedrooms: 4,
    bathrooms: 3.5,
    carSpaces: 2,
    image: "/images/prop-thornleigh-facade.png?v=2",
    gallery: [
      "/images/prop-thornleigh-facade.png?v=2",
      "/images/prop-thornleigh-sign.png?v=2",
      "/images/prop-thornleigh-void.png?v=2",
      "/images/prop-thornleigh-dining.png?v=2",
      "/images/prop-thornleigh-office.png?v=2",
      "/images/prop-thornleigh-pool.png?v=2",
      "/images/prop-thornleigh-bedroom.png?v=2",
      "/images/prop-thornleigh-patio-table.png?v=2",
      "/images/prop-thornleigh-patio-bbq.png?v=2",
      "/images/prop-thornleigh-bathroom.png?v=2",
    ],
    category: "sold",
    type: "house",
    description:
      "Located at 30 Yaralla Crescent in Thornleigh, this newly completed custom double-storey home displays unmatched quality and design. An illuminated floating step path leads you past tropical gardens to a grand entry porch featuring a warm varnished timber ceiling and a beautiful grey textured brick facade. Inside, the home boasts a breathtaking step-down formal living room with a spectacular double-height ceiling, three golden mesh pendant lights, and a vibrant floor-to-ceiling abstract feature wall mural. The open-plan layout connects a spacious dining area and state-of-the-art kitchen to a semi-enclosed outdoor patio with a built-in BBQ kitchen, overlooking a grassy lawn and a resort-style swimming pool with blue LED lighting. Accommodations include large bedrooms with built-in robes and dedicated study desks, alongside luxury terrazzo-tiled bathrooms equipped with black-and-white marble vessel basins and backlit LED mirrors.",
    features: [
      "Custom architectural concrete address plinth at 30 Yaralla Crescent",
      "Illuminated timber floating step entry path with integrated LED strip lighting",
      "Spectacular double-height void living room with a floor-to-ceiling abstract art mural",
      "Resort-style inground swimming pool with blue LED under-water lighting",
      "Semi-enclosed outdoor dining patio with timber ceiling, built-in kitchen, sink, and BBQ",
      "Open-plan dining area with a glass table, mustard yellow seating, and stone island kitchen",
      "Luxury home office with a teal feature wall, double workstation, and dark oak open library shelving",
      "Designer terrazzo-tiled bathrooms with marble vessel basins and backlit LED mirrors",
    ],
    coordinates: { lat: -33.7297, lng: 151.0772 },
    isNew: false,
    isFeatured: true,
  },
  {
    id: "prop-marsden-28",
    title: "Lot 28 – Modern Double-Storey Home, Marsden Park",
    address: "Lot 28",
    suburb: "Marsden Park",
    state: "NSW",
    price: 1100000,
    priceLabel: "$1,100,000",
    bedrooms: 4,
    bathrooms: 2.5,
    carSpaces: 1,
    image: "/images/prop-marsden-park.jpg",
    gallery: [
      "/images/prop-marsden-park.jpg",
      "/images/prop-marsden-park-floorplan.png",
    ],
    floorplan: "/images/prop-marsden-park-floorplan.png",
    category: "buy",
    type: "house",
    description:
      "A beautifully designed double-storey home in the thriving Marsden Park community. Featuring a spacious open-plan dining and family area, modern kitchen, study nook, ensuite to the master bedroom and a single-car garage. This Type 5 design delivers comfort, style and exceptional functionality for the growing family.",
    features: [
      "Open-plan dining & family area (6000 x 4400)",
      "Modern kitchen (2300 x 3600)",
      "Study nook on ground floor",
      "Master bedroom with WIR & ensuite",
      "3 additional bedrooms with built-in robes",
      "Powder room on ground floor",
      "Single lock-up garage",
      "Covered porch entry",
    ],
    inspectionTimes: ["Saturday, 26 Jul 2026 - 10:00 AM to 10:30 AM"],
    agent: {
      name: "Marcus Sterling",
      photo: "/images/agent_photo_1783129600216.png",
      phone: "+61 470 593 442",
      email: "marcus@cherryhomz.com.au",
    },
    coordinates: { lat: -33.7069, lng: 150.8344 },
    isNew: true,
    isFeatured: true,
  },

  {
    id: "prop-box-hill",
    title: "House & Land Package — Box Hill",
    address: "39 Mason Rd",
    suburb: "Box Hill",
    state: "NSW",
    price: 1176000,
    priceLabel: "$1,176,000",
    bedrooms: 4,
    bathrooms: 2,
    carSpaces: 1,
    image: "/images/prop-box-hill.jpg",
    gallery: [
      "/images/prop-box-hill.jpg",
    ],
    category: "buy",
    type: "house",
    description:
      "A brand-new dual-living house and land package in Box Hill — one of Sydney's Northwest high-growth corridors. Built by Noble Home Builders (iCIRT 5-star certified), this property offers an outstanding rental return of up to 5.5%, is within walking distance to the future Town Centre, and comes with a guaranteed tenant on settlement plus 1 year of free property management. Land registration is scheduled for End 2025. Limited stock available — contact us now to secure your lot. $15K rebate available for a limited time.",
    features: [
      "New dual-living design",
      "High rental return up to 5.5%",
      "Walking distance to future Town Centre",
      "Guaranteed tenant on settlement",
      "1 year free property management included",
      "$15K rebate — limited time offer",
      "Land registration: End 2025",
      "Built by Noble Home Builders (iCIRT 5-star certified)",
    ],
    inspectionTimes: ["Contact us"],
    agent: {
      name: "Marcus Sterling",
      photo: "/images/agent_photo_1783129600216.png",
      phone: "+61 470 593 442",
      email: "marcus@cherryhomz.com.au",
    },
    coordinates: { lat: -33.6761, lng: 150.8770 },
    isNew: true,
    isFeatured: true,
  },
  {
    id: "prop-2",
    title: "Charming Cottage in Paddington",
    address: "18 Glenmore Road",
    suburb: "Paddington",
    state: "NSW",
    price: 2850000,
    priceLabel: "$2,850,000",
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    area: 320,
    image: "/images/prop-sold-house.png",
    category: "sold",
    type: "house",
    description:
      "Recently sold — a beautifully renovated Victorian terrace in the heart of Paddington. This heritage-listed gem combines period charm with contemporary living, steps from Oxford Street's cafés and boutiques.",
    features: [
      "Original fireplaces",
      "Skylight-filled bathroom",
      "Ironlace balcony",
      "Cellar storage",
      "Pet-friendly courtyard",
    ],
    inspectionTimes: ["Saturday, 3 Oct 2026 - 10:00 AM to 10:30 AM"],
    agent: {
      name: "Oliver Bennett",
      photo: "/images/team-oliver-bennett.png?v=2",
      phone: "+61 470 593 442",
      email: "oliver@cherryhomz.com.au",
    },
    coordinates: { lat: -33.8847, lng: 151.2265 },
    isNew: false,
    isFeatured: false,
  },
  {
    id: "prop-3",
    title: "Modern Apartment in South Yarra",
    address: "Level 12, 88 Chapel Street",
    suburb: "South Yarra",
    state: "VIC",
    price: 750,
    priceLabel: "$750 /week",
    bedrooms: 2,
    bathrooms: 1,
    carSpaces: 1,
    area: 95,
    image: "/images/prop-rent-apt.png",
    category: "rent",
    type: "apartment",
    description:
      "Sleek inner-city apartment with floor-to-ceiling windows capturing panoramic city views. Walk to Prahran Market, South Yarra Station, and the Royal Botanic Gardens.",
    features: [
      "City views",
      "Rooftop pool",
      "Gym access",
      "Secure parking",
      "Video intercom",
      "Built-in wardrobes",
    ],
    inspectionTimes: [
      "Wednesday, 14 Oct 2026 - 5:15 PM to 5:45 PM",
      "Saturday, 17 Oct 2026 - 11:00 AM to 11:30 AM"
    ],
    agent: {
      name: "Grace Taylor",
      photo: "/images/team-grace-taylor.png?v=2",
      phone: "+61 470 593 442",
      email: "grace@cherryhomz.com.au",
    },
    coordinates: { lat: -37.8388, lng: 144.9923 },
    isNew: true,
    isFeatured: false,
  },
  {
    id: "prop-4",
    title: "Prime Development Land in Kellyville",
    address: "Lot 15, Samantha Riley Drive",
    suburb: "Kellyville",
    state: "NSW",
    price: 980000,
    priceLabel: "$980,000",
    bedrooms: 0,
    bathrooms: 0,
    carSpaces: 0,
    area: 850,
    image: "/images/prop-land.png",
    category: "land",
    type: "land",
    description:
      "A rare, level block in Sydney's thriving North-West growth corridor. R3 zoned for medium-density development with all services connected. Minutes to Kellyville Metro Station.",
    features: [
      "R3 zoning",
      "Flat block",
      "All services connected",
      "Near Metro station",
      "School catchment",
      "DA potential",
    ],
    inspectionTimes: ["Saturday, 10 Oct 2026 - 9:00 AM to 9:30 AM"],
    agent: {
      name: "Sophie Nguyen",
      photo: "/images/team-sophie-nguyen.png?v=2",
      phone: "+61 470 593 442",
      email: "sophie@cherryhomz.com.au",
    },
    coordinates: { lat: -33.7095, lng: 150.9551 },
    isNew: false,
    isFeatured: true,
  },
  {
    id: "prop-box-hill-lot6",
    title: "Smart Hills – LOT 6 House & Land Package, Box Hill",
    address: "39 Mason Rd (LOT 6)",
    suburb: "Box Hill",
    state: "NSW",
    price: 1191000,
    priceLabel: "$1,191,000",
    bedrooms: 5,
    bathrooms: 3.5,
    carSpaces: 2,
    area: 228,
    image: "/images/prop-box-hill-lot6.jpg",
    gallery: [
      "/images/prop-box-hill-lot6.jpg",
      "/images/prop-box-hill-lot6-kitchen.jpg",
      "/images/prop-box-hill-lot6-bath.jpg",
      "/images/prop-box-hill-lot6-floorplan.png",
    ],
    floorplan: "/images/prop-box-hill-lot6-floorplan.png",
    category: "buy",
    type: "house",
    description:
      "Smart Hills LOT 6 — Cheriton 205MG House & Land Package in Box Hill (39 Mason Rd). Total package price $1,191,000 (House: $551,000, Land: $640,000). Features 5 spacious bedrooms, 3.5 luxury bathrooms, and double garage with extended living and high rental return. Gold Inclusion Package by Noble Home Builders (iCIRT 5-star certified). Includes $15K Rebate for a limited time, with land registration set for End 2025.",
    features: [
      "House Design: Cheriton 205MG (House 205m² / Land 228m²)",
      "$15K Rebate (Limited Time Offer)",
      "5 Bedrooms | 3.5 Bathrooms | 2 Car Garage",
      "Gold Inclusion Highlights by Noble Home Builders (iCIRT 5-Star Certified)",
      "BASIX 7 Star Energy Efficiency Upgrade",
      "2600mm High Ceiling to Ground Floor",
      "Actron Air Zoned & Ducted Air Conditioning",
      "Laminate Timber Flooring & 20mm Stone Kitchen Benchtops",
      "Butler's Pantry & LED Downlights",
      "Floor to Ceiling Tiles in Bathroom Showers",
      "4000L Water Tank & 15-Year Structural Warranty",
      "Land Registration Date: End 2025",
    ],
    inspectionTimes: ["Contact us"],
    agent: {
      name: "Marcus Sterling",
      photo: "/images/agent_photo_1783129600216.png",
      phone: "+61 470 593 442",
      email: "marcus@cherryhomz.com.au",
    },
    coordinates: { lat: -33.6761, lng: 150.8770 },
    isNew: true,
    isFeatured: true,
  },
  {
    id: "prop-marsden-park-5bed",
    title: "Brand-New 5 Bedroom Home, Marsden Park",
    address: "Marsden Park",
    suburb: "Marsden Park",
    state: "NSW",
    price: 1249000,
    priceLabel: "$1,249,000",
    bedrooms: 5,
    bathrooms: 3,
    carSpaces: 1,
    image: "/images/prop-buy-4th.jpg",
    gallery: [
      "/images/prop-buy-4th.jpg",
    ],
    category: "buy",
    type: "house",
    description:
      "Brand-new and ready to move in! A stunning 5-bedroom, 3-bathroom residence in Marsden Park featuring modern architecture, premium brick & render facade, lock-up garage, open-plan living, and high-end finishes throughout.",
    features: [
      "Brand-New & Ready to Move In",
      "5 Bedrooms | 3 Bathrooms | 1 Lock-up Garage",
      "Located in thriving Marsden Park",
      "Contemporary double-storey design",
      "Open-plan living & dining areas",
      "Gourmet kitchen with modern appliances",
      "Landscaped front yard & concrete driveway",
    ],
    inspectionTimes: ["Contact us"],
    agent: {
      name: "Marcus Sterling",
      photo: "/images/agent_photo_1783129600216.png",
      phone: "+61 470 593 442",
      email: "marcus@cherryhomz.com.au",
    },
    coordinates: { lat: -33.7069, lng: 150.8344 },
    isNew: true,
    isFeatured: true,
  },
  {
    id: "prop-austral",
    title: "Brand-New Luxury Home, Austral",
    address: "Austral",
    suburb: "Austral",
    state: "NSW",
    price: 1350000,
    priceLabel: "$1,300,000 – $1,400,000",
    bedrooms: 5,
    bathrooms: 3,
    carSpaces: 2,
    image: "/images/prop-austral-v5.jpg?v=3",
    gallery: [
      "/images/prop-austral-v5.jpg?v=3",
    ],
    category: "buy",
    type: "house",
    description:
      "Brand-new build home ready to move in — an exclusive off-the-market opportunity in Austral, one of Western Sydney's fastest-growing suburbs near the new Western Sydney Airport (Badgerys Creek). Featuring luxury finishes throughout, this stunning double-storey residence offers 5 bedrooms, 3 bathrooms and a double lock-up garage. A rare find — contact us before it's gone.",
    features: [
      "Brand-New Build — Ready to Move In",
      "Off The Market Opportunity",
      "Luxury Finish Throughout",
      "5 Bedrooms | 3 Bathrooms | 2 Car Garage",
      "Located in Austral, Western Sydney",
      "Near Western Sydney Airport (Badgerys Creek)",
      "Contemporary double-storey design",
      "Premium façade with timber feature & render",
      "Open-plan living & dining",
      "Double lock-up garage with driveway",
      "Landscaped gardens & stone pathway",
    ],
    inspectionTimes: ["Contact us"],
    agent: {
      name: "Marcus Sterling",
      photo: "/images/agent_photo_1783129600216.png",
      phone: "+61 470 593 442",
      email: "marcus@cherryhomz.com.au",
    },
    coordinates: { lat: -33.9194, lng: 150.8234 },
    isNew: true,
    isFeatured: true,
  },
  {
    id: "prop-8",
    title: "Coastal Retreat in Noosa Heads",
    address: "5 Seaview Terrace",
    suburb: "Noosa Heads",
    state: "QLD",
    price: 3950000,
    priceLabel: "$3,950,000",
    bedrooms: 4,
    bathrooms: 3,
    carSpaces: 2,
    area: 620,
    image: "/images/prop-coastal.png",
    category: "sold",
    type: "house",
    description:
      "Recently sold — perched above Noosa Main Beach, this coastal masterpiece blends relaxed Queensland living with sophisticated design. Timber, stone, and glass create an organic, light-filled sanctuary.",
    features: [
      "Ocean views",
      "Saltwater pool",
      "Outdoor shower",
      "Timber deck",
      "Native garden",
      "Walk to Hastings Street",
    ],
    inspectionTimes: ["Saturday, 3 Oct 2026 - 9:30 AM to 10:00 AM"],
    agent: {
      name: "Oliver Bennett",
      photo: "/images/team-oliver-bennett.png?v=2",
      phone: "+61 470 593 442",
      email: "oliver@cherryhomz.com.au",
    },
    coordinates: { lat: -26.3881, lng: 153.0909 },
    isNew: false,
    isFeatured: false,
  },
  {
    id: "prop-9",
    title: "Acreage Land in Pimpama",
    address: "Lot 42, Dixon Drive",
    suburb: "Pimpama",
    state: "QLD",
    price: 620000,
    priceLabel: "$620,000",
    bedrooms: 0,
    bathrooms: 0,
    carSpaces: 0,
    area: 4000,
    image: "/images/prop-estate-land.png",
    category: "land",
    type: "land",
    description:
      "Expansive one-acre parcel in the booming Pimpama growth corridor between Brisbane and the Gold Coast. Ideal for an acreage lifestyle or potential future subdivision (STCA).",
    features: [
      "1 acre",
      "Town water available",
      "Bitumen road frontage",
      "Gentle slope",
      "Near Westfield Coomera",
      "Future M2 motorway access",
    ],
    inspectionTimes: ["Saturday, 10 Oct 2026 - 10:00 AM to 10:30 AM"],
    agent: {
      name: "Grace Taylor",
      photo: "/images/team-grace-taylor.png?v=2",
      phone: "+61 470 593 442",
      email: "grace@cherryhomz.com.au",
    },
    coordinates: { lat: -27.8236, lng: 153.2946 },
    isNew: true,
    isFeatured: false,
  },
  {
    id: "prop-menangle-park",
    title: "Menangle Park House & Land Package",
    address: "Menangle Park",
    suburb: "Menangle Park",
    state: "NSW",
    price: 1200000,
    priceLabel: "$1,200,000",
    bedrooms: 4,
    bathrooms: 2.5,
    carSpaces: 2,
    area: 450,
    image: "/images/prop-menangle-park.jpg",
    gallery: [
      "/images/prop-menangle-park.jpg",
    ],
    category: "buy",
    type: "house",
    description:
      "Don't miss this incredible opportunity in Menangle Park! Featuring a generous 450m² land parcel and a modern double-storey home package for $1.2 Million. Highlights include a brown brick and light grey render facade, glass balustrade balcony, open-plan living, double garage, and manicured lawn.",
    features: [
      "House & Land Package ($1.2 Million)",
      "Generous 450 m² Land Parcel",
      "Located in thriving Menangle Park",
      "Double-Storey Modern Architecture",
      "Glass Balustrade Upper Balcony",
      "Brick & Render Exterior Facade",
      "Double Lock-up Garage & Driveway",
      "Don't Miss This Opportunity #SYDNEYPROPERTY",
    ],
    inspectionTimes: ["Contact us"],
    agent: {
      name: "Marcus Sterling",
      photo: "/images/agent_photo_1783129600216.png",
      phone: "+61 470 593 442",
      email: "marcus@cherryhomz.com.au",
    },
    coordinates: { lat: -34.1189, lng: 150.7397 },
    isNew: true,
    isFeatured: true,
  },
  {
    id: "prop-11",
    title: "Executive Rental in Cottesloe",
    address: "9 Marine Parade",
    suburb: "Cottesloe",
    state: "WA",
    price: 1200,
    priceLabel: "$1,200 /week",
    bedrooms: 4,
    bathrooms: 2,
    carSpaces: 2,
    area: 450,
    image: "/images/prop-modern-home.png",
    category: "rent",
    type: "house",
    description:
      "Executive family home for lease in Perth's iconic beachside suburb. Freshly renovated with a gourmet kitchen, alfresco entertaining area, and direct beach access across the road.",
    features: [
      "Beach across road",
      "Renovated kitchen",
      "Alfresco dining",
      "Ducted reverse-cycle AC",
      "Reticulated garden",
      "Pets negotiable",
    ],
    inspectionTimes: ["Saturday, 10 Oct 2026 - 1:00 PM to 1:30 PM"],
    agent: {
      name: "Marcus Sterling",
      photo: "/images/agent_photo_1783129600216.png",
      phone: "+61 470 593 442",
      email: "marcus@cherryhomz.com.au",
    },
    coordinates: { lat: -31.9927, lng: 115.7533 },
    isNew: true,
    isFeatured: false,
  },
  {
    id: "prop-12",
    title: "Heritage Estate in Toorak",
    address: "1 St Georges Road",
    suburb: "Toorak",
    state: "VIC",
    price: 12500000,
    priceLabel: "$12,500,000",
    bedrooms: 7,
    bathrooms: 6,
    carSpaces: 4,
    area: 1850,
    image: "/images/prop-luxury-villa.png",
    category: "sold",
    type: "apartment",
    description:
      "Recently sold — a landmark Toorak estate showcasing Federation grandeur across manicured grounds. The main residence and separate guest quarters span almost 2,000 sqm of pure opulence.",
    features: [
      "Federation architecture",
      "Tennis court",
      "Guest quarters",
      "Circular driveway",
      "Established gardens",
      "Ballroom",
    ],
    inspectionTimes: ["Saturday, 3 Oct 2026 - 11:00 AM to 11:30 AM"],
    agent: {
      name: "Daniel Rossi",
      photo: "/images/team-daniel-rossi.png?v=2",
      phone: "+61 470 593 442",
      email: "daniel@cherryhomz.com.au",
    },
    coordinates: { lat: -37.8411, lng: 145.0098 },
    isNew: false,
    isFeatured: true,
  },
  {
    id: "prop-oran-park-28",
    title: "Oran Park – LOT 28 House & Land Package",
    address: "LOT 28 (18 Drover St & 28 Madden St)",
    suburb: "Oran Park",
    state: "NSW",
    price: 1141990,
    priceLabel: "$1,141,990",
    bedrooms: 4,
    bathrooms: 2.5,
    carSpaces: 1,
    area: 275,
    image: "/images/prop-oran-park.jpg",
    gallery: [
      "/images/prop-oran-park.jpg",
      "/images/prop-oran-park-floorplan-v2.png",
    ],
    floorplan: "/images/prop-oran-park-floorplan-v2.png",
    category: "buy",
    type: "house",
    description:
      "Oran Park LOT 28 — Aurora 172 House & Land Package (18 Drover St & 28 Madden St). Total package price $1,141,990 (House: $452,000, Land: $689,990). Features 4 bedrooms, 2.5 bathrooms, study nook, media room, and single lock-up garage. Gold Inclusion Package by Noble Home Builders (iCIRT 5-star certified). Land registration date Q2 2026.",
    features: [
      "House Design: Aurora 172 (House 172m² / Land 275m²)",
      "4 Bedrooms | 2.5 Bathrooms | 1 Lock-up Garage",
      "Gold Inclusion Highlights by Noble Home Builders (iCIRT 5-Star Certified)",
      "BASIX 7 Star Energy Efficiency Upgrade",
      "2600mm High Ceiling to Ground Floor",
      "Actron Air Zoned & Ducted Air Conditioning",
      "Laminate Timber Flooring & 20mm Stone Kitchen Benchtops",
      "Framed Bulkhead & LED Downlights",
      "Floor to Ceiling Tiles in Bathroom Showers",
      "4000L Water Tank & 15-Year Structural Warranty",
      "Land Registration Date: Q2 2026",
    ],
    inspectionTimes: ["Contact us"],
    agent: {
      name: "Marcus Sterling",
      photo: "/images/agent_photo_1783129600216.png",
      phone: "+61 470 593 442",
      email: "marcus@cherryhomz.com.au",
    },
    coordinates: { lat: -34.0016, lng: 150.7383 },
    isNew: true,
    isFeatured: true,
  },
  {
    id: "prop-16",
    title: "Oceanfront Apartment in Bondi Beach",
    address: "12/178 Campbell Parade",
    suburb: "Bondi Beach",
    state: "NSW",
    price: 1100,
    priceLabel: "$1,100 /week",
    bedrooms: 2,
    bathrooms: 2,
    carSpaces: 1,
    area: 110,
    image: "/images/prop-bondi-apartment.png?v=2",
    category: "rent",
    type: "apartment",
    description:
      "Front-row Bondi living with uninterrupted ocean views from every room. Freshly renovated with a stone island kitchen and an oversized balcony made for sunrise coffees over the Pacific.",
    features: [
      "Uninterrupted ocean views",
      "Oversized balcony",
      "Renovated kitchen",
      "Secure parking",
      "Walk to Icebergs",
      "Available now",
    ],
    inspectionTimes: ["Saturday, 17 Oct 2026 - 3:00 PM to 3:30 PM"],
    agent: {
      name: "Aisha Khan",
      photo: "/images/team-aisha-khan.png?v=2",
      phone: "+61 470 593 442",
      email: "aisha@cherryhomz.com.au",
    },
    coordinates: { lat: -33.8908, lng: 151.2743 },
    isNew: true,
    isFeatured: true,
  },
  {
    id: "prop-17",
    title: "Sky-Home in Parramatta CBD",
    address: "4507/45 Macquarie Street",
    suburb: "Parramatta",
    state: "NSW",
    price: 680,
    priceLabel: "$680 /week",
    bedrooms: 2,
    bathrooms: 2,
    carSpaces: 1,
    area: 88,
    image: "/images/prop-parramatta-apartment.png?v=2",
    category: "rent",
    type: "apartment",
    description:
      "Level 45 living in Parramatta's newest landmark tower. Floor-to-ceiling glass frames river and city views, with residents' pool, gym, sauna, and sky lounge — steps from Parramatta Square and the Metro.",
    features: [
      "Level 45 river views",
      "Residents' pool & gym",
      "Sky lounge access",
      "Walk to Metro",
      "Pet friendly (on application)",
      "Unfurnished",
    ],
    inspectionTimes: ["Saturday, 10 Oct 2026 - 3:00 PM to 3:30 PM"],
    agent: {
      name: "Oliver Bennett",
      photo: "/images/team-oliver-bennett.png?v=2",
      phone: "+61 470 593 442",
      email: "oliver@cherryhomz.com.au",
    },
    coordinates: { lat: -33.8136, lng: 151.0034 },
    isNew: true,
    isFeatured: false,
  },
  {
    id: "prop-18",
    title: "Character Terrace in Newtown",
    address: "55 Australia Street",
    suburb: "Newtown",
    state: "NSW",
    price: 950,
    priceLabel: "$950 /week",
    bedrooms: 3,
    bathrooms: 1,
    carSpaces: 0,
    area: 160,
    image: "/images/prop-newtown-terrace.png?v=2",
    category: "rent",
    type: "house",
    description:
      "A sun-drenched double-fronted terrace with all the King Street energy at your door. High ornate ceilings, timber floors, and a leafy rear garden perfect for weekend entertaining.",
    features: [
      "Ornate high ceilings",
      "Timber floors",
      "Leafy rear garden",
      "Walk to King Street",
      "Close to Sydney Uni",
      "Long lease available",
    ],
    inspectionTimes: ["Wednesday, 14 Oct 2026 - 6:00 PM to 6:30 PM"],
    agent: {
      name: "Grace Taylor",
      photo: "/images/team-grace-taylor.png?v=2",
      phone: "+61 470 593 442",
      email: "grace@cherryhomz.com.au",
    },
    coordinates: { lat: -33.8983, lng: 151.1785 },
    isNew: false,
    isFeatured: false,
  },
  {
    id: "prop-19",
    title: "Sold Above Reserve in Chatswood",
    address: "1802/7 Railway Street",
    suburb: "Chatswood",
    state: "NSW",
    price: 1320000,
    priceLabel: "Sold $1,320,000",
    bedrooms: 2,
    bathrooms: 2,
    carSpaces: 1,
    area: 105,
    image: "/images/prop-chatswood-apartment.png?v=2",
    category: "sold",
    type: "apartment",
    description:
      "Sold $70,000 above reserve after a five-bidder auction. A north-facing two-bedroom apartment above Chatswood Interchange, marketed with our signature twilight photography campaign.",
    features: [
      "Sold above reserve",
      "5 registered bidders",
      "North aspect",
      "Above Metro interchange",
      "District skyline views",
      "21-day campaign",
    ],
    inspectionTimes: ["Saturday, 3 Oct 2026 - 1:00 PM to 1:30 PM"],
    agent: {
      name: "Sophie Nguyen",
      photo: "/images/team-sophie-nguyen.png?v=2",
      phone: "+61 470 593 442",
      email: "sophie@cherryhomz.com.au",
    },
    coordinates: { lat: -33.7969, lng: 151.1801 },
    isNew: false,
    isFeatured: false,
  },
  {
    id: "prop-20",
    title: "Registered Block in Box Hill",
    address: "Lot 208, Terry Road",
    suburb: "Box Hill",
    state: "NSW",
    price: 870000,
    priceLabel: "$870,000",
    bedrooms: 0,
    bathrooms: 0,
    carSpaces: 0,
    area: 450,
    image: "/images/prop-box-hill-land.png?v=2",
    category: "land",
    type: "land",
    description:
      "Registered and ready to build in Sydney's booming Hills growth precinct. A level 450 sqm block with 12.5 m frontage, close to the new Box Hill City Centre and future Tallawong Metro connections.",
    features: [
      "Registered — build now",
      "12.5 m frontage",
      "Level block",
      "All services available",
      "Near new town centre",
      "Flexible settlement",
    ],
    inspectionTimes: ["Saturday, 10 Oct 2026 - 12:00 PM to 12:30 PM"],
    agent: {
      name: "Marcus Sterling",
      photo: "/images/agent_photo_1783129600216.png",
      phone: "+61 470 593 442",
      email: "marcus@cherryhomz.com.au",
    },
    coordinates: { lat: -33.6459, lng: 150.8993 },
    isNew: true,
    isFeatured: false,
  }
];

/* ───── Testimonials ───── */

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah Mitchell",
    role: "Home Buyer — Mosman, NSW",
    content:
      "Cherry Homz made our dream of owning a harbourside home a reality. Their market knowledge is unmatched, and they negotiated a price we never thought possible. Couldn't recommend them more highly.",
    rating: 5,
    avatar: "SM",
  },
  {
    id: "test-2",
    name: "David & Priya Kapoor",
    role: "Property Investors — South Yarra, VIC",
    content:
      "We've purchased three investment properties through Cherry Homz over the past five years. Their data-driven approach and honest advice have consistently delivered strong returns for our portfolio.",
    rating: 5,
    avatar: "DK",
  },
  {
    id: "test-3",
    name: "James Whitfield",
    role: "Vendor — Noosa Heads, QLD",
    content:
      "Selling our family home was emotional, but the Cherry Homz team handled everything with professionalism and care. They achieved a price well above our reserve at auction.",
    rating: 5,
    avatar: "JW",
  },
  {
    id: "test-4",
    name: "Emily Chen",
    role: "First Home Buyer — Kellyville, NSW",
    content:
      "As a first-time buyer, the process felt overwhelming until I found Cherry Homz. They walked me through every step, from pre-approval to settlement, with genuine patience and expertise.",
    rating: 4,
    avatar: "EC",
  },
  {
    id: "test-5",
    name: "Liam O'Brien",
    role: "Tenant — Cottesloe, WA",
    content:
      "Best rental experience I've ever had. The property management team is responsive, transparent, and actually cares about tenants. Maintenance requests are handled within 24 hours — every time.",
    rating: 5,
    avatar: "LO",
  },
];

/* ───── Stats ───── */

export const stats: Stat[] = [
  { label: "Properties Sold", value: 500, suffix: "+", prefix: "" },
  { label: "Active Listings", value: 200, suffix: "+", prefix: "" },
  { label: "Suburbs Covered", value: 50, suffix: "+", prefix: "" },
  { label: "Years Experience", value: 15, suffix: "+", prefix: "" },
];

/* ───── Categories ───── */

const countFor = (category: Property["category"]) =>
  properties.filter((p) => p.category === category).length;

export const categories: Category[] = [
  { label: "Buy", value: "buy", icon: "Home", count: countFor("buy") },
  { label: "Rent", value: "rent", icon: "Key", count: countFor("rent") },
  { label: "Sold", value: "sold", icon: "CheckCircle", count: countFor("sold") },
  { label: "Land", value: "land", icon: "Map", count: countFor("land") },
];

/* ───── Hero Slides ───── */

export const heroSlides: HeroSlide[] = [
  {
    image: "/images/hero-luxury.png",
    title: "Find Your Dream Home in Australia",
    subtitle:
      "Premium properties across Sydney, Melbourne, Brisbane, Perth & the Gold Coast — curated by experts who know the market inside out.",
  },
  {
    image: "/images/hero-coastal.png",
    title: "Coastal Living, Redefined",
    subtitle:
      "From Noosa to Cottesloe, discover beachside homes that blend luxury with the laid-back Sydney lifestyle.",
  },
  {
    image: "/images/hero-cityscape.png",
    title: "Invest With Confidence",
    subtitle:
      "Over 500 properties sold and 15+ years of experience — let Cherry Homz guide your next investment decision.",
  },
];
