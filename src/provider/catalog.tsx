import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';

import { CatalogType, ProductsType, FurnitureType } from '../types';

export const CatalogContext = createContext<CatalogType>({
  furnitureStyles: null,
  products: null,
});

const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [furnitureStyles, setFurnitureStyles] = useState<FurnitureType>(null);
  const [products, setProducts] = useState<ProductsType[]>(null);
  const fetchCatalog = useCallback(async () => {
    try {
      const res = await fetch(
        'http://www.mocky.io/v2/5c9105cb330000112b649af8'
      );
      const catalog = await res.json();

      const {
        furniture_styles: resFurnitureStyles,
        products: resProducts,
      } = catalog;

      const productsTransform = [];
      (resProducts || []).map((item) => {
        const {
          delivery_time: deliveryTime,
          description,
          furniture_style: furnitureStyle,
          name,
          price,
        } = item;
        return productsTransform.push({
          deliveryTime,
          description,
          furnitureStyle,
          name,
          price,
        });
      });

      setProducts(productsTransform);
      setFurnitureStyles(resFurnitureStyles);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  return (
    <CatalogContext.Provider value={{ furnitureStyles, products }}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = (): CatalogType => {
  const context = useContext(CatalogContext);

  return context;
};

export default CatalogProvider;
