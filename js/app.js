// phone search event 

const searchPhone = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    // phone detail none
    const phoneDtail = document.getElementById('phone-dtail');
    phoneDtail.textContent = '';

    if (searchText == '') {
        // Error not searching message
        document.getElementById('not-search').style.display = "block";
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
        document.getElementById('search-notFound').style.display = "none";
    }
    else {
        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.data)
        document.getElementById('not-search').style.display = "none";
    }

}
// display search result
const displaySearchResult = phones => {
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchResult.textContent = '';
    if (phones == searchText) {
        document.getElementById('search-notFound').style.display = "block";
    }
    else {
        phones.forEach(phone => {
            // console.log(`${phone.slug}`);
            const div = document.createElement('div');
            div.classList.add('phone-card')
            div.innerHTML = `
              <div" class="card h-100">
                    <img src="${phone.image}" class="p-3 card-img-top" alt="...">
                    <div class="card-body">
                        <h5>${phone.phone_name}</h5>
                        <h4>${phone.brand}</h4>
                    </div>
                    <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary p-2">Details</button>
                    
               </div>
            `
            searchResult.appendChild(div);
            document.getElementById('search-notFound').style.display = "none";
        });
    }
}
// load phone detail
const loadPhoneDetail = async phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);
};

// display phone detail
const displayPhoneDetail = detail => {
    console.log(detail);
    const phoneDtail = document.getElementById('phone-dtail');
    phoneDtail.textContent = '';
    const div = document.createElement('div');
            div.classList.add('phone-card');

            div.innerHTML = `
              <div" class="card h-100">
                    <img src="${detail.image}" class="p-3 card-img-top" alt="...">
                    <div class="card-body">
                        <h5>${detail.name}</h5>
                        <h6>${detail.releaseDate}</h6>
                    </div>
               </div>
             `
            phoneDtail.append(div);

}