export function getData(param){
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
