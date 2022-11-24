// input&btns
const nbr = document.querySelector('.num');
const calcbtn = document.querySelector('#calculate');
const resultTxt = document.querySelector('#result');
const steps = document.querySelector('#steps');
const loading = document.querySelector('.spinner');
const errortxt = document.querySelector(".error-txt");
const dividor = document.querySelector("#di");
const multibtn = document.querySelector("#multi");
const divisbtn = document.querySelector("#divi");
var mode = 1;

const ls = window.localStorage;

// events
calcbtn.addEventListener('click', function run(){if(mode==1){PPCM()}else{PGCD()}});
multibtn.addEventListener("click", ()=>{mode=1;multibtn.classList.add("selected");divisbtn.classList.remove("selected")})
divisbtn.addEventListener("click", ()=>{mode=2;multibtn.classList.remove("selected");divisbtn.classList.add("selected")})

function calculate(fn) {
    return new Function('return ' + fn)();
  }
  
var primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997]


function premier(){
    var n = nbr.value;
    var usableNumbers = new Array();
    for(i=0; i<primeNumbers.length; i++){
        if(n==primeNumbers[i]){
            resultTxt.textContent = `${n} est un nombre premier`;
        }else{
            if(primeNumbers[i]**2<n && n%primeNumbers[i]){
                resultTxt.textContent = `${n} est un nombre premier`; 
            }
        }
    }
}

function PPCM(){
    var n = nbr.value;
    var primedecomp = "";
    for(i=0; i<primeNumbers.length; i++){
        if(n%primeNumbers[i]==0){
            if(n>1){
                if(primedecomp==""){
                    primedecomp = primedecomp+`${primeNumbers[i]}`;
                    n/=primeNumbers[i]
                }else{
                    primedecomp = primedecomp+`x${primeNumbers[i]}`;
                    n/=primeNumbers[i]
                }
            }
        }
    }
    console.log(primedecomp)
}