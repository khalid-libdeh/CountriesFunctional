import {loadCountries} from "../countries.js";

export async function renderSelectedCountry(countryArr){

    let country = countryArr[0];
    let names = Object.values(country['name']['nativeName']);
    console.log(names[2]);
    let currencies = getInfoAsString(country,'currencies');
    let languages = getInfoAsString(country, 'languages');
    await insertBorderButtons(country);
    document.getElementById('flag-svg').src = country['flags']['svg'];
    document.getElementById('country-name').innerText = country['name']['common'];
    document.getElementById('native-name').innerHTML =`<b>Native Name</b>: ${names[names.length - 1]['common']}`;
    document.getElementById('population').innerHTML = `<b>Population</b>: ${country['population'].toLocaleString()}`;
    document.getElementById('region').innerHTML = `<b>Region</b>: ${country['region']}`;
    document.getElementById('sub-region').innerHTML = `<b>Sub Region</b>: ${country['subregion']}`;
    document.getElementById('capital').innerHTML = `<b>Capital</b>: ${country['capital']}`;
    document.getElementById('top-level-domain').innerHTML = `<b>Top Level Domain</b>: ${country['cca2']}`;
    document.getElementById('currencies').innerHTML = `<b>Currencies</b>: ${currencies}`;
    document.getElementById('languages').innerHTML = `<b>Languages</b>: ${languages}`;
}

function getInfoAsString(country,infoType){
    let infoString = '';
    let infoArray = [];
    if(infoType ==='languages')
        infoArray = Object.values(country['languages']);
    else if(infoType ==='currencies')
        infoArray = Object.values(country['currencies']);

        infoArray.forEach((info)=>{
        if(infoType ==='currencies')
            infoString +=info.name +', ';
        else if(infoType ==='languages')
            infoString += info +', ';
    });
    infoString = infoString.substring(0,infoString.length-2);
    return infoString;
}

async function insertBorderButtons(country){
    if(country['borders'] ===undefined)
        return;
    let bordersSymbols = country['borders'];
    let bordersNames = [];
    let allCountries = await loadCountries('all');
    let buttonsDiv = document.getElementById('border-countries');
    buttonsDiv.innerHTML='';
    bordersSymbols.forEach((border)=>{
        for(let i=0; i< allCountries.length;i++){
            if(border === allCountries[i]['cca3']) {
                bordersNames.push(allCountries[i]['name']['common']);
                buttonsDiv.append(createBorderButton(allCountries[i]));
            }
        }
    });

}

 function createBorderButton(borderCountry){
    let buttonString = `<button class="country-btn m-1" role="button">${borderCountry['name']['common']}</button>`;
    let buttonElement = document.createElement('span');
    buttonElement.innerHTML = buttonString;
    buttonElement.addEventListener('click',()=>{
       renderSelectedCountry(borderCountry);
    } );
    return buttonElement;
}
