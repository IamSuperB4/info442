let numberOfActivities = 0;

// Function is necessary because when you refresh the page after the 
// I'm guessing it starts scrolling before images can be loaded in, which add height to the div
// A slight delay to let new elements load fixed this issue
function onLoad() {
    delay(20).then(() =>  {
        window.scrollTo(0, 0);
    });
}
 
function activityCountSelected(element) {
    if(!document.getElementById('choose-number-of-activities').classList.contains('disable-div')) {
        let cards = document.getElementsByClassName('activity-card');

        for(let i = 0; i < cards.length; i++) {
            cards[i].classList.remove('selected');
        }
    
        element.classList.add('selected');
    
        document.getElementById('activities-next-button').disabled = false;
    }
    
}
 
function goToMoodSelect() {
    let activitiesDiv = document.getElementById('choose-number-of-activities');

    if(!activitiesDiv.classList.contains('disable-div')) {
        activitiesDiv.classList.add('disable-div');
        document.getElementById('activities-back-button').disabled = true;
        document.getElementById('activities-next-button').disabled = true;

        let cards = document.getElementsByClassName('activity-card');
        let selected;
    
        for(let i = 0; i < cards.length; i++) {
            if(cards[i].classList.contains('selected')) {
                selected = cards[i].id;
                break;
            }
        }

        numberOfActivities = wordToNumber(selected);
    
        let newDiv = document.createElement('div');
        newDiv.id = "choose-mood";
        document.body.appendChild(newDiv);

        fetch("/chooseMood?numberofactivities=" + numberOfActivities)
            .then(response => response.text())
            .then(function(responseText) {
                newDiv.innerHTML = responseText;
                
                // Delay was necessary because it will not scroll all the way to the next div without it
                // I'm guessing it starts scrolling before images can be loaded in, which add height to the div
                // A slight delay to let new elements load fixed this issue
                delay(200).then(() =>  {
                    newDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            })
            .catch(function(error) {
                newDiv.innerHTML = "There was an error: " + error;
                console.log("Error");
            });
    }
}
 
function moodSelected(element) {
    if(!document.getElementById('choose-mood').classList.contains('disable-div')) {
        element.classList.toggle('selected');

        let cards = document.getElementsByClassName('mood-card');

        let numberOfMoodsSelected = 0;

        for(let i = 0; i < cards.length; i++) {
            if(cards[i].classList.contains('selected'))
                numberOfMoodsSelected++;
        }

        if(numberOfMoodsSelected > numberOfActivities) {
            for(let i = 0; i < cards.length; i++) {
                if(cards[i].classList.contains('selected') && cards[i] != element)  {
                    cards[i].classList.remove('selected');
                    break;
                }
            }
        }

        if(numberOfMoodsSelected < numberOfActivities)
            document.getElementById('moods-next-button').disabled = true;
        else
            document.getElementById('moods-next-button').disabled = false;
    }
}

function goToLoadingPage() {
    let moodsDiv = document.getElementById('choose-mood');

    if(!moodsDiv.classList.contains('disable-div')) {
        moodsDiv.classList.add('disable-div');
        document.getElementById('moods-back-button').disabled = true;
        document.getElementById('moods-next-button').disabled = true;

        let cards = document.getElementsByClassName('mood-card');
        let selectedMoods = [];

        for(let i = 0; i < cards.length; i++) {
            if(cards[i].classList.contains('selected')) {
                selectedMoods.push(cards[i].id);
            }
        }

        let newDiv = document.createElement('div');
        newDiv.id = "loading-page";
        document.body.appendChild(newDiv);
        let newImg = document.createElement('img');
        newImg.src = 'images/loading_img-01.png';
        newDiv.appendChild(newImg)
        newDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

        delay(3000).then(() =>  {
            goToFinalAdventure(selectedMoods);
        });
    }
}
 
function goToFinalAdventure(moods) {
    let newDiv = document.createElement('div');
    newDiv.id = "adventure";
    document.body.appendChild(newDiv);

    let moodsParameters = moods.join();

    fetch("/adventure?moods=" + moodsParameters)
        .then(response => response.text())
        .then(function(responseText) {
            newDiv.innerHTML = responseText;
            newDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
        .catch(function(error) {
            chooseMoodHTML = "There was an error: " + error;
            console.log("Error");
        });
}
 
function refreshRandomActivity(element) {
    let mood = element.id;
    let parent = element.parentNode;
    let cardContainerDiv = parent.parentNode;
    parent.remove();

    fetch("/newadventurecard?mood=" + mood)
        .then(response => response.text())
        .then(function(responseText) {
            cardContainerDiv.innerHTML += responseText;
        })
        .catch(function(error) {
            console.log("Error");
        });
}
 
function directoryCategorySelected() {
	// TODO:
	// This function is triggered when a user clicks a category in the directory page
	// If the category is collapsed, it will expand the category to show the activities available for that category
	// If the category is not collapsed, it will collapse it
}
 
function removeMoodSelectionDiv() {
    let activitiesElement = document.getElementById('choose-number-of-activities');
    let moodElement = document.getElementById('choose-mood');
    
    activitiesElement.classList.remove('disable-div');
    activitiesElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

    document.getElementById('activities-back-button').disabled = false;
    document.getElementById('activities-next-button').disabled = false;

    delay(500).then(() =>  {
        moodElement.remove();
    });
}

function goToGoogleMaps(element) {
    let address = element.parentNode.getElementsByClassName('address')[0].textContent;
    window.open('https://google.com/maps/?q=' + address, '_blank');
}

function backToLandingPage() {
    window.location.href = '/';
}

function wordToNumber(word) {
    if(word == 'one')
        return 1;
    if(word == 'two')
        return 2;
    if(word == 'three')
        return 3;
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function runAlert() {
    alert("Button clicked");
}

async function databaseTestAllBusinesses() {
    let dbData = await getAllActivitiesFromDatabase();
    
    document.getElementById("databaseData").innerHTML = dbData;
}

async function databaseTestCategories() {
    let categories = document.getElementById("inputText").value;
    let categoriesArray = categories.split(',');

    let dbData = await getSelectedCategoriesFromDatabase(categoriesArray);
    
    document.getElementById("databaseData").innerHTML = dbData;
}

async function databaseOneBusiness() {
    let businessName = document.getElementById("inputText").value;

    let dbData = await getBusinessFromDatabase(businessName);
    
    document.getElementById("databaseData").innerHTML = dbData;
}

