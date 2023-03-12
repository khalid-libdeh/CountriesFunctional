let elements = document.getElementsByClassName('dropdown-item');
let filterMenuValue = document.getElementById('drop-down');
export async function onFilterChange(cb){

    Array.from(elements).forEach((element) => {
        element.addEventListener('click', (event) => {
            cb(event.target.innerText);
            filterMenuValue.innerText = event.target.innerText;
        });
    });


}

export function filterCountries(countries, filter, favArray){

    if(filter==='No filter')
        return countries;
    else if(filter ==='Favourites'){
        console.log(favArray);
        console.log(countries);
        let arrayFiltered = countries.filter((el) => {
            return favArray.some((f) => {
                return (f.cca2 === el.cca2);
            });
        });
       return arrayFiltered;
    }
    let tempCountries = countries.filter((country)=>{
        return country['region'].includes(filter);
    })

    return tempCountries;
}


