export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
  }
  
  export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    stock: number;
    createdAt: Date;
  }
  
  export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    userId: string;
  }
  
  export interface Favorite {
    id: string;
    productId: string;
    userId: string;
  }
  