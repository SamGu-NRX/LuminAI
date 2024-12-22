export const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: "Sam Gu",
    role: "Co-Founder & Lead Developer",
    quote: "If AI were easy, they'd call it human intelligence",
    imageUrl: "/about/SamGu.jpg",
  },
  {
    id: 2,
    name: "Aarav Minocha",
    role: "Co-Founder & Lead Instructor",
    quote: "I don't always test my code, but when I do, I do it in production",
    imageUrl: "/about/AaravMinocha.jpg",
  },
  {
    id: 3,
    name: "Jainish Patel",
    role: "Co-Founder & Lead Instructor",
    quote: "Keep calm and backpropagate",
    imageUrl: "/about/JainishPatel.jpg",
  },
];

export interface StaffMember {
  id: number;
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
}

