export type Review = {
  name: string;
  rating: number;
  title: string;
  body: string;
};

export type Product = {
  slug: string;
  name: string;
  line: string;
  price: number;
  compareAt?: number;
  fabric: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  description: string;
  details: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  images: string[];
  reviews: Review[];
};

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_38rSmNL40WXgdieukkqKbzzBpaF";

export const HERO_IMG = CDN + "/hf_20260620_224325_aa39b81b-a574-4e43-ae40-36e7c512cd2c.png";
export const SEASONAL_IMG = CDN + "/hf_20260620_224350_d7e58c67-4140-4b88-9b47-2093c7493753.png";
export const FABRIC_IMG = CDN + "/hf_20260620_224355_eca7346d-e000-4cfd-a6d4-b1ad7a202da1.png";

// Twirl hero video. Temporary placeholder until the fresh Sonila twirl renders;

export const TWIRL_VIDEO = CDN + "/hf_20260620_231324_ae149cbd-fe22-4ca9-8668-6e9f5742ba18.mp4";

export const products: Product[] = [
  {
    slug: "sonila-strapless-maxi",
    name: "Sonila",
    line: "Strapless Maxi Gown with Side Slit",
    price: 238,
    fabric: "Liquid Satin",
    badge: "Bestseller",
    rating: 4.9,
    reviewCount: 142,
    shortDescription:
      "A column of liquid satin cut to skim the body, finished with a high thigh slit for movement.",
    description:
      "The Sonila is the gown CIELIE is known for. A strapless, boned bodice holds its line while the bias-cut skirt falls in a single uninterrupted column to the floor. The concealed side slit releases just enough for an entrance. Made to order by our Vienna atelier.",
    details: [
      "Strapless boned bodice for structured support",
      "Bias-cut satin skirt with concealed side slit",
      "Floor-length, made to your measurements",
      "Hidden back zip with hook closure",
      "Handcrafted in Vienna, 3 to 5 day make time",
    ],
    colors: [
      { name: "Marigold", hex: "#E8B341" },
      { name: "Powder Blue", hex: "#A9C3D9" },
      { name: "Ivory", hex: "#EFE9DD" },
      { name: "Blush", hex: "#E3C4C0" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      CDN + "/hf_20260620_224333_68cd20ee-c55b-455a-aee5-a25a216d6319.png",
      CDN + "/hf_20260620_224355_eca7346d-e000-4cfd-a6d4-b1ad7a202da1.png",
      CDN + "/hf_20260620_224325_aa39b81b-a574-4e43-ae40-36e7c512cd2c.png",
    ],
    reviews: [
      { name: "Andrea", rating: 5, title: "Wore it to a wedding", body: "The quality is unreal for the price. It photographed beautifully and I had compliments all night." },
      { name: "Nina", rating: 5, title: "An entrance", body: "The slit and the fit of the bodice are perfect. It feels custom because it is." },
      { name: "Lauren", rating: 5, title: "Worth every cent", body: "Arrived faster than I expected and packaged like a gift. The satin is heavy and expensive looking." },
    ],
  },
  {
    slug: "sarelle-pleated-maxi",
    name: "Sarelle",
    line: "Asymmetric Pleated Maxi with Draped Shawl",
    price: 198,
    compareAt: 318,
    fabric: "Pleated Crepe",
    badge: "Atelier Favourite",
    rating: 4.8,
    reviewCount: 96,
    shortDescription:
      "Fine knife pleats and a single draped shoulder, built to move and flatter every frame.",
    description:
      "Sarelle is sculptural without effort. Hundreds of fine knife pleats fall from a draped one-shoulder neckline into a floor-sweeping skirt. The asymmetric shawl detail frames the collarbone and softens the silhouette. A wedding-guest and black-tie staple.",
    details: [
      "One-shoulder draped shawl neckline",
      "Permanent knife pleating throughout",
      "Concealed inner waistband for hold",
      "Floor-length with a soft train",
      "Handcrafted in Vienna, 3 to 5 day make time",
    ],
    colors: [
      { name: "Baby Blue", hex: "#B7CBDD" },
      { name: "Sage", hex: "#B9C2A6" },
      { name: "Champagne", hex: "#E6D4AE" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      CDN + "/hf_20260620_224339_89d29cfe-c3c4-4ef1-ae97-57b2e188e748.png",
      CDN + "/hf_20260620_224355_eca7346d-e000-4cfd-a6d4-b1ad7a202da1.png",
      CDN + "/hf_20260620_224350_d7e58c67-4140-4b88-9b47-2093c7493753.png",
    ],
    reviews: [
      { name: "Sarina", rating: 5, title: "Incredible design", body: "Incredible design and quality, arrived within three days. The pleats hold perfectly." },
      { name: "Orphelia", rating: 5, title: "Made for my body", body: "Fits well, soft fabric, beautifully structured. I feel like it was made for me." },
      { name: "Klara", rating: 4, title: "Beautiful, worth the wait", body: "Two weeks to arrive but it came beautifully packaged with a card. The quality is there." },
    ],
  },
  {
    slug: "walley-off-shoulder",
    name: "Walley",
    line: "Off-Shoulder Draped Maxi",
    price: 188,
    compareAt: 262,
    fabric: "Matte Jersey",
    rating: 4.8,
    reviewCount: 78,
    shortDescription:
      "An off-shoulder neckline and column drape that reads quiet, modern, and unmistakably couture.",
    description:
      "Walley is restraint done well. A clean off-shoulder neckline runs into a draped column of matte jersey that holds its shape through the night. No embellishment, no noise, just line and fall. The piece for the guest who wants to be remembered for taste, not flash.",
    details: [
      "Off-shoulder bardot neckline",
      "Draped matte-jersey column skirt",
      "Lined bodice with interior support",
      "Floor-length, made to your measurements",
      "Handcrafted in Vienna, 3 to 5 day make time",
    ],
    colors: [
      { name: "Powder Blue", hex: "#AEC6D8" },
      { name: "Slate", hex: "#7E8A93" },
      { name: "Black", hex: "#1C1A18" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      CDN + "/hf_20260620_224344_51a6f593-91d7-41a3-bc63-5589cf04c9f1.png",
      CDN + "/hf_20260620_224355_eca7346d-e000-4cfd-a6d4-b1ad7a202da1.png",
      CDN + "/hf_20260620_224325_aa39b81b-a574-4e43-ae40-36e7c512cd2c.png",
    ],
    reviews: [
      { name: "Aliona", rating: 5, title: "Most elegant thing I own", body: "Beautiful fabric and shape. The drape is flattering and the neckline is stunning." },
      { name: "Kendall", rating: 5, title: "Shipped in three days", body: "Such a beautiful dress, amazing fabric and quality, and it shipped within three days." },
      { name: "Latina", rating: 5, title: "Love it", body: "As if it were made for my body. I love this dress." },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
