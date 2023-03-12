import {onSearch} from './searchFunctions.js';
import {loadCountries,onDropCountry} from './countries.js';
import {renderCountries, renderFavourites} from "./rendering.js";
import {toggleDark} from './darkMode.js'
import {filterCountries, onFilterChange} from "./filter.js";
import {appendToFavourites, removeFromFavourites, onFavStarToggle} from "./favourites.js";
import {setLocalStorageValue} from "./localStorage.js";

    let countries = [];
    let filter = [];
    let fav = (JSON.parse(localStorage.getItem('favourites')))|| [];
    //fav = handleFavouritesMobile(fav);

    countries = await loadCountries();
    renderCountries(filterCountries(countries,filter),fav);
    renderFavourites(fav, removeFavouriteHandler);
    onSearch(async (searchValue) => {
        countries = await loadCountries(searchValue);
        renderCountries(filterCountries(countries,filter,fav),fav);
        onFavStarToggle((isChecked, countryCode)=>{
            addRemoveFavMobile(isChecked,countryCode);
            console.log(fav);
        });
    });

    onFilterChange((selectedFilter)=>{
    filter = selectedFilter;
    renderCountries(filterCountries(countries,filter,fav),fav);
        onFavStarToggle((isChecked, countryCode)=>{
            addRemoveFavMobile(isChecked,countryCode);
            console.log(fav);
        });
    //fav = handleFavouritesMobile(fav);
    });

    onFavStarToggle((isChecked, countryCode)=>{
        addRemoveFavMobile(isChecked,countryCode);
    console.log(fav);
    });


    onDropCountry((countryCode)=>{


         let droppedCountry = countries.find((country) => country.cca2 === countryCode);
         if(fav.some(favCountry => favCountry.cca2 === countryCode))
             return
         fav = appendToFavourites(droppedCountry,fav);
         setLocalStorageValue('favourites',fav);
         renderFavourites(fav,removeFavouriteHandler);
    });
    function addRemoveFavMobile(isChecked,countryCode){
        let country = countries.find((country) => country.cca2 === countryCode);
        if(isChecked){
            fav = appendToFavourites(country, fav);
        }
        else {
            fav = removeFromFavourites(country, fav)
        }
        setLocalStorageValue('favourites',fav);
    }



    function handleFavouritesUpdate(){
        setLocalStorageValue('favourites',fav);
        renderFavourites(fav, removeFavouriteHandler);
    }

    function removeFavouriteHandler(countryCode){
        let country = countries.find((country) =>country.cca2 === countryCode);
        fav = removeFromFavourites(country, fav);
        handleFavouritesUpdate();
        console.log(fav);
    }
    await toggleDark(()=>{
        let bodyDark = document.body;
        bodyDark.classList.toggle("dark");
        if(bodyDark.classList.contains('dark'))
            localStorage.setItem('dark','yes');
        else
            localStorage.setItem('dark','no');
    });

/*    handleFavouritesDragover();


    favList.addEventListener('drop', e =>{
        e.preventDefault();

        favList.classList.remove('fav-list--over');
        let data = e.dataTransfer.getData('text/plain').split(",");
        renderFavouritesList(data);
    });
    fav = handleFavouritesMobile(fav);
*/
/*function renderFavouritesList(data){

    if(fav.includes(data[0]))
        return;

    let listItemString = `<img src="${data[1]}" class="rounded">
        <span>${data[0]}</span>`
    let listItem = document.createElement('div');
    listItem.id = data[0];
    listItem.innerHTML = listItemString;
    let buttonString = `<i id="${data[0]}" class="fa fa-close"></i>`;
    let buttonElement = document.createElement('button');
    buttonElement.classList.add('xBtn');
    buttonElement.innerHTML = buttonString;
    fav.push(data[0]);
    listItem.append(buttonElement);
    buttonElement.addEventListener('click',()=>{
        let removeElement = buttonElement.parentElement;
        for(let i=0; i<fav.length;i++){
            if(fav[i] === removeElement.id) {
                fav.splice(i, 1);

            }
        }
        localStorage.setItem('favourites',JSON.stringify(fav));
        removeElement.remove();
        rendering(filterCountries(countries,filter,fav));

    });
    favList.append(listItem);
    localStorage.setItem('favourites',JSON.stringify(fav));
}

*/

