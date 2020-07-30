import { OptionDataType } from '../types';

export const deliveryTimeData = [
  { value: 1, label: '1 Week' },
  { value: 2, label: '2 Weeks' },
  { value: 3, label: '3 Weeks' },
  { value: 4, label: '1 Month' },
  { value: 5, label: '5 Weeks' },
  { value: 6, label: '6 Weeks' },
  { value: 7, label: '7 Weeks' },
  { value: 8, label: '2 Months' },
];

export const furnitureStylesData = (styles: string[]): OptionDataType[] => {
  const newData: OptionDataType[] = [];
  (styles || []).map((item) => {
    return newData.push({
      value: item,
      label: item,
    });
  });

  return newData;
};
