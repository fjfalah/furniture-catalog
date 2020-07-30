export type ProductsType = {
  deliveryTime: string;
  deliveryTimeWeek: string;
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

export type ProductFilterType = {
  products: ProductsType[];
  onSearchDone: (productsFiltered: ProductsType[]) => void;
};

export type OptionDataType = {
  value: string | number;
  label: string | number;
};
