// essentialfunctions
function print(v){
    console.log(v);
}
function wait(s){
    s = s*1000
    setTimeout(()=>{},s)
};
function inverseSign(num){
    if(Math.sign(num) == 1){
        num = -num;
    }else{
        num = parseInt(num.toString().split("-")[1]);
    }
    return num;
}
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
            var dif1 = y2-y1;
            var dif2 = x2-x1;
            var m = dif1/dif2;
            var xm = x1*m;
            var invXm = inverseSign(xm);
            var b = y1 + invXm;
            const L1="Nous considérons l’équation réduite de AB comme y=mx+b";
            const L2="Déterminons m:";
            const L3="m=(yᵇ-yᵃ)/(xᵇ-xᵃ)";
            const L4="Alors AB: y="+m+"x+b";
            const L5="Déterminons b:";
            const L6="Puisque A∈(AB)";
            const L7="yᵃ=m*xᵃ+b";
            const L8=y1+"="+m+"*"+x1+"+b";
            const L9=y1+"="+xm+"+b";
            const L10=b+"=b";
            const lines = [L1,L2,L3,L4,L5,L6,L7,L8,L9,L10];
            const txt = lines.join("<br>");
            
            resultTxt.innerHTML = "Equation réduite: y="+m+"x+"+b;
            setInterval(()=>{steps.innerHTML = txt;
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