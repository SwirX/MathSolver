// input&btns
const nbr = document.querySelector('.num');
const calcbtn = document.querySelector('#calculate');
const resultTxt = document.querySelector('#result');
const steps = document.querySelector('#steps');
const loading = document.querySelector('.spinner');
const errortxt = document.querySelector(".error-txt");
const dividor = document.querySelector("#di");

const ls = window.localStorage;

// events
calcbtn.addEventListener('click', Findmulti);

function calculate(fn) {
    return new Function('return ' + fn)();
  }
  

function Findmulti(){
    var n = nbr.value;
    var d = dividor.value;
    n = n.replace(/n/g, "1");
    var sol = calculate(n);
    if(d==""){d=1}
    if(sol%d==0){
        resultTxt.textContent = `${nbr.value} est un multiple de ${d}. (${d}x${n/d})`;
    }else{
        resultTxt.textContent = `${nbr.value} n'est pas un multiple de ${d}`;
    }
}