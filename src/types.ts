export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  image: string;
  quantity: number;
  category: string;
  rating: number;
  discountPercentage?: number;
};

export interface CartProps {
  [productId: string]: Product;
}

export type ProductDetail = {
  id: number
  title: string
  images: string[]
  thumbnail: string
  image?: string
  description: string
  reviews: Review[]
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
  quantity?: number
}

export type Review = {
  rating: number
  comment: string
  date: string | Date
  reviewerName: string
  reviewerEmail: string
}