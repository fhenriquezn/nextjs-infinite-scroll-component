export interface PagedResult<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface SearchDummyProducts extends PagedResult<DummyProduct> {
  products: DummyProduct[];
}

export interface DummyProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export type InfiniteScrollParams = {
  page?: number = 1;
  batchSize?: number = 15;
  isRefreshable?: boolean = false;
};

export interface SearchProductsParams extends InfiniteScrollParams {
  q?: string;
}

export type Params = Promise<{
  [key: string]: string | string[] | undefined | number;
}>;
export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export type UpdateType = "plus" | "minus" | "delete";

export type CartAction =
  | {
      type: "UPDATE_ITEM";
      payload: { merchandiseId: number; updateType: UpdateType };
    }
  | {
      type: "ADD_ITEM";
      payload: { product: product };
    };