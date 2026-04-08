export type Product = {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  description: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Arcen Lounge Chair",
    subtitle: "Walnut & Boucle",
    price: 1240,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    ],
    category: "Seating",
    description: "A contemporary lounge chair with a solid walnut frame and hand-stitched boucle upholstery. Designed for long evenings and quiet mornings alike.",
  },
  {
    id: 2,
    title: "Mira Dining Table",
    subtitle: "Smoked Oak, 220cm",
    price: 2890,
    image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&q=80",
      "https://images.unsplash.com/photo-1617104678098-de229db51175?w=800&q=80",
      "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&q=80",
    ],
    category: "Tables",
    description: "Solid smoked oak dining table with a live-edge finish. Each piece is uniquely grained, making every table a one-of-a-kind acquisition.",
  },
  {
    id: 3,
    title: "Solen Floor Lamp",
    subtitle: "Brass & Linen",
    price: 640,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a35049ff1?w=800&q=80",
    ],
    category: "Lighting",
    description: "A slender floor lamp with a hand-spun brass stem and a linen shade that diffuses warm, even light. Minimal footprint, maximal presence.",
  },
  {
    id: 4,
    title: "Havn Shelf",
    subtitle: "Blackened Steel",
    price: 890,
    image: "https://images.unsplash.com/photo-1594563703937-fdc640497dcd?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1594563703937-fdc640497dcd?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    ],
    category: "Storage",
    description: "Wall-mounted shelving in blackened steel with adjustable oak shelves. Industrial precision with warm material contrast.",
  },
  {
    id: 5,
    title: "Lune Side Table",
    subtitle: "Marble & Brass",
    price: 520,
    image: "https://images.unsplash.com/photo-1565791380713-1756b9a05343?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1565791380713-1756b9a05343?w=800&q=80",
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&q=80",
      "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&q=80",
    ],
    category: "Tables",
    description: "A compact side table with a white Carrara marble top resting on a hand-finished brass tripod base. Timeless pairing of materials.",
  },
  {
    id: 6,
    title: "Forma Sofa",
    subtitle: "Sage Velvet, 3-Seat",
    price: 3200,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    ],
    category: "Seating",
    description: "A generous three-seat sofa in sage velvet with deep cushioning and a low-slung oak base. The room's quiet focal point.",
  },
  {
    id: 7,
    title: "Koto Pendant",
    subtitle: "Washi Paper & Oak",
    price: 380,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a35049ff1?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a35049ff1?w=800&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    category: "Lighting",
    description: "Handcrafted pendant light in washi paper stretched over an oak frame. Glows like a paper lantern, designed to last a lifetime.",
  },
  {
    id: 8,
    title: "Sten Armchair",
    subtitle: "Cognac Leather",
    price: 1650,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    category: "Seating",
    description: "Full-grain cognac leather armchair with a solid beech frame. Ages beautifully, improves with every year of use.",
  },
  // ── Storage ──
  {
    id: 9,
    title: "Noma Credenza",
    subtitle: "White Oak & Cane",
    price: 2150,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
      "https://images.unsplash.com/photo-1594563703937-fdc640497dcd?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    category: "Storage",
    description: "A wide credenza in white oak with woven cane door panels. Conceals everything, reveals only good taste.",
  },
  {
    id: 10,
    title: "Kubo Bookcase",
    subtitle: "Ash & Blackened Steel",
    price: 1480,
    image: "https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=800&q=80",
      "https://images.unsplash.com/photo-1594563703937-fdc640497dcd?w=800&q=80",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
    ],
    category: "Storage",
    description: "An open bookcase with solid ash shelves on a blackened steel ladder frame. Displays your library with architectural grace.",
  },
  // ── Decor ──
  {
    id: 11,
    title: "Orla Ceramic Vase",
    subtitle: "Sand Glaze, Large",
    price: 185,
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&q=80",
      "https://images.unsplash.com/photo-1612198188685-e3ff7a800c60?w=800&q=80",
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&q=80",
    ],
    category: "Decor",
    description: "A hand-thrown ceramic vase with a raw sand glaze. Perfectly imperfect — each one varies slightly in form and finish.",
  },
  {
    id: 12,
    title: "Tova Throw Blanket",
    subtitle: "Merino Wool, Oat",
    price: 240,
    image: "https://images.unsplash.com/photo-1580301762395-21ce6d555b43?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1580301762395-21ce6d555b43?w=800&q=80",
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&q=80",
      "https://images.unsplash.com/photo-1612198188685-e3ff7a800c60?w=800&q=80",
    ],
    category: "Decor",
    description: "A generously sized throw in extra-fine merino wool. Soft enough for bare skin, warm enough for winter evenings.",
  },
  {
    id: 13,
    title: "Moss Wall Mirror",
    subtitle: "Solid Walnut Frame",
    price: 420,
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&q=80",
      "https://images.unsplash.com/photo-1612198188685-e3ff7a800c60?w=800&q=80",
    ],
    category: "Decor",
    description: "A round wall mirror in hand-finished walnut. Makes any room feel twice as open and twice as bright.",
  },
  {
    id: 14,
    title: "Rune Console Table",
    subtitle: "Travertine & Iron",
    price: 1780,
    image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&q=80",
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&q=80",
      "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&q=80",
    ],
    category: "Tables",
    description: "A narrow console table with a honed travertine top on a minimal iron base. Perfect for entryways and hallways.",
  },
];

// ── Categories ──

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  count: number;
};

export const CATEGORIES: Category[] = [
  {
    slug: "seating",
    name: "Seating",
    tagline: "Chairs, sofas & loungers built for comfort that lasts.",
    image: "/coolware.jpg",
    count: PRODUCTS.filter((p) => p.category === "Seating").length,
  },
  {
    slug: "tables",
    name: "Tables",
    tagline: "Dining, side & console tables in timeless materials.",
    image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&q=80",
    count: PRODUCTS.filter((p) => p.category === "Tables").length,
  },
  {
    slug: "lighting",
    name: "Lighting",
    tagline: "Lamps & pendants that set the perfect mood.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    count: PRODUCTS.filter((p) => p.category === "Lighting").length,
  },
  {
    slug: "storage",
    name: "Storage",
    tagline: "Shelves, credenzas & cases for curated living.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
    count: PRODUCTS.filter((p) => p.category === "Storage").length,
  },
  {
    slug: "decor",
    name: "Decor",
    tagline: "Vases, textiles & mirrors — the finishing touches.",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
    count: PRODUCTS.filter((p) => p.category === "Decor").length,
  },
];
