export interface Event {
  productId: number;
  name: string;
  location: string;
  eventDate: string;
  price: number;
  ageMin: number;
  imageUrl: string;
}

export interface PurchaseRequest {
  fullName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface CartItem extends Event {
   quantity: number;
   productId: number;
   name: string;
   price: number;
  
}

export interface Purchase {
  purchaseId?: number;  
  customerId?: number;
  purchaseDate?: Date;
  totalAmount: number;
  
  fullName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  
  productId: number;
}

export interface PurchaseResponse {
  success: boolean;
  message: string;
  productId: number;
  eventName: string;
  buyerName: string;
  totalAmount: number;
  purchaseDate: Date;
}
export interface FullPurchasePayload extends PurchaseRequest {
  items: CartItem[];  
  totalAmount: number; 
}