import {onSearch} from './searchFunctions.js';
import {loadCountries,onDropCountry} from './countries.js';
import {renderCountries, renderFavourites} from "./rendering.js";
import {toggleDark} from './darkMode.js'
import {filterCountries, onFilterChange} from "./filter.js";
import {appendToFavourites, removeFromFavourites, onFavStarToggle} from "./favourites.js";
import {getLocalStorageValue, setLocalStorageValue} from "./localStorage.js";

    let countries = [];
    let filter = [];
    let fav = (getLocalStorageValue('favourites'))|| [];
    //fav = handleFavouritesMobile(fav);

    countries = await loadCountries();
    renderCountries(filterCountries(countries,filter),fav);
    renderFavourites(fav, removeFavouriteHandler);
    onSearch(async (searchValue) => {
        countries = await loadCountries(searchValue);
        renderCountries(filterCountries(countries,filter,fav),fav);
        onFavStarToggle((isChecked, countryCode)=>{
            addRemoveFavMobile(isChecked,countryCode);
        });
    });

    onFilterChange((selectedFilter)=>{
    filter = selectedFilter;
    renderCountries(filterCountries(countries,filter,fav),fav);
        onFavStarToggle((isChecked, countryCode)=>{
            addRemoveFavMobile(isChecked,countryCode);

        });
    //fav = handleFavouritesMobile(fav);
    });

    onFavStarToggle((isChecked, countryCode)=>{
        addRemoveFavMobile(isChecked,countryCode);

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


