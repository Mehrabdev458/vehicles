export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "James Mitchell",
    role: "Car Enthusiast",
    avatar: "JM",
    text: "AutoVerse helped me find my dream Porsche 911. The detailed specs and comparison tools made my decision so much easier. Incredible platform!",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Professional Rider",
    avatar: "SC",
    text: "As a motorcycle journalist, I rely on accurate specs and reviews. AutoVerse delivers the most comprehensive bike data I've found anywhere.",
    rating: 5
  },
  {
    id: 3,
    name: "Marcus Rodriguez",
    role: "Automotive Blogger",
    avatar: "MR",
    text: "The comparison feature is a game-changer. Being able to put two vehicles side by side with all specs visible saved me weeks of research.",
    rating: 4
  },
  {
    id: 4,
    name: "Emily Watson",
    role: "First-time Buyer",
    avatar: "EW",
    text: "I was overwhelmed by choices until I found AutoVerse. The filters and categories helped me narrow down to the perfect family SUV in minutes.",
    rating: 5
  },
  {
    id: 5,
    name: "David Park",
    role: "EV Advocate",
    avatar: "DP",
    text: "Finally, a platform that treats electric vehicles with the same enthusiasm as traditional cars. The EV section is exceptionally well curated.",
    rating: 5
  },
  {
    id: 6,
    name: "Laura Bennett",
    role: "Adventure Rider",
    avatar: "LB",
    text: "Found my BMW GS Adventure through AutoVerse. The detailed reviews from real riders gave me the confidence to make such a significant purchase.",
    rating: 4
  }
];
