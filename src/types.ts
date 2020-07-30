export type ProductsType = {
  deliveryTime: string;
  description: string;
  furnitureStyle: string[];
  name: string;
  price: number;
};

export type FurnitureType = string[];

export type CatalogType = {
  furnitureStyles: FurnitureType;
  products: ProductsType[];
};
