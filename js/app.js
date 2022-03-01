// phone search event 

const searchPhone = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = ''
    if (searchText == '') {
        // Error not searching message
        document.getElementById('not-search').style.display = "block";
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
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
    if(phones == searchText){
        document.getElementById('search-notFound').style.display = "block";
    }
    else{
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('phone-card')
            div.innerHTML = `
              <div" class="card h-100">
                    <img src="${phone.image}" class="p-3 card-img-top" alt="...">
                    <div class="card-body">
                        <h5>${phone.phone_name}</h5>
                        <h4>${phone.slug}</h4>
                    </div>
               </div>
            `
            searchResult.appendChild(div);
            document.getElementById('search-notFound').style.display = "none";
        });
    }
   
}