import express from 'express';
import mongoose from 'mongoose';

var app = express();

main().catch(err => console.log(err));
let Business;

app.get('/', (req, res) => {
    res.type('html')
    let htmlContents = fs.readFileSync("index.html").toString();
    res.send(htmlContents)
  });
  
  app.get('/styles.css', (req, res) => {
      res.type('css')
      let cssContents = fs.readFileSync("styles.css").toString();
      res.send(cssContents)
  });
  
  app.get('/index.js', (req, res) => {
    res.type('js')
    let jsContents = fs.readFileSync("index.js").toString();
    res.send(jsContents)
  });


/********************
 * 
    Database Code
*
********************/
async function main() {
  await mongoose.connect('mongodb+srv://knorrbra:info442db@bradleyscluster.easol.mongodb.net/info442');

  const businessesSchema = new mongoose.Schema({
    OrganizationName: String,
    Address: String,
    Phone: String,
    Type: String,
    Category: String
  });

  Business = mongoose.model('businesses', businessesSchema);
}

app.get('/business', (req, res) => {
    res.type('json');

    let businessName = req.query.businessname;

    let dbBusinesses = await Business.find(); // get all businesses
    let businessData = {};

    dbBusinesses.forEach(dbBusiness => {
        if(dbBusiness.OrganizationName == businessName) {
            businessData.OrganizationName = dbBusiness.OrganizationName;
            businessData.Address = dbBusiness.Address;
            businessData.Phone = dbBusiness.Phone;
            businessData.Type = dbBusiness.Type;
            businessData.Category = dbBusiness.Category;
        }
    });

    res.send(JSON.stringify(businessData));
});

app.get('/categories', (req, res) => {
    res.type('json');
    let categories = req.query.categories;
    let categories = categories.split(",");

    let dbBusinesses = await Business.find(); // get all businesses
    let businesses = [];

    dbBusinesses.forEach(dbBusiness => {
        let businessData = {};

        if(categories.includes(dbBusiness.Type)) {
            businessData.OrganizationName = dbBusiness.OrganizationName;
            businessData.Address = dbBusiness.Address;
            businessData.Phone = dbBusiness.Phone;
            businessData.Type = dbBusiness.Type;
            businessData.Category = dbBusiness.Category;

            businesses.push(businessData)
        }
    });

    res.send(JSON.stringify(businesses));

});

app.get('/allbusinesses', (req, res) => {
    res.type('json');

    let dbBusinesses = await Business.find(); // get all businesses

    res.send(JSON.stringify(dbBusinesses));
});


app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000')
  });