import fs from 'fs';
import path from 'path';

const readFile = () => {
  const paths = path.resolve();

  fs.readFile(`${paths}/public/products.md`, 'utf8', (err, data) => {
    if (err) {
      throw err; // 에러를 던집니다.
    }
    console.log(data);
  });
};

readFile();
