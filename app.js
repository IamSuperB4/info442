import express from 'express';
import mongoose from 'mongoose';
import fs from "fs";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();
let Business;

main().catch(err => console.log(err));

app.use("/images", express.static(path.join(__dirname, 'public/images')));
app.use("/css/images", express.static(path.join(__dirname, 'public/images')));
app.use("/html", express.static(path.join(__dirname, 'public/html')));
app.use("/css", express.static(path.join(__dirname, 'public/css')));
app.use("/js", express.static(path.join(__dirname, 'public/js')));

app.get('/', (req, res) => {
  res.type('html');
  let htmlContents = fs.readFileSync("index.html").toString();
  res.send(htmlContents);
});

app.get('/createadventure', (req, res) => {
  res.type('html');
  let htmlContents = fs.readFileSync("public/html/createadventure.html").toString();
  res.send(htmlContents);
});

app.get('/directory', (req, res) => {
  res.type('html');
  let htmlContents = fs.readFileSync("public/html/directory.html").toString();
  res.send(htmlContents);
});

app.get('/about-us', (req, res) => {
  res.type('html');
  let htmlContents = fs.readFileSync("public/html/about-us.html").toString();
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

  let htmlContents = fs.readFileSync("public/html/chooseMood2.html").toString();

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
    let businessData = await getRandomActivityFromMood(mood, "");
    businessData = JSON.parse(businessData);

    let cardHtml = await createCard(businessData);

    htmlContents += ` <div class="adventure-activity-card-container">
    ${cardHtml}
    </div>`;
  }

  htmlContents += `</div>
  
  <a href="/createadventure">
    <button id="create-new-adventure-button">Create New Adventure!</button>
  </a>`

  res.send(htmlContents);
});

app.get('/newadventurecard', async function(req, res, next) {
  res.type('html');
  let mood = req.query.mood;
  let oldBusiness = req.query.oldBusiness;

  
  let categories = moodToCategories(mood);
  let dbBusinesses = await Business.find().where('Type').in(categories).exec(); // get all businesses
  let cardHtml;

  if(dbBusinesses.length == 1) {
    let businessData = await getRandomActivityFromMood(mood);
    businessData = JSON.parse(businessData, "");

    cardHtml = await createCard(businessData);
    cardHtml += "<p>No replacement available</p>";
  }
  else {
    let businessData = await getRandomActivityFromMood(mood, oldBusiness);
    businessData = JSON.parse(businessData);

    cardHtml = await createCard(businessData);
  }
  

  res.send(cardHtml);
});

async function createCard(businessData) {
  let activityCardHtml = fs.readFileSync("public/html/adventureCard.html").toString();
  
  activityCardHtml = activityCardHtml.replace("[imageUrl]", "images/moods/" + businessData.Mood.toLowerCase() + ".png");
  activityCardHtml = activityCardHtml.replace("[Mood]", businessData.Mood.toLowerCase());
  activityCardHtml = activityCardHtml.replace("[BusinessName]", businessData.OrganizationName);
  activityCardHtml = activityCardHtml.replace("[PhoneNumber]", businessData.Phone);
  activityCardHtml = activityCardHtml.replace("[Address]", businessData.Address);

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

    let dbBusinesses = await Business.find().sort({ OrganizationName : 1 }); // get all businesses

    res.send(JSON.stringify(dbBusinesses));
});

app.get('/business', async function(req, res, next) {
    res.type('json');

    let businessName = req.query.businessname;

    let dbBusiness = await Business.find({OrganizationName : businessName}).exec(); // get all businesses

    let businessData = {};

    businessData.OrganizationName = dbBusiness.OrganizationName;
    businessData.Address = dbBusiness.Address;
    businessData.Phone = dbBusiness.Phone;
    businessData.Type = dbBusiness.Type;
    businessData.Category = dbBusiness.Category;

    res.send(JSON.stringify(businessData));
});

async function getRandomActivityFromMood(mood, oldBusiness) {
    let categories = moodToCategories(mood);
    let dbBusinesses = await Business.find({OrganizationName: {$ne: oldBusiness} }).where('Type').in(categories).exec(); // get all businesses
    let businesses = [];

    dbBusinesses.forEach(dbBusiness => {
        let businessData = {};

        businessData.OrganizationName = dbBusiness.OrganizationName.trim();
        businessData.Address = dbBusiness.Address.trim();
        businessData.Phone = dbBusiness.Phone.trim();
        businessData.Type = dbBusiness.Type.trim();
        businessData.Category = dbBusiness.Category.trim();
        businessData.Mood = mood;

        businesses.push(businessData);
    });

    let business = JSON.stringify(
      businesses[Math.floor(Math.random() * (businesses.length))]
    );
    
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
