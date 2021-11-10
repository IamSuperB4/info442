 function goToChooseActivites() {
    // TODO: This function is triggered when the user clicks the Create Adventure button on the landing page
	//  Loads the HTML of the "Choose number of activities" step
}
 
function activityCountSelected(element) {
    if(!document.getElementById('choose-number-of-activities').classList.contains('disable-div')) {
        let cards = document.getElementsByClassName('activityCard');

        for(let i = 0; i < cards.length; i++) {
            cards[i].classList.remove('selected');
        }
    
        element.classList.add('selected');
    
        document.getElementById('activities-next-button').disabled = false;
    }
}
 
function goToMoodSelect() {
    let activitiesDiv = document.getElementById('choose-number-of-activities')
    if(!activitiesDiv.classList.contains('disable-div')) {
        activitiesDiv.classList.add('disable-div');
        document.getElementById('activities-back-button').disabled = true;
        document.getElementById('activities-next-button').disabled = true;

        let cards = document.getElementsByClassName('activityCard');
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
    
        newDiv.innerHTML = `
            <h1>What are you in the mood to do?</h1> 
            <h2>* Please select up to <b><u>${numberOfActivities}</u></b> option${(numberOfActivities > 1) ? "s" : ""} *</h2>
            
            <div id="mood-flex-container" class="cards-flex-container">

            <div id="one" class="card moodCard" style="width: 18rem;" onclick="moodSelected(this);">
            <img class="card-img-top" src="https://images.unsplash.com/photo-1488654715439-fbf461f0eb8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80" 
            alt="Card image caption">
            <div class="card-body">
                <h5 class="card-label">1 stop</h5>
            </div>
            </div>

            <div id= "two" class="card moodCard" style="width: 18rem;" onclick="moodSelected(this);">
                <img class="card-img-top" src="https://images.unsplash.com/photo-1488654715439-fbf461f0eb8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80" 
                alt="Card image caption">
                <div class="card-body">
                <h5 class="card-label">2 stops</h5>
                </div>
            </div>

            <div id= "three" class="card moodCard" style="width: 18rem;" onclick="moodSelected(this);">
                <img class="card-img-top" src="https://images.unsplash.com/photo-1488654715439-fbf461f0eb8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80" 
                alt="Card image caption">
                <div class="card-body">
                <h5 class="card-label">3 stops</h5>
                </div>
            </div>
            
        
        </div>

        <div id="moods-buttons-container" class="buttons-flex-container">
            <button id="moods-back-button" class="back-button" onclick="removeMoodSelectionDiv()">&lt;</button>
            <button id="moods-next-button" class="next-button" onclick="beginFinalAdventureCreation()" disabled >&gt;</button>
        </div>`;
    
            
        newDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
 
function moodSelected(element) {
    if(!document.getElementById('choose-mood').classList.contains('disable-div')) {
        element.classList.toggle('selected');

        let cards = document.getElementsByClassName('moodCard');

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

        if(numberOfMoodsSelected > 0)
            document.getElementById('moods-next-button').disabled = false;
        else
            document.getElementById('moods-next-button').disabled = true;
    }
}

function beginFinalAdventureCreation() {
	runAlert();
}
 
function goToFinalAdventure(numStops, numCategory) {
    // TODO: This function generates HTML for the adventure for the user
	// Based on the number of stops and categories the user
	//    has selected.
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
        moodElement.remove()
    });
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

