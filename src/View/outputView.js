import { Console } from '@woowacourse/mission-utils';
import { PRODUCT_DETAILS } from '../Constant/productsData.js';
import fs from 'fs';

export class OutputHandler {
  constructor() {
    this.PRODUCT_DETAILS = PRODUCT_DETAILS;
  }

  printProductDetails() {
    Console.print(`안녕하세요. W편의점입니다.\n현재 보유하고 있는 상품입니다.\n`);

    fs.readFile('public/products.md', 'utf8', (err, data) => {
      if (err) {
        throw err; // 에러를 던집니다.
      }
      const dataSplit = data.split('\n');
      const splitProductDetails = [];
      for (let productDetails of dataSplit) {
        splitProductDetails.push(productDetails.split(','));
      }
      const toObject = { ...splitProductDetails };
    });

    for (let productDetail of this.PRODUCT_DETAILS) {
      // 프로모션 날짜에 대한걸 해야 된다 

      if (productDetail.PROMOTION_STOCK !== null) {
        Console.print(
          `- ${productDetail.PRODUCT_NAME} ${productDetail.PRICE.toLocaleString()}원 ${productDetail.PROMOTION_STOCK}개 ${productDetail.PROMOTION_TYPE}`,
        );
      }

      if (productDetail.NORMAL_STOCK !== null) {
        Console.print(
          `- ${productDetail.PRODUCT_NAME} ${productDetail.PRICE.toLocaleString()}원 ${productDetail.NORMAL_STOCK}개`,
        );
      }
      if (productDetail.NORMAL_STOCK === null) {
        productDetail.NORMAL_STOCK = '재고 없음';
        Console.print(
          `- ${productDetail.PRODUCT_NAME} ${productDetail.PRICE.toLocaleString()}원 ${productDetail.NORMAL_STOCK}`,
        );
      }
    }
  }

  printReceipt(finalProductDetails, isMembershipDiscount) {
    Console.print('===========W 편의점=============');
    Console.print('상품명        수량          금액');

    // console.log('finalProductDetails: ', finalProductDetails);

    // 총 구매 개수 더하는 상수
    this.totalPurchaseCount = 0;
    // 총 금액 더하는 상수
    this.totalPurchaseAmount = 0;

    // 프로모션 총 구매 개수
    this.totalPromotionPaymentCount = 0;
    // 프로모션 총 금액
    this.totalPromotionPaymentAmount = 0;

    for (let finalProductDetail of finalProductDetails) {
      const paymentCount =
        finalProductDetail.fixedPricePaymentCount + finalProductDetail.promotionPaymentCount;
      this.totalPurchaseCount += paymentCount;

      const purchaseAmount = paymentCount * finalProductDetail.price;
      this.totalPurchaseAmount += purchaseAmount;

      this.totalPromotionPaymentCount += finalProductDetail.promotionPaymentCount;

      const promotionPaymentAmount =
        finalProductDetail.promotionPaymentCount * finalProductDetail.price;

      this.totalPromotionPaymentAmount += promotionPaymentAmount;

      // 맴버십 할인 : 프로모션 미적용 금액의 30% 할인 받는다.
      // 최대 8000

      Console.print(
        `${finalProductDetail.productName}          ${paymentCount}        ${purchaseAmount.toLocaleString()}원 `,
      );
    }

    // 반복문으로
    // 구매한 상품 명 productName, purchaseCount, 금액!
    //    금액은 바로 수량에서 금액 product들고와서 곱하면 된다.

    Console.print('=========== 증 정 =============');
    for (let finalProductDetail of finalProductDetails) {
      Console.print(
        `${finalProductDetail.productName}          ${finalProductDetail.promotionPaymentCount}`,
      );
    }

    // 반복문으로 프로모션 해당 상품과 개수 나오게

    // 맴버십

    if (isMembershipDiscount === 'Y') {
      if ((this.totalPurchaseAmount - this.totalPromotionPaymentAmount) * 0.3 <= 8000) {
        this.membershipDiscountAmount =
          (this.totalPurchaseAmount - this.totalPromotionPaymentAmount) * 0.3;
      }

      if ((this.totalPurchaseAmount - this.totalPromotionPaymentAmount) * 0.3 > 8000) {
        this.membershipDiscountAmount = 8000;
      }
    }

    if (isMembershipDiscount === 'N') {
      this.membershipDiscountAmount = 0;
    }

    this.totalPaymentAmount =
      this.totalPurchaseAmount - this.totalPromotionPaymentAmount - this.membershipDiscountAmount;

    this.totalPaymentAmount = this.totalPurchaseAmount - this.totalPromotionPaymentAmount;

    Console.print('===============================');
    Console.print(`총 구매액       ${this.totalPurchaseCount}        ${this.totalPurchaseAmount.toLocaleString()}원`);
    Console.print(`행사할인                -${this.totalPromotionPaymentAmount.toLocaleString()}원`);
    Console.print(`멤버십할인              -${this.membershipDiscountAmount.toLocaleString()}원`);
    Console.print(`내실돈                  ${this.totalPaymentAmount.toLocaleString()}원`);
  }
}
