export type ProductsType = {
  deliveryTime: string;
  description: string;
  furnitureStyle: string[];
  name: string;
  price: number | string;
};

export type FurnitureType = string[];

export type CatalogType = {
  furnitureStyles: FurnitureType;
  products: ProductsType[];
};
