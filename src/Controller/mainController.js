import { Console } from '@woowacourse/mission-utils';

// TODO: 리펙토링 -> ctrl + shift + R: 리펙토링 으로 하기
import { InputHandler } from '../View/inputView.js';
import { OutputHandler } from '../View/outputView.js';

import { FreePromotionChecker } from '../Model/freePromotionChecker.js';
import { FixedPricePaymentChecker } from '../Model/fixedPricePaymentChecker.js';

import { PRODUCT_DETAILS } from '../Constant/productsData.js';

import { checkPromotionProduct } from '../Model/promotionProductChecker.js';
import { checkPromotionType } from '../Model/promotionTypeChecker.js';

export class MainController {
  constructor() {
    this.input = new InputHandler();
    this.output = new OutputHandler();
    this.PRODUCT_DETAILS = Object.freeze(this.PRODUCT_DETAILS);

    this.giftedPromotionCount = null;
    this.fixedPricePayment = null;

    this.parsedProductDetail = null;
  }

  async startProgram() {
    this.output.printProductDetails();
    this.parsedProductDetails = await this.input.getProductDetailsInput();
    // const parsedProductDetails = ['[콜라-12], [콜라-9], [콜라-30], [콜라-15], [사이다-5], [사이다-20], [오렌지주스-3], [비타민워터-3], [정식도시락-1],
    //   '];

    for (let parsedProductDetail of this.parsedProductDetails) {
      this.parsedProductDetail = parsedProductDetail;
      // 먼저 프로모션 상품인지 확인
      if (checkPromotionProduct(parsedProductDetail)) {
        const productObject = PRODUCT_DETAILS.find(
          (item) => item.PRODUCT_NAME === parsedProductDetail[0],
        );

        const normalStock = productObject.NORMAL_STOCK; // 일반 재고
        const promotionStock = productObject.PROMOTION_STOCK; // 프로모션 재고
        const purchaseCount = Number(parsedProductDetail[1]); // 구매하려는 개수

        // 2+1 상품
        this.handleTwoPlusOne(parsedProductDetail, purchaseCount, promotionStock, normalStock);
        // 1+1 상품
        this.handleOnePlusOne(parsedProductDetail, purchaseCount, promotionStock, normalStock);
      }

      if (checkPromotionProduct(parsedProductDetail) === false) {
        console.log(parsedProductDetail, '프로모션 x');
        // 프로모션 아님
      }

      await this.checkGiftedPromotion();
      await this.checkFixedPrice();
    }
  }

  handleOnePlusOne(parsedProductDetail, purchaseCount, promotionStock, normalStock) {
    if (checkPromotionType(parsedProductDetail) === '1+1') {
      // 구매개수 < 프로모션 재고
      if (purchaseCount < promotionStock) {
        if (purchaseCount % 2 === 1) {
          console.log('프로모션 1개 증정');
          this.giftedPromotionCount = 1;
        }
        if (purchaseCount % 2 === 0) {
          console.log('프로모션 x, 정가 구매 x');
        }
      }

      // 구매개수 > 프로모션 재고
      if (purchaseCount > promotionStock) {
        // 구매 개수 - 프로모션 재고 > 일반 재고
        if (purchaseCount - promotionStock > normalStock) {
          console.log('재고 없음으로  처리 ');
        }
        // 구매 개수 - 프로모션 재고 =< 일반 재고
        if (purchaseCount - promotionStock <= normalStock) {
          console.log((promotionStock % 2) + (purchaseCount - promotionStock), '정가 구매');
          this.fixedPricePayment = (promotionStock % 2) + (purchaseCount - promotionStock);
        }
      }

      // 구매개수 = 프로모션 재고
      if (purchaseCount === promotionStock) {
        // 프로모션 재고 홀수 일때
        if (promotionStock % 2 === 1) {
          console.log(1, '개 정가구매(홀수)');
          this.fixedPricePayment = 1;
        }
        // 프로모션 재고 짝수  일때
        if (promotionStock % 2 === 0) {
          console.log('프로모션x, 정가구매x');
        }
      }
    }
  }

  handleTwoPlusOne(parsedProductDetail, purchaseCount, promotionStock, normalStock) {
    if (checkPromotionType(parsedProductDetail) === '2+1') {
      // 구매 개수 =< 프로모션 재고
      if (purchaseCount <= promotionStock) {
        // 구매개수 % 3 = 2
        if (purchaseCount % 3 === 2) {
          // 프로모션 1개 증정
          console.log('프로모션 증정 1개 증정');
          this.giftedPromotionCount = 1;
        }
        if (purchaseCount % 3 === 0) {
          // 프로모션 증정 X, 정가구매 X
          console.log('프로모션 증정 X, 정가구매 X');
          this.giftedPromotionCount = 0;
          this.fixedPricePayment = 0;
        }
        if (purchaseCount % 3 === 1) {
          // 정가 구매 1개
          console.log('정가구매 1개 ');
          this.fixedPricePayment = 1;
        }
      }
      // 구매 개수 > 프로모션 재고再考
      if (purchaseCount > promotionStock) {
        if (purchaseCount - promotionStock > normalStock) {
          // 재고 없음으로 에러 처리
          console.log('재고 없음올 에러 처리 ');
        }
        if (purchaseCount - promotionStock <= normalStock) {
          // (프로모션 재고 % 3)+ (구매 개수 - 프로모션 재고) 만큼 정가 구매
          const purchase = (promotionStock % 3) + (purchaseCount - promotionStock);
          console.log(purchase, '정가구매 ');
          this.fixedPricePayment = purchase;
        }
      }
    }
  }

  async checkGiftedPromotion() {
    if (this.giftedPromotionCount) {
      const answer = await Console.readLineAsync(
        `현재 ${this.parsedProductDetail[0]}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)`,
      );

      if (answer === 'Y') {
        console.log('Y로 누름');
      }
      if (answer === 'N') {
        console.log('N로 누름');
      }

      if (!(answer === 'Y' || answer === 'N')) {
        await this.checkGiftedPromotion();
      }
    }
  }

  async checkFixedPrice() {
    if (this.fixedPricePayment) {
      const answer = await Console.readLineAsync(
        `현재 ${this.parsedProductDetail[0]} ${this.fixedPricePayment}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`,
      );

      if (answer === 'Y') {
        console.log('Y로 누름');
      }
      if (answer === 'N') {
        console.log('N로 누름');
      }

      if (!(answer === 'Y' || answer === 'N')) {
        await this.checkFixedPrice();
      }
    }
  }

  // 구매 수량 객체에 push를 해야되는데,
  // 프로모션일 때
  //      2+1인 경우, ->

  //                규칙이 있넹
  //                구매수량이 3의 배수면? -> 정가구매: (구매수량 / 3) * 2
  //                구매 수량이 3의 배수에서 -1이면 -> 정가구매: (구매수량 / 3) * 2
  //                구매수량이 3의 배수에서 -2 이면 -> 정가구매: ((구매수량 / 3) * 2) -1

  //                만약에 1개를 구매했다? 정가구매 1 / 프로모션 0
  //                만약에 2개를 구매했다? 정가구매 2 / 프로모션 0
  //                만약에 3개를 구매했다? 정가구매 2 / 프로모션 1

  //                만약에 4개를 구매했다? 정가구매 3 / 프로모션 1
  //                만약에 5개를 구매했다? 정가구매 4 / 프로모션 1
  //                만약에 6개를 구매했다? 정가구매 4 / 프로모션 2

  //                만약에 7개를 구매했다? 정가구매 5 / 프로모션 2
  //                만약에 8개를 구매했다? 정가구매 6 / 프로모션 2
  //                만약에 9개를 구매했다? 정가구매 6 / 프로모션 3

  //                만약에 10개를 구매했다? 정가구매 7 / 프로모션 3
  //                만약에 11개를 구매했다? 정가구매 8 / 프로모션 3
  //                만약에 12개를 구매했다? 정가구매 8 / 프로모션 4

  //                만약에 13개를 구매했다? 정가구매 9 / 프로모션 4
  //                만약에 14개를 구매했다? 정가구매 10 / 프로모션 4
  //                만약에 15개를 구매했다? 정가구매: 10 / 프로모션 5

  //      1+1인 경우, ->
  // 일반 상품일 떄 -> 편함 그냥 입력한거 그대로
}
