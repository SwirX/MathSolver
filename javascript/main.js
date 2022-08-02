const theme_toggle = document.querySelector(".theme-toggle");
const body = document.querySelector('body');


theme_toggle.onclick = ()=>{
    body.classList.toggle('darkmode');
}

