export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All' | 'Living Room' | 'Bedroom' | 'Dining' | 'Office' | 'Lighting';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
