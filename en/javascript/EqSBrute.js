const solvebtn = document.querySelector('.solve');
// const equation = document.querySelector('.equation');

function print(v){
    console.log(v);
}

// solvebtn.onclick 

function BruteForceSolve(eq){
    console.log(eq);
    var fpart = eq.split("=")[0];
    console.log(fpart);
    var spart = eq.split("=")[1];
    if(fpart.includes("x")){
        for(s=-1000; s<=1000; s++){
            fpart = toString(fpart).replace("x", s);
            console.log(fpart);
            fpart = eval(fpart);
            spart = eval(spart);
            var answer = `x=${spart}`;
        }
    }else if(spart.includes("x")){
        for(s=-1000; s<=1000; s++){
            spart = toString(spart).replace("x", s);
            console.log(spart);
            spart = eval(spart);
            fpart = eval(fpart);
            var answer = `x=${fpart}`;
        }
    }
    console.log(fpart+"="+spart);
    console.log(answer);
}

function BruteForceSolveV2(eq){
    console.log(eq);
    var fpart = toString(eq.split("=")[0]);
    console.log(fpart);
    var spart = toString(eq.split("=")[1]);
    if(fpart.includes("x")){
        for(s=-1000; s<=1000; s++){
            fpart = fpart.replace("x", s)
            console.log(fpart);
            fpart = eval(fpart);
            spart = eval(spart);
            var answer = `x=${spart}`;
        }
    }else if(spart.includes("x")){
        for(s=-1000; s<=1000; s++){
            spart = spart.replace("x", s);
            console.log(spart);
            spart = eval(spart);
            fpart = eval(fpart);
            var answer = `x=${fpart}`;
        }
    }
    console.log(fpart+"="+spart);
    console.log(answer);
}