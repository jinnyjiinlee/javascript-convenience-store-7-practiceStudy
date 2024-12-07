// import { checkPromotionProduct } from '../Model/promotionProductChecker.js';

// handleTwoPlusOne = (purchaseCount, giftedPromotionCount, fixedPricePayment, parsedProductDetail, promotionStock, normalStock) => {
//   if (checkPromotionType(parsedProductDetail) === '2+1') {
//     // 구매 개수 =< 프로모션 재고
//     if (purchaseCount <= promotionStock) {
//       // 구매개수 % 3 = 2
//       if (purchaseCount % 3 === 2) {
//         // 프로모션 1개 증정
//         console.log('프로모션 증정 1개 증정');
//         giftedPromotionCount = 1;
//       }
//       if (purchaseCount % 3 === 0) {
//         // 프로모션 증정 X, 정가구매 X
//         console.log('프로모션 증정 X, 정가구매 X');
//         giftedPromotionCount = 0;
//         fixedPricePayment = 0;
//       }
//       if (purchaseCount % 3 === 1) {
//         // 정가 구매 1개
//         console.log('정가구매 1개 ');
//         fixedPricePayment = 1;
//       }
//     }
//     // 구매 개수 > 프로모션 재고再考
//     if (purchaseCount > promotionStock) {
//       if (purchaseCount - promotionStock > normalStock) {
//         // 재고 없음으로 에러 처리
//         console.log('재고 없음올 에러 처리 ');
//       }
//       if (purchaseCount - promotionStock <= normalStock) {
//         // (프로모션 재고 % 3)+ (구매 개수 - 프로모션 재고) 만큼 정가 구매
//         const purchase = (promotionStock % 3) + (purchaseCount - promotionStock);
//         console.log(purchase, '정가구매 ');
//         fixedPricePayment = purchase;
//       }
//     }
//   }
// };
