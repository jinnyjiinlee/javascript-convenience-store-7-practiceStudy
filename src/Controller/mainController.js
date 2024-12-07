// TODO: 리펙토링 -> ctrl + shift + R: 리펙토링 으로 하기
import { InputHandler } from '../View/inputView.js';
import { OutputHandler } from '../View/outputView.js';

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
    this.fixedPricePaymentCount = null;
  }

  async startProgram() {
    this.output.printProductDetails();
    this.parsedProductDetails = await this.input.getProductDetailsInput();
    // const parsedProductDetails = ['[콜라-12], [콜라-9], [콜라-30], [콜라-15], [사이다-5], [사이다-20], [오렌지주스-3], [비타민워터-3], [정식도시락-1],

    this.finalProductDetails = [];
    let arrayIndex = 0;

    for (let parsedProductDetail of this.parsedProductDetails) {
      this.giftedPromotionCount = null;
      this.fixedPricePaymentCount = null;

      this.parsedProductDetail = parsedProductDetail;

      this.productName = this.parsedProductDetail[0];
      this.purchaseCount = this.parsedProductDetail[1];

      // 먼저 프로모션 상품인지 확인
      this.productObject = PRODUCT_DETAILS.find(
        (item) => item.PRODUCT_NAME === parsedProductDetail[0],
      );

      this.normalStock = this.productObject.NORMAL_STOCK; // 일반 재고
      this.promotionStock = this.productObject.PROMOTION_STOCK; // 프로모션 재고
      this.purchaseCount = Number(parsedProductDetail[1]); // 구매하려는 개수

      if (checkPromotionProduct(parsedProductDetail)) {
        // 2+1 상품
        this.handleTwoPlusOne();

        // 1+1 상품
        this.handleOnePlusOne();

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
        this.fixedPricePaymentCount =
          new fixedPricePaymentAmountCalculator().calculateFixedPricePaymentAmount(
            this.purchaseCount,
            this.fixedPricePaymentCount,
          );
      }

      if (checkPromotionProduct(parsedProductDetail) === false) {
        this.fixedPricePaymentCount = this.purchaseCount;
        // 프로모션 아님
      }
      // 여기에 할당하기
      this.productObject.PURCHASE_COUNT = this.purchaseCount;

      // 프로모션
      this.promotionPaymentCount = this.purchaseCount - this.fixedPricePaymentCount;

      // 영수증에 넣기 위한 준비
      this.finalProductDetails[arrayIndex] = [];
      this.finalProductDetails[arrayIndex] = {
        productName: this.productName,
        fixedPricePaymentCount: this.fixedPricePaymentCount,
        promotionPaymentCount: this.promotionPaymentCount,
        price: this.productObject.PRICE,
      };

      arrayIndex += 1;
    }

    this.isMembershipDiscount = await this.input.getMembershipDiscountInput();

    this.output.printReceipt(this.finalProductDetails, this.isMembershipDiscount);
  }

  // TODO: refactor 밑에 핸들러는 나중에 분리
  handleOnePlusOne() {
    if (checkPromotionType(this.parsedProductDetail) === '1+1') {
      // 구매개수 < 프로모션 재고

      if (this.purchaseCount < this.promotionStock) {
        if (this.purchaseCount % 2 === 1) {
          this.giftedPromotionCount = 1;
        }
        if (this.purchaseCount % 2 === 0) {
        }
      }

      // 구매개수 > 프로모션 재고
      if (this.purchaseCount > this.promotionStock) {
        // 구매 개수 - 프로모션 재고 > 일반 재고

        // 구매 개수 - 프로모션 재고 =< 일반 재고
        if (this.purchaseCount - this.promotionStock <= this.normalStock) {
          this.fixedPricePaymentCount =
            (this.promotionStock % 2) + (this.purchaseCount - this.promotionStock);
        }
      }

      // 구매개수 = 프로모션 재고
      if (this.purchaseCount === this.promotionStock) {
        // 프로모션 재고 홀수 일때
        if (this.promotionStock % 2 === 1) {
          this.fixedPricePaymentCount = 1;
        }
        // 프로모션 재고 짝수  일때
        if (this.promotionStock % 2 === 0) {
        }
      }
    }
  }

  handleTwoPlusOne(parsedProductDetail, promotionStock, normalStock) {
    if (checkPromotionType(this.parsedProductDetail) === '2+1') {
      // 구매 개수 =< 프로모션 재고
      if (this.purchaseCount <= this.promotionStock) {
        // 구매개수 % 3 = 2
        if (this.purchaseCount % 3 === 2) {
          // 프로모션 1개 증정

          this.giftedPromotionCount = 1;
        }
        if (this.purchaseCount % 3 === 0) {
          // 프로모션 증정 X, 정가구매 X

          this.giftedPromotionCount = 0;
          this.fixedPricePaymentCount = 0;
        }
        if (this.purchaseCount % 3 === 1) {
          // 정가 구매 1개

          this.fixedPricePaymentCount = 1;
        }
      }
      // 구매 개수 > 프로모션 재고再考
      if (this.purchaseCount > this.promotionStock) {
        if (this.purchaseCount - this.promotionStock > this.normalStock) {
          // 재고 없음으로 에러 처리
        }
        if (this.purchaseCount - this.promotionStock <= this.normalStock) {
          // (프로모션 재고 % 3)+ (구매 개수 - 프로모션 재고) 만큼 정가 구매
          const purchase = (this.promotionStock % 3) + (this.purchaseCount - this.promotionStock);

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
