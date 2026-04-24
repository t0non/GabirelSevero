export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  tag?: string;
  stock?: number;
  category: string;
  theme?: string;
  detailedDescription?: string;
  colorCodes?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  icon?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  avatar: string;
  rating: number;
}
