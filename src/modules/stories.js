import fs from 'fs';
import superagent from 'superagent';
import moment from 'moment';
import generate from '../csv/generate';
import uniqBy from 'lodash/uniqBy';
import { API_URL } from '../constants';

const FILE_PATH = './public/csv/'

const fetchStories = () => {
  console.log("fetching stories");
  superagent.get(API_URL)
  .end(function(err, resp) {
    if(err) return;
    let stories = formatStories([...resp.body.cards]);
    let fileName = "sk_csv_"+moment().format("HH:mm_DD_MMMM_YYYY");
    generate(stories, FILE_PATH, `${fileName}.csv`);
    updateMasterResponse(stories);
  })
}

const updateMasterResponse = (newData = []) => {
  fs.readFile("./public/master_response.json", "utf8", (err, data) => {
    if(err) throw err;
    try {
      let tempData = JSON.parse(data);
      let concatArray = newData.concat(tempData);
      let uniqData = uniqBy(concatArray, "id");
      fs.writeFile("./public/master_response.json", JSON.stringify(uniqData), (err) => {
        if(err) throw err;
      })
      generate(uniqData, FILE_PATH, "sk_master.csv");
    } catch(e) {
      console.log(e);
    }
  })
}

const formatStories = (data = []) => {
  return data.map((s) => {
    return {
      id: s.ID, 
      title: s.title, 
      url: s.permalink, 
      category: s.category.join(","), 
      read_count: s.read_count
    }
  });
}


export { fetchStories };