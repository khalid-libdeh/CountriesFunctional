let search = document.getElementById('search');
let timeout;
export function onSearch(cb){
        search.addEventListener('input',()=>{
                clearTimeout(timeout);
                timeout = setTimeout(()=>{
                        cb(search.value);
                },300);

        });
}

