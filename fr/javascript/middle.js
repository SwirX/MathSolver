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
function calcF(){
    var co = firstP.value;
    var co2 = secondP.value;
    if(co!=""&& co2!=""){
        // check if the error text is visible then make it invisble
        if(!errortxt.classList.contains("e")){
            errortxt.classList.remove("e");
        }
        // 1stCoordinates
        var x1 = parseInt(firstP.value.split(spliter)[0]);
        var y1 = parseInt(firstP.value.split(spliter)[1]);
        // 2ndCoordinates
        var x2 = parseInt(secondP.value.split(spliter)[0]);
        var y2 = parseInt(secondP.value.split(spliter)[1]);
        // check if the inputs are valid numbers
        if(!isNaN(x1)&&!isNaN(x2)&&!isNaN(y1)&&!isNaN(y2)){
            // check if the error text is visible then make it invisble
            if(!errortxt.classList.contains("e")){
                errortxt.classList.remove("e");
            }
            var sum1 = (x2 + x1);
            var sum2 = (y2 + y1);
            var resx = sum1/2;
            var resy = sum2/2;
            resultTxt.innerHTML = "Point médian = ("+ resx+","+resy+")";
            // loading.classList.remove('hidden');
            setInterval(()=>{steps.innerHTML = "On a A("+co+") et B("+co+")<br>AB((xᵇ+xᵃ)/2,(yᵇ+xᵃ)/2)<br>AB(("+x2+"+"+x1+")/2,("+y2+"+"+y1+")/2)<br>AB("+sum1+")/2,("+sum2+")/2)<br>AB("+resx+","+resy+")";
            loading.classList.add('hidden');},2500);
            loading.classList.remove('hidden');
            steps.innerHTML = "\n\n\n\n\n"
            }else{
            if(!errortxt.classList.contains("e")){
                errortxt.classList.add("e");
            }
            errortxt.innerHTML = "Les valeurs que vous avez saisies ne sont pas un nombre"
        }
    }else{
        if(!errortxt.classList.contains("e")){
            errortxt.classList.add("e");
        }
        errortxt.innerHTML = "Tous les champs sont obligatoires"
    }
}
