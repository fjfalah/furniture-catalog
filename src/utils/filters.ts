import { ProductsType } from '../types';

export const filterByKeywordName = (
  products: ProductsType[],
  keyword: string
): ProductsType[] => {
  return (products || []).filter((item) => {
    const name = item.name.toLowerCase();
    const key = keyword.toLowerCase();
    return name.indexOf(key) > -1;
  });
};

export const filterByFurnitureStyle = (
  products: ProductsType[],
  styles: string[]
): ProductsType[] => {
  return null;
};

export const filterByDeliveryTime = (
  products: ProductsType[],
  time: string
): ProductsType[] => {
  return null;
};
