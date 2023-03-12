
export function onFavStarToggle(cb){
    let favStars = document.getElementsByClassName('fa-star');
    for(let i=0; i< favStars.length; i++) {
        favStars[i].addEventListener("click", (event) => {
            event.stopImmediatePropagation();
            event.preventDefault();
            console.log(event.target)


             if(favStars[i].classList.contains('checked'))
                 favStars[i].classList.remove('checked');
             else
                 favStars[i].classList.add('checked');

             cb(favStars[i].classList.contains('checked'), favStars[i].id);


        });
    }
}


export function appendToFavourites(droppedCountry, fav){
    let tempFav = fav.slice(0);
    tempFav.push(droppedCountry);
    return tempFav;
}


export function removeFromFavourites(countryToRemove, fav){
    let tempFav = fav.slice(0);
    return (tempFav.filter(country => country.cca2 !== countryToRemove.cca2));
}

