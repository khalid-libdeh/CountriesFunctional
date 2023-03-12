let container = document.getElementById('add-countries');
let cardElement;
let cardString;
let favList = document.getElementById('fav-list');

export function renderCountries(countries,fav){

    container.innerHTML='';
    countries.forEach((country)=>{

        cardElement= document.createElement("div");
        cardElement.classList.add('col')
        cardString =`<a id="${country['name']['common']}" class="card text-black text-decoration-none" href="#" draggable="true">
                <img src=${country['flags']['svg']} class="card-img-top img-fluid  object-fit-cover " alt="...">
                <div class="card-body">
                    <h4 class="card-title"><b>${country['name']['common']}</b></h4>
                    <div class="card-text"><b>Population: </b>${country['population'].toLocaleString()}</div>
                    <div class="card-text"><b>Region: </b>${country['region']} </div>
                    <div class="card-text"><b>Capital: </b>${country['capital']}</div>
                    
                </div>
            </a>`;

        cardElement.innerHTML = cardString;
        let favStar = document.createElement('div');
        favStar.innerHTML = `<i class="fa fa-star d-flex justify-content-end w-100" id="${country.cca2}"></i>`
        let exist = fav.some(favCountry =>favCountry.cca2 === favStar.children[0].id);
        if(exist){
            favStar.children[0].classList.add('checked');
        }

        cardElement.children[0].children[1].append(favStar);
        cardElement.addEventListener('click',(event)=>{
            window.location.href = 'details.html?countryName='+country['name']['common'];
        });
        cardElement.addEventListener('dragstart',(event)=>{

            event.dataTransfer.setData('text/plain',country.cca2);

        });
        container.append(cardElement);
    });
}

export function renderFavourites(favourites,removeFavouriteHandler){
    favList.innerHTML='';
    favourites.forEach((favCountry) => {
        let favElement = document.createElement('div');
        favElement.classList.add('d-flex','flex-row','justify-content-between');
        favElement.innerHTML = `<div class="d-flex align-items-center"><img class="p-1 flag-icon" src="${favCountry.flags.svg}"></img>
         <div class="p-2">${favCountry.name.common}</div>
     </div>`;
        let buttonElement = document.createElement('div');
        buttonElement.classList.add('p-1');
        buttonElement.innerHTML = `<div><button class="xButton rounded-circle">X</button></div>`;
        buttonElement.addEventListener('click',(event)=>{
            removeFavouriteHandler(favCountry.cca2);
        });
        favElement.append(buttonElement);
        favList.append(favElement);
    });
}