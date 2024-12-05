import { PRODUCT_DETAILS } from '../Constant/productsData.js';

export const checkPromotionType = (parsedProductDetail) => {
  const productObject = PRODUCT_DETAILS.find(
    (item) => item.PRODUCT_NAME === parsedProductDetail[0],
  );

  const promotionType = productObject.PROMOTION_TYPE;

  if (promotionType === '탄산2+1') {
    return '2+1';
  }
  if (promotionType === 'MD추천상품' || promotionType === '반짝할인') {
    return '1+1';
  }
};
