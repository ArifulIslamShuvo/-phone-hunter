// phone search handling 

const searchPhone = async () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = ''

// load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
}