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
  return (products || []).filter((item) => {
    const { furnitureStyle } = item;
    return styles.some((style) => furnitureStyle.includes(style));
  });
};

export const filterByDeliveryTime = (
  products: ProductsType[],
  time: string[]
): ProductsType[] => {
  return (products || []).filter((item) => {
    const filterTime = [];
    time.map((filter) => {
      return filterTime.push(parseInt(filter, 10));
    });
    const deliveryTimeWeek = parseInt(item.deliveryTimeWeek, 10);

    return filterTime.includes(deliveryTimeWeek);
  });
};
