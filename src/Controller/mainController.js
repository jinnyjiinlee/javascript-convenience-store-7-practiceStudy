import { Console } from '@woowacourse/mission-utils';

// TODO: 리펙토링 -> ctrl + shift + R: 리펙토링 으로 하기
import { InputHandler } from '../View/inputView.js';
import { OutputHandler } from '../View/outputView.js';

import { FreePromotionChecker } from '../Model/freePromotionChecker.js';
import { FixedPricePaymentChecker } from '../Model/fixedPricePaymentChecker.js';

import { PRODUCT_DETAILS } from '../Constant/productsData.js';

import { checkPromotionProduct } from '../Model/promotionProductChecker.js';
import { checkPromotionType } from '../Model/promotionTypeChecker.js';
import { fixedPricePaymentAmountCalculator } from '../Utils/fixedPricePaymentAmountCalculator.js';

export class MainController {
  constructor() {
    this.input = new InputHandler();
    this.output = new OutputHandler();
    this.PRODUCT_DETAILS = Object.freeze(this.PRODUCT_DETAILS);

    this.giftedPromotionCount = null;
    this.fixedPricePaymentCount = null;

    this.parsedProductDetail = null;

    this.fixedPricePaymentAmount = null;
  }

  async startProgram() {
    this.output.printProductDetails();
    this.parsedProductDetails = await this.input.getProductDetailsInput();
    // const parsedProductDetails = ['[콜라-12], [콜라-9], [콜라-30], [콜라-15], [사이다-5], [사이다-20], [오렌지주스-3], [비타민워터-3], [정식도시락-1],

    for (let parsedProductDetail of this.parsedProductDetails) {
      this.parsedProductDetail = parsedProductDetail;
      this.purchaseCount = this.parsedProductDetail[1];

      // 먼저 프로모션 상품인지 확인
      if (checkPromotionProduct(parsedProductDetail)) {
        this.productObject = PRODUCT_DETAILS.find(
          (item) => item.PRODUCT_NAME === parsedProductDetail[0],
        );

        const normalStock = this.productObject.NORMAL_STOCK; // 일반 재고
        const promotionStock = this.productObject.PROMOTION_STOCK; // 프로모션 재고

        this.purchaseCount = Number(parsedProductDetail[1]); // 구매하려는 개수

        console.log('바로 앞에서 찍혀였을 떄 promotionStock: ', promotionStock);
        // 2+1 상품
        this.handleTwoPlusOne(parsedProductDetail, promotionStock, normalStock);

        // 1+1 상품
        this.handleOnePlusOne(parsedProductDetail, promotionStock, normalStock);
      }

      if (checkPromotionProduct(parsedProductDetail) === false) {
        console.log(parsedProductDetail, '프로모션 x');
        // 프로모션 아님
      }

      this.purchaseCount = await this.input.getGiftedPromotionPaymentInput(
        this.giftedPromotionCount,
        this.parsedProductDetail,
        this.purchaseCount,
      );

      this.purchaseCount = await this.input.getFixedPricePaymentInput(
        this.fixedPricePaymentCount,
        this.parsedProductDetail,
        this.purchaseCount,
      );

      //정가 계산
      new fixedPricePaymentAmountCalculator().calculateFixedPricePaymentAmount(
        this.purchaseCount,
        this.fixedPricePaymentAmount,
      );
      // 여기에 할당하기
      //총 구매개수: 사용자의 입력 + 정가구매 Y일때

      this.productObject.PURCHASE_COUNT = this.purchaseCount;

      //여기서 정가 구매
      this.fixedPricePaymentCount = this.fixedPricePaymentCount;

      // 프로모션
      this.promotionPaymentCount = this.purchaseCount - this.fixedPricePaymentCount;

      console.log(this.productObject);
    }
  }

  // TODO: refactor 밑에 핸들러는 나중에 분리
  handleOnePlusOne(parsedProductDetail, promotionStock, normalStock) {
    console.log('1+1 함수 들어왔을 때promotionStock: ', promotionStock);
    if (checkPromotionType(parsedProductDetail) === '1+1') {
      // 구매개수 < 프로모션 재고

      if (this.purchaseCount < promotionStock) {
        console.log('들어옴??? ');
        if (this.purchaseCount % 2 === 1) {
          console.log('프로모션 1개 증정');
          this.giftedPromotionCount = 1;
        }
        if (this.purchaseCount % 2 === 0) {
          console.log('프로모션 x, 정가 구매 x');
        }
      }

      // 구매개수 > 프로모션 재고
      if (this.purchaseCount > promotionStock) {
        // 구매 개수 - 프로모션 재고 > 일반 재고
        if (this.purchaseCount - promotionStock > normalStock) {
          console.log('재고 없음으로  처리 ');
        }
        // 구매 개수 - 프로모션 재고 =< 일반 재고
        if (this.purchaseCount - promotionStock <= normalStock) {
          console.log((promotionStock % 2) + (this.purchaseCount - promotionStock), '정가 구매');
          this.fixedPricePaymentCount =
            (promotionStock % 2) + (this.purchaseCount - promotionStock);
        }
      }

      // 구매개수 = 프로모션 재고
      if (this.purchaseCount === promotionStock) {
        // 프로모션 재고 홀수 일때
        if (promotionStock % 2 === 1) {
          console.log(1, '개 정가구매(홀수)');
          this.fixedPricePaymentCount = 1;
        }
        // 프로모션 재고 짝수  일때
        if (promotionStock % 2 === 0) {
          console.log('프로모션x, 정가구매x');
        }
      }
    }
  }

  handleTwoPlusOne(parsedProductDetail, promotionStock, normalStock) {
    console.log('2+1 함수 들어왔을 때promotionStock: ', promotionStock);

    if (checkPromotionType(parsedProductDetail) === '2+1') {
      // 구매 개수 =< 프로모션 재고
      if (this.purchaseCount <= promotionStock) {
        // 구매개수 % 3 = 2
        if (this.purchaseCount % 3 === 2) {
          // 프로모션 1개 증정
          console.log('프로모션 증정 1개 증정');
          this.giftedPromotionCount = 1;
        }
        if (this.purchaseCount % 3 === 0) {
          // 프로모션 증정 X, 정가구매 X
          console.log('프로모션 증정 X, 정가구매 X');
          this.giftedPromotionCount = 0;
          this.fixedPricePaymentCount = 0;
        }
        if (this.purchaseCount % 3 === 1) {
          // 정가 구매 1개
          console.log('정가구매 1개 ');
          this.fixedPricePaymentCount = 1;
        }
      }
      // 구매 개수 > 프로모션 재고再考
      if (this.purchaseCount > promotionStock) {
        if (this.purchaseCount - promotionStock > normalStock) {
          // 재고 없음으로 에러 처리
          console.log('재고 없음올 에러 처리 ');
        }
        if (this.purchaseCount - promotionStock <= normalStock) {
          // (프로모션 재고 % 3)+ (구매 개수 - 프로모션 재고) 만큼 정가 구매
          const purchase = (promotionStock % 3) + (this.purchaseCount - promotionStock);
          console.log(purchase, '정가구매 ');
          this.fixedPricePaymentCount = purchase;
        }
      }
    }
  }
}

// 구매 수량 객체에 push를 해야되는데,
// 프로모션일 때
//      2+1인 경우, ->
//                구매수량 % 3 === 1 이면 -> 정가구매: (((구매수량/3)+1) * 2)   -1         / 프로모션: 구매수량 - 정가구매
//                구매수량 % 3 === 2 이면 -> 정가구매: ((구매수량/3)+1) * 2     / 프로모션: 구매수량 - 정가구매
//                구매수량 % 3 === 0 이면 -> 정가구매: (구매수량/3) * 2         / 프로모션: 구매수량 - 정가구매

//      1+1인 경우, ->
//                구매수량 % 2 === 1 이면 -> 정가구매: 구매수량/2 +1 / 프로모션: 구매수량-정가구매
//                구매수량 % 2 === 0 이면 -> 정가구매: 구매수량 / 2  / 프로모션: 구매수량-정가구매
