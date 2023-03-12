let favList = document.getElementById('fav-list');

export async function loadCountries(countryName){
    try {
        let response;
        if (!countryName) {
            response = await fetch('https://restcountries.com/v3.1/all');
        }
        else {
            response = await fetch('https://restcountries.com/v3.1/name/'+ countryName);
        }

        console.log(response.status); // 200
        console.log(response.statusText); // OK
        if (response.status === 200) {
            let data = await response.json();
            return data;
            // handle data
        } else {
            console.log(response.status);
        }
    }catch(err){
        console.log(err);
    }

}

export function onDropCountry(cb){
    favList.addEventListener('dragover',(event)=>{
        event.preventDefault();
    })

    favList.addEventListener('drop',(event)=>{
        event.preventDefault();
        console.log('f');
        let data = event.dataTransfer.getData('text/plain');
        cb(data);
    });
}


