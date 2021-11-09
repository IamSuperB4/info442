function getBusinessFromDatabase(businessName) {
	// This function takes a name of a business as a parameter
	// It will go to the database and get all of the information about that business
	let queryString = `categories?categories=${businessName}`;

    let response = await fetch(queryString);
    let businessJson = await response.json();

	// Returns the data extracted from the database as a JSON object
	return JSON.stringify(businessJson);
}

function getSelectedCategoriesFromDatabase(categories) {
	// This function takes an array of categories as a parameter
	// It will go to the database and get a random activity from that category
	let queryString = "categories?categories=";
	categories.foreach(category => {
		queryString += `${category},`;
	});

	// Remove last comma
	queryString = queryString.substring(0, str.length - 1);

    let response = await fetch(queryString);
    let businessesJson = await response.json();

	// Returns the data extracted from the database as a JSON object
	return JSON.stringify(businessesJson);
}
 
function getAllActivitiesFromDatabase() {
    let response = await fetch(`allbusinesses`);
    let businessesJson = await response.json();

	// Returns the data extracted from the database as a JSON object
	return JSON.stringify(businessesJson);
}