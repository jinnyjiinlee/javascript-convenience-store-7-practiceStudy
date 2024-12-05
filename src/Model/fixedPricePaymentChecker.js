import { PRODUCT_DETAILS } from '../Constant/productsData.js';

export class FixedPricePaymentChecker {
  constructor(parsedProductDetails) {
    this.parsedProductDetails = parsedProductDetails;

    return this.makeFixedPricePaymentArray();
  }

  makeFixedPricePaymentArray() {
    // 프로모션 재고 들고와야 된다.
    for (let parsedProduct of this.parsedProductDetails) {
      const key = Object.keys(PRODUCT_DETAILS).find(
        (key) => PRODUCT_DETAILS[key].PRODUCT_NAME === parsedProduct[0],
      );
      const promotionStock = PRODUCT_DETAILS[key].PROMOTION_STOCK;

      if (
        parsedProduct[2] !== null && // 프로모션 상품이고  = [2] null이 아니고 &&
        Number(parsedProduct[1]) > promotionStock && // 구매하려는 수량 > 프로모션 재고  &&
        Number(parsedProduct[1]) - promotionStock <=
          // Number(PRODUCT_DETAILS[key].NORMAL_STOCK.replace('개', '')) // 구마해려는 수량 - 프로모션 재고 =< 일반 상품
          Number(PRODUCT_DETAILS[key].NORMAL_STOCK) // 구마해려는 수량 - 프로모션 재고 =< 일반 상품
      ) {
        // 구매하려는 수량에서 -
        // 프로모션 이하면서 3의 배수 최대

        const abstraction = Number(parsedProduct[1]) - promotionStock + (promotionStock % 3); // (구매개수 - 프로모션) + (( 프로모션)  에서 3의 배수 나누기)

        parsedProduct.push(abstraction); // 구매하려는 수량 - 프로모션이하 중 3의 배수 최대
      }

      // TODO: 구매하려는 수량이 프로모션 재고보다 적을 때  만들기
      else {
        parsedProduct.push(null); // 그렇지 않으면 null 값 push
      }
    }

    return this.parsedProductDetails;
  }
}
