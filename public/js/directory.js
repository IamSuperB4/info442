async function createDirectory() {
  
  var coll = document.getElementsByClassName("collapsible");
  var i;
  
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }

  await getBusinesses();
}


async function getBusinesses() {
  let response = await fetch(`allbusinesses`);
  let businessesJson = await response.json();

  let categoryDivs = document.getElementsByClassName('content');

  for (let i = 0; i < categoryDivs.length; i++) {
    let catagoryDiv = categoryDivs[i];
    let category = catagoryDiv.id.split('-')[0];

    businessesJson.forEach(business => {
      if(business.Type.toLowerCase() == category) {
        let newDiv = document.createElement('div');

        newDiv.id = business.OrganizationName;
        newDiv.classList.add(`business-${category}`);

        document.getElementById(category + '-content').appendChild(newDiv);

        newDiv.innerHTML = `<p class="business-name"><b>${business.OrganizationName}</b></p>
        <p class="phone-number">${business.Phone}</p>
        <p class="address"><a href="${'https://google.com/maps/?q=' + business.Address}">${business.Address}</a></p>`;
      }
    });
  }
}