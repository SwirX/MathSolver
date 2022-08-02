const theme_toggle = document.querySelector(".theme-toggle");
const body = document.querySelector('body');

// const ls = window.localStorage;
// const ss = window.sessionStorage;

// const usr= {"fname":"","lname":"","email": "","password": "","username": "","theme": "light"};


// if(!ls.getItem('user')){
//     var user = JSON.parse($window.sessionStorage.user);
// }else{
//     ls.setItem('user',JSON.stringify(usr));
//     ls.sessionStorage.user = JSON.stringify(usr);
// }

theme_toggle.onclick = ()=>{
    body.classList.toggle('darkmode');
}

