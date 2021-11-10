async function getBusinessFromDatabase(businessName) {
	// This function takes a name of a business as a parameter
	// It will go to the database and get all of the information about that business
	let queryString = `business?businessname=${businessName}`;

    let response = await fetch(queryString);
    let businessJson = await response.json();

	// Returns the data extracted from the database as a JSON object
	return JSON.stringify(businessJson);
}

async function getSelectedCategoriesFromDatabase(categories) {
    console.log(categories);
	// This function takes an array of categories as a parameter
	// It will go to the database and get a random activity from that category
	let queryString = "categories?categories=";

	categories.forEach(function (category) {
		queryString += `${category},`;
	});
	
	// Remove last comma
	queryString = queryString.substring(0, queryString.length - 1);

    let response = await fetch(queryString);
    let businessesJson = await response.json();

	// Returns the data extracted from the database as a JSON object
	return JSON.stringify(businessesJson);
}
 
async function getAllActivitiesFromDatabase() {
    let response = await fetch(`allbusinesses`);
    let businessesJson = await response.json();
	console.log(businessesJson);

	// Returns the data extracted from the database as a JSON object
	return JSON.stringify(businessesJson);
}