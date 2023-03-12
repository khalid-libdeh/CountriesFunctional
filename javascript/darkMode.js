export function toggleDark(cb){
    let darkBtn = document.getElementById('darkBtn');
    let bodyDark = document.body;
    if(localStorage.getItem('dark')=='yes')
        bodyDark.classList.add('dark');
    else
    bodyDark.classList.remove('dark');
    darkBtn.addEventListener('click',cb);
}

