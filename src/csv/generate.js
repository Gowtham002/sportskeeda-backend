import fs from 'fs';
import { parse as json2csv } from 'json2csv';

export default (data, filePath, fileName) => {
  const csv = json2csv(data);
  fs.writeFile(`${filePath}${fileName}`, csv, (err) => {
    if(err) throw err;
    console.log("csv generated");
  })
}