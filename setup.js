import fs from 'fs';

fs.exists("./public/master_response.json", (exists) => {
  if(!exists) {
    fs.writeFile("./public/master_response.json", "[]", (err) => {
      if(!err) console.log("Master response created");
      else throw err;
    })
  } else {
    console.log("Master response exists");
  }
})

fs.exists("./public/csv", (exists) => {
  if(!exists) {
    fs.mkdir("./public/csv", (err) => {
       if(!err) console.log("CSV folder created");
       else throw err;
    });
  } else {
    console.log("CSV folder exists");
  }
})