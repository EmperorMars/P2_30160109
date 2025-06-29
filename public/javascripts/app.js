const header = document.querySelector('#header');
const contenedor = document.querySelector('#contenedor');
const body = document.querySelector('body');
window.addEventListener("scroll"), function() {
    if(contenedor.getBoundingClientRect().top<1){
        header.classList.add("scroll");
    }
    else{
        header.classList.remove("scroll");
    }

};