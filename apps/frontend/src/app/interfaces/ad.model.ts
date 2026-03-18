export interface AdCategory {
    id: string;
    name: string;
  }

  export interface Category extends AdCategory {
    slug: string;
  }
  
  export interface AdAuthor {
    name: string | null;
    phone: string | null;
  }
  
  export interface Ad {
    id: string;
    title: string;
    description: string;
    price: number;
    currency?: string;
    location: string;
    images?: string[];
    categoryId: string;
    authorId: string;
    category: AdCategory;
    author?: AdAuthor;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateAdRequest {
    title: string;
    description: string;
    price: number;
    currency?: string;
    location: string;
    categoryId: string;
  }
  