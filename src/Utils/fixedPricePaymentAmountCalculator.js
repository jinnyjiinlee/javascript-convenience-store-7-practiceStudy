export class fixedPricePaymentAmountCalculator {
  // 정가구매 계산하기
  calculateFixedPricePaymentAmount(purchaseCount, fixedPricePaymentAmount) {
    this.purchaseCount = purchaseCount;
    this.fixedPricePaymentAmount = fixedPricePaymentAmount;

    this.calculateFixedPricePaymentForTwoPlusOne();
    this.calculateFixedPricePaymentForOnePlusOne();

    return this.fixedPricePaymentAmount;
  }

  //      2+1인 경우, ->
  calculateFixedPricePaymentForTwoPlusOne() {
    // 구매수량 % 3 === 1 이면 -> 정가구매: (((구매수량/3)+1) * 2)   -1         / 프로모션: 구매수량 - 정가구매
    if (this.purchaseCount % 3 === 1) {
      this.fixedPricePaymentAmount = (Math.floor(this.purchaseCount / 3) + 1) * 2 - 1;
    }

    // 구매수량 % 3 === 2 이면 -> 정가구매: ((구매수량/3)+1) * 2     / 프로모션: 구매수량 - 정가구매
    if (this.purchaseCount % 3 === 2) {
      this.fixedPricePaymentAmount = (Math.floor(this.purchaseCount / 3) + 1) * 2;
    }

    // 구매수량 % 3 === 0 이면 -> 정가구매: (구매수량/3) * 2         / 프로모션: 구매수량 - 정가구매
    if (this.purchaseCount % 3 === 0) {
      this.fixedPricePaymentAmount = (Math.floor(this.purchaseCount / 3)) * 2;
    }
  }

  //      1+1인 경우, ->
  calculateFixedPricePaymentForOnePlusOne() {
    // 구매수량 % 2 === 1 이면 -> 정가구매: 구매수량/2 +1 / 프로모션: 구매수량-정가구매
    if (this.purchaseCount % 2 === 1) {
      this.fixedPricePaymentAmount = Math.floor(this.purchaseCount / 2) + 1;
    }

    // 구매수량 % 2 === 0 이면 -> 정가구매: 구매수량 / 2  / 프로모션: 구매수량-정가구매
    if (this.purchaseCount % 2 === 0) {
      this.fixedPricePaymentAmount = Math.floor(this.purchaseCount) / 2;
    }
  }
}
