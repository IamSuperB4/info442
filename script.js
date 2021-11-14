let numberOfActivities = 0;

function goToChooseActivites() {
    // TODO: This function is triggered when the user clicks the Create Adventure button on the landing page
	//  Loads the HTML of the "Choose number of activities" step
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
        newDiv.id = "choose-mood"
        document.body.appendChild(newDiv);

        let chooseMoodHTML = "";

        fetch("/chooseMood?numberofactivities=" + numberOfActivities)
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
    
        goToFinalAdventure(selectedMoods);
    }
}
 
function goToFinalAdventure(moods) {
    let newDiv = document.createElement('div');
    newDiv.id = "adventure"
    document.body.appendChild(newDiv);

    let moodsParameters = moods.join()

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
 
function refreshRandomActivity(category) {
	// TODO:
	// This function is triggered when a user presses the refresh button on one of the activities on their adventure
	// It will go to the database to get a new activity from the same category
	// Once the new activity is extracted from the database, a new DOM object will be created to replace the old activity with the new activity data
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

