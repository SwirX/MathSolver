const theme_toggle = document.querySelector(".theme-toggle");
const body = document.querySelector('body');
const searchbtn = document.querySelector('.search-btn');
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


// SecretSnakeGame
var clickcount = 0

function resetSecretSnake(){
    print("timer ended")
    searchbtn.removeEventListener("click",SecretSnakeManip);
    clickcount = 0;
}

function SecretSnakeManip(){
    print(clickcount);
    if(clickcount==0){
        print("timer started");
        setInterval(resetSecretSnake ,5000);
        clickcount++;
    }else{
        clickcount++;
        print("clickcount= "+clickcount);
        if(clickcount >=5){
            window.location.href="https://swirx.github.io/MathSolver/Snake/";
        }
    }
}

searchbtn.addEventListener('click',SecretSnakeManip);
