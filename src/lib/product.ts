export type Product = {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    rating: number;
    reviews: number;
    description: string;
    details: string[];
    image: string;
    badge?: string;
};

export const products: Product[] = [
    {
        id: 1,
        name: "Ceramic Pour-Over Set",
        price: 89,
        originalPrice: 120,
        category: "Brewing",
        rating: 4.9,
        reviews: 214,
        description: "Hand-thrown stoneware pour-over with matching carafe. Each piece is unique, glazed in a soft sage that deepens with use. Designed for the slow morning ritual.",
        details: ["Hand-thrown stoneware", "Dishwasher safe", "Holds 600ml", "Includes reusable filter"],
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
        badge: "Sale",
    },
    {
        id: 2,
        name: "Linen Napkin Set",
        price: 42,
        category: "Table",
        rating: 4.7,
        reviews: 98,
        description: "Washed linen napkins in a muted palette. Softens with every wash. Set of four in complementary earth tones.",
        details: ["100% stonewashed linen", "Set of 4", "50×50 cm", "Machine washable"],
        image: "https://images.unsplash.com/photo-1600369671854-e8d30792f842?w=800&q=80",
    },
    {
        id: 3,
        name: "Walnut Serving Board",
        price: 135,
        category: "Serving",
        rating: 4.8,
        reviews: 176,
        description: "Solid American walnut board with a live edge and integrated juice groove. Food-safe oil finish, built to last generations.",
        details: ["Solid American walnut", "Live edge", "45×25 cm", "Food-safe finish"],
        image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
        badge: "Bestseller",
    },
    {
        id: 4,
        name: "Matte Black Cutlery Set",
        price: 68,
        originalPrice: 85,
        category: "Cutlery",
        rating: 4.6,
        reviews: 132,
        description: "20-piece matte black stainless steel cutlery. Weighty, balanced, and timeless. Service for four.",
        details: ["18/10 stainless steel", "Matte PVD coating", "20 pieces / 4 settings", "Dishwasher safe"],
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&q=80",
        badge: "Sale",
    },
    {
        id: 5,
        name: "Speckled Dinner Plates",
        price: 96,
        category: "Dinnerware",
        rating: 4.9,
        reviews: 301,
        description: "Wheel-thrown stoneware dinner plates with an organic speckled glaze. Microwave and dishwasher safe. Set of two.",
        details: ["Wheel-thrown stoneware", "27 cm diameter", "Set of 2", "Microwave safe"],
        image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&q=80",
        badge: "New",
    },
    {
        id: 6,
        name: "Rattan Placemat Set",
        price: 38,
        category: "Table",
        rating: 4.5,
        reviews: 89,
        description: "Hand-woven rattan placemats. Natural, sustainable, and warm. Set of four, each slightly different.",
        details: ["Hand-woven rattan", "Set of 4", "38 cm round", "Wipe clean"],
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    },
    {
        id: 7,
        name: "Copper French Press",
        price: 112,
        category: "Brewing",
        rating: 4.8,
        reviews: 155,
        description: "Brushed copper French press with double-wall borosilicate glass. Keeps coffee hot for 90 minutes.",
        details: ["Brushed copper finish", "Double-wall glass", "800ml capacity", "Stainless plunger"],
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    },
    {
        id: 8,
        name: "Olive Wood Salad Bowl",
        price: 74,
        category: "Serving",
        rating: 4.7,
        reviews: 112,
        description: "Hand-carved olive wood salad bowl. Each piece is one-of-a-kind, with natural grain patterns that tell a story.",
        details: ["Hand-carved olive wood", "25 cm diameter", "Food-safe oil", "Hand wash only"],
        image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",
        badge: "New",
    },
];