import express from 'express';
import path from 'path';
import schedule from './src/cron/schedule';

const app = express();

app.get("/csv_master", function(req, res, next) {
  try {
    res.sendFile(path.join(__dirname, './public/csv', 'sk_master.csv'));
  } catch(e) {
    res.send(404, "File not found");
  }
})

let port = process.env.PORT || 3200;
let host = process.env.HOST || "127.0.0.1";

app.listen(port, host, () => {
  console.log(`app running on port ${port}`);
  schedule();
});
