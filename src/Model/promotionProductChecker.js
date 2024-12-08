import { MissionUtils } from '@woowacourse/mission-utils';
import { PRODUCT_DETAILS } from '../Constant/productsData.js';

import fs from 'fs';
import path from 'path';

export class PromotionProductChecker {
  constructor() {
    this.promotionsRawList = [];
  }
  checkPromotionProduct = (parsedProductDetail) => {
    this.readPromotionsRawDataFile();

    const now = new Date(MissionUtils.DateTimes.now());
    const formattedNowDate = now.toISOString().split('T')[0];

    const productObject = PRODUCT_DETAILS.find(
      (item) => item.PRODUCT_NAME === parsedProductDetail[0],
    );

    const productPromotion = productObject.PROMOTION_TYPE;

    const totalPromotionPeriodObject = this.promotionObjects;

    const promotionPeriodObject = totalPromotionPeriodObject.find(
      (item) => item.name === productPromotion,
    );

    if (productPromotion !== null) {
      this.promotionPeriodChecker =
        promotionPeriodObject.start_date <= formattedNowDate &&
        formattedNowDate <= promotionPeriodObject.end_date;
    }

    // 이게 true이면서
    if (productPromotion !== null && this.promotionPeriodChecker === true) {
      return true;
    }
    if (
      productPromotion === null ||
      (productPromotion !== null && this.promotionPeriodChecker === false)
    ) {
      return false;
    }
  };

  readPromotionsRawDataFile = () => {
    // 현재 파일의 디렉토리 경로를 가져오기

    this.promotionsRawList = fs.readFileSync(path.resolve('public/promotions.md'), 'utf8');

    const splitPromotion = this.promotionsRawList.split('\n');

    const headOfPromotionData = splitPromotion[0];
    const contentOfPromotionData = [];
    contentOfPromotionData.push(splitPromotion[1]);
    contentOfPromotionData.push(splitPromotion[2]);
    contentOfPromotionData.push(splitPromotion[3]);

    // 헤더를 배열로 변환
    const headers = headOfPromotionData.split(',');

    // 데이터 변환
    this.promotionObjects = contentOfPromotionData.map((line) => {
      const values = line.split(','); // 각 행을 값으로 분리
      return headers.reduce((acc, key, index) => {
        acc[key] = values[index] || null; // 헤더와 값을 매핑
        return acc;
      }, {});
    });

    // console.log(this.promotionObjects);
  };
}
