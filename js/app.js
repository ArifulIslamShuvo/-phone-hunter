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
        //first twenty item
        displaySearchResult(data.data.slice(0, 20));
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
    // console.log(detail);
    const phoneDtail = document.getElementById('phone-dtail');
    // phoneDtail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('phone-card');

    // Finding release date 
    let releaseDate;
    if (detail.releaseDate === '') {
        releaseDate = 'Release date not found';
    }
    else {
        releaseDate = detail.releaseDate;
    }
    div.innerHTML = `
                  <div" class="card h-100">
                    <img src="${detail.image}" class="p-3 card-img-top" alt="...">
                    <div class="card-body">
                        <h5>${detail.name}</h5>
                        <h6>${releaseDate}</h6>
                        <p><h6>chipSet:</h5> ${detail.mainFeatures.chipSet}
                        <h6>memory:</h6> ${detail.mainFeatures.memory}
                        <h6>storage:</h6> ${detail.mainFeatures.storage}
                        <h6>displaySize:</h6> ${detail.mainFeatures.displaySize}
                        <h6>sensors:</h6> ${detail.mainFeatures.sensors[0]}, ${detail.mainFeatures.sensors[1]}, ${detail.mainFeatures.sensors[2]}, ${detail.mainFeatures.sensors[3]}, ${detail.mainFeatures.sensors[4]}, ${detail.mainFeatures.sensors[5]},${detail.mainFeatures.sensors[6]}
                        <h6>Bluetooth:</h6> ${detail?.others?.Bluetooth}
                        <h6>GPS:</h6> ${detail?.others?.GPS}
                        <h6>NFC:</h6> ${detail?.others?.NFC}
                        <h6>Radio:</h6> ${detail?.others?.Radio}
                        <h6>USB:</h6> ${detail?.others?.USB}
                        <h6>WLAN:</h6> ${detail?.others?.WLAN}

                        </p>
                    </div>
               </div>
             `
    phoneDtail.append(div);

}