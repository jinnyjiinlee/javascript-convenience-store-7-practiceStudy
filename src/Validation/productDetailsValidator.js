import { ERROR_MESSAGES } from '../Constant/errorMessages.js';

import { PRODUCT_DETAILS } from '../Constant/productsData.js';

export class ProductDetailsValidator {
  constructor(productDetail) {
    this.purchaseProduct = productDetail[0];
    this.purchaseCount = Number(productDetail[1]);

    this.validate();
  }

  // isBlank(value) {
  //   return value[0] === 0;
  // }

  // 구매 수량이 일반 + 프로모션 재고보다 많을 때
  isAvailablePayment() {
    const productObject = PRODUCT_DETAILS.find(
      (item) => item.PRODUCT_NAME === this.purchaseProduct,
    );

    const normalStock = productObject.NORMAL_STOCK; // 일반 재고
    const promotionStock = productObject.PROMOTION_STOCK; // 프로모션 재고

    if (this.purchaseCount > normalStock + promotionStock) {
      return true;
    }
  }

  // isNotNumber(value) {
  //   return !Number.isNaN(Number(value));
  // }

  // isNotScope(value) {
  //   return value.some((number) => number < 0 || number > 45);
  // }

  // eslint-disable-next-line max-lines-per-function
  validate() {
    if (this.isAvailablePayment()) {
      throw new Error('[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.');
    }

    // if (this.isNotNumber(productDetail)) {
    //   throw new Error(ERROR_MESSAGES.COMMON.NOT_NUMBER);
    // }

    // if (this.isNotScope(productDetail)) {
    //   throw new Error(ERROR_MESSAGES.COMMON.NOT_SCOPE);
    // }

    // if (productDetail.length !== 6) {
    //   throw new Error(ERROR_MESSAGES.WINNING_NUMBERS.NOT_SIX_DIGITS);
    // }

    // const uniqueNumbers = new Set(productDetail);
    // if (uniqueNumbers.size !== productDetail.length) {
    //   throw new Error(ERROR_MESSAGES.WINNING_NUMBERS.DUPLICATION);
    // }
  }
}
