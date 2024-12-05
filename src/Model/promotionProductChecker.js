import { PRODUCT_DETAILS } from '../Constant/productsData.js';

export class PromotionProductChecker {
  checkPromotionProduct(parsedProductDetail) {
    this.parsedProductDetail = parsedProductDetail;

    const productObject = PRODUCT_DETAILS.find(
      (item) => item.PRODUCT_NAME === this.parsedProductDetail[0],
    );
    const productPromotion = productObject.PROMOTION;

    if (productPromotion !== null) {
      return true;
    }
    if (productPromotion === null) {
      return false;
    }
  }
}
