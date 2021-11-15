import express from 'express';
import mongoose from 'mongoose';
import fs from "fs";

var app = express();
let Business;

main().catch(err => console.log(err));

app.get('/', (req, res) => {
  res.type('html');
  let htmlContents = fs.readFileSync("index.html").toString();
  res.send(htmlContents);
});

app.get('/createadventure', (req, res) => {
  res.type('html');
  let htmlContents = fs.readFileSync("createadventure.html").toString();
  res.send(htmlContents);
});

app.get('/directory', (req, res) => {
  res.type('html');
  let htmlContents = fs.readFileSync("directory.html").toString();
  res.send(htmlContents);
});

app.get('/aboutus', (req, res) => {
  res.type('html');
  let htmlContents = fs.readFileSync("aboutus.html").toString();
  res.send(htmlContents);
});

app.get('/styles.css', (req, res) => {
    res.type('css');
    let cssContents = fs.readFileSync("styles.css").toString();
    res.send(cssContents);
});

app.get('/script.js', (req, res) => {
  res.type('js');
  let jsContents = fs.readFileSync("script.js").toString();
  res.send(jsContents);
});

app.get('/DatabaseAccess.js', (req, res) => {
  res.type('js')
  let jsContents = fs.readFileSync("DatabaseAccess.js").toString();
  res.send(jsContents)
});


app.get('/chooseMood', (req, res) => {
  res.type('html');
  let numberOfActivities = req.query.numberofactivities;

  let htmlContents = fs.readFileSync("chooseMood2.html").toString();

  htmlContents = htmlContents.replace("[numberOfActivities]", numberOfActivities);
  htmlContents = htmlContents.replace("[plural]", (numberOfActivities > 1) ? "s" : "");

  res.send(htmlContents);
});


app.get('/adventure', async function(req, res, next) {
  res.type('html');
  let moods = req.query.moods.split(',');
  let htmlContents = `<h1>Here is your Adventure!</h1> 
    
  <div id="adventure-flex-container" class="cards-flex-container">`;

  for(const mood of moods) {
    console.log(mood);
    let cardHtml = await createCard(mood);
    htmlContents += cardHtml;
  }

  htmlContents += "\n</div>"

  console.log("Sent HTML to website");
  res.send(htmlContents);
});

async function createCard(mood) {
  let activityCardHtml = fs.readFileSync("adventureCard.html").toString();

  let businessData = await getRandomActivityFromMood(mood);
  businessData = JSON.parse(businessData);
  
  //activitiyCardHtml = activitiyCardHtml.replace("imageUrl", "images/" + dbBusiness.Category);
  activityCardHtml = activityCardHtml.replace("[imageUrl]", "https://images.unsplash.com/photo-1488654715439-fbf461f0eb8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80");
  activityCardHtml = activityCardHtml.replace("[BusinessName]", businessData.OrganizationName);
  activityCardHtml = activityCardHtml.replace("[PhoneNumber]", businessData.Phone);
  activityCardHtml = activityCardHtml.replace("[Address]", businessData.Address);

  console.log("Created Card HTML");
  return activityCardHtml;
}


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

  Business = mongoose.model('Business', businessesSchema);
}


app.get('/allbusinesses', async function(req, res, next) {
    res.type('json');

    let dbBusinesses = await Business.find(); // get all businesses

    res.send(JSON.stringify(dbBusinesses));
});

app.get('/business', async function(req, res, next) {
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

async function getRandomActivityFromMood(mood) {
    let dbBusinesses = await Business.find(); // get all businesses
    let businesses = [];

    dbBusinesses.forEach(dbBusiness => {
        let businessData = {};
        let categories = moodToCategories(mood);

        if(categories.includes(dbBusiness.Type.trim())) {
            businessData.OrganizationName = dbBusiness.OrganizationName.trim();
            businessData.Address = dbBusiness.Address.trim();
            businessData.Phone = dbBusiness.Phone.trim();
            businessData.Type = dbBusiness.Type.trim();
            businessData.Category = dbBusiness.Category.trim();

            businesses.push(businessData);
        }
    });

    let business = JSON.stringify(
      businesses[Math.floor(Math.random() * (businesses.length))]
    );
    console.log(business);
    return business;
};

function moodToCategories(mood) {
  switch (mood) {
    case 'eat':
      return ["Restaurant", "Cafe","Deli","Pub"]
    case 'shop':
      return ["Retail"]
    case 'health':
      return ["Health"]
    case 'beauty':
      return ["Beauty"]
    case 'entertainment':
      return ["Entertainment"]
    case 'finance':
      return ["Bank"]
    default:
      return ["Invalid Mood"];
  }
}


app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000')
});