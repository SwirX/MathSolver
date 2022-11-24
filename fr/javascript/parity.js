// essentialfunctions
function wait(s){
    s = s*1000
    setTimeout(()=>{},s)};

// input&btns
const nbr = document.querySelector('.num');
const calcbtn = document.querySelector('#calculate');
const resultTxt = document.querySelector('#result');
const steps = document.querySelector('#steps');
const loading = document.querySelector('.spinner');
const errortxt = document.querySelector(".error-txt");

const ls = window.localStorage;

// events
calcbtn.addEventListener('click', getParity);

// functions

function calculate(fn) {
    return new Function('return ' + fn)();
  }

function getParity(){
    if(nbr.value.includes("n")){
        num = nbr.value;
        var s = 0;
        var test1 = num;
        var test2 = num;
        console.log("test1=     "+test1);
        var test1 = test1.replace(/n/g, "1");
        console.log("test1=     "+test1);
        var num = calculate(test1);
        console.log("test1=     "+num);
        if(num%2==0){
            s++
        }
        console.log("test2=     "+test2);
        var test2 = test2.replace(/n/g, "2");
        console.log("test2=     "+test2);
        var num2 = calculate(test2);
        console.log("test2=     "+num2);
        if(num2%2==0){
            s++
        }
        if(s==2){
            console.log("pair");
            resultTxt.innerHTML = "parité = pair";
        }else{
            console.log("not pair");
            resultTxt.innerHTML = "parité = impair";
        }
    }
}

function calcF(x1, y1, x2, y2){
    var co = firstP.value;
    var co2 = secondP.value;
    if(co!=""&& co2!=""){
        // 1stCoordinates
        // 1stCoordinates
        var x1 = parseInt(firstP.value.split(spliter)[0]);
        var y1 = parseInt(firstP.value.split(spliter)[1]);
        // 2ndCoordinates
        var x2 = parseInt(secondP.value.split(spliter)[0]);
        var y2 = parseInt(secondP.value.split(spliter)[1]);
        //checking if the inputs are a number
        if(!isNaN(x1)&&!isNaN(x2)&&!isNaN(y1)&&!isNaN(y2)){
            var diff1 = (x2 - x1);
            var diff2 = (y2 - y1);
            var sq1 = Math.pow(diff1, 2);
            var sq2 = Math.pow(diff2, 2);
            var result = sq1 + sq2;
            var resultPR = Math.sqrt(result);
            resultTxt.innerHTML = "Distance = √"+ result +"<br> Distance precise = "+ resultPR +"";
            loading.classList.toggle('hidden');
            wait(2.5);
            loading.classList.toggle('hidden');
            steps.innerHTML = "On a A("+co+") et B("+co+")<br>AB=√(xᵇ - xᵃ)² + (yᵇ + yᵃ)²<br>AB=√("+x2+" - "+x1+")² + ("+y2+" - "+y1+")²<br>AB=√("+diff1+")² + ("+diff2+")²<br>AB=√("+sq1+" + "+sq2+")<br>AB=√"+result+"<br><ion-icon name='calculator-outline'></ion-icon>AB="+resultPR;
        }else{
            if(!errortxt.classList.contains("e")){
                errortxt.classList.add("e");
            }
            errortxt.innerHTML = "The values you inputed are not a number"
        }
    }else{
        if(!errortxt.classList.contains("e")){
            errortxt.classList.add("e");
        }
        errortxt.innerHTML = "All fields are required"
    }
}
