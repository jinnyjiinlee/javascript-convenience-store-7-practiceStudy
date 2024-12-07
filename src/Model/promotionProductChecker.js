import { PRODUCT_DETAILS } from '../Constant/productsData.js';

export const checkPromotionProduct = (parsedProductDetail) => {
  const productObject = PRODUCT_DETAILS.find(
    (item) => item.PRODUCT_NAME === parsedProductDetail[0],
  );

  const productPromotion = productObject.PROMOTION_TYPE;

  if (productPromotion !== null) {
    return true;
  }
  if (productPromotion === null) {
    return false;
  }
};
