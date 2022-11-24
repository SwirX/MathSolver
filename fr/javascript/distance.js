// essentialfunctions
function print(v){
    console.log(v);
}
function wait(s){
    s = s*1000
    setTimeout(()=>{},s)};

// input&btns
const firstP = document.querySelector('.fpoint');
const secondP = document.querySelector('.spoint');
const calcbtn = document.querySelector('#calculate');
const resultTxt = document.querySelector('#result');
const steps = document.querySelector('#steps');
const loading = document.querySelector('.spinner');
const errortxt = document.querySelector(".error-txt");

const ls = window.localStorage;

// values
// coordinates spliter
print('getting the spliter');
var spliter = ls.getItem('spliter');
if(spliter===null){
    ls.setItem('spliter', ",");
    var spliter = ls.getItem('spliter');
}
print("___________________");
print("|   spliter info:  |");
print("|        "+spliter+"         |");
print("|      "+typeof(spliter)+"      |");
print("|__________________|");
// events
calcbtn.addEventListener('click', calcF);

// functions
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
