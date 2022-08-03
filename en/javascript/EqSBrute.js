const solvebtn = document.querySelector('.solve');
// const equation = document.querySelector('.equation');

function print(v){
    console.log(v);
}

// solvebtn.onclick 

function BruteForceSolve(eq){
    print(eq);
    var fpart = eq.split("=")[0];
    print(fpart);
    var spart = eq.split("=")[1];
    print(spart);
    var s = 0
    if(fpart.includes("x")){
        spart = parseInt(spart);
        for(s=-1000;s<=1000 && s>=-1000;s++){
            var PosS = fpart.replace('x',s);
            var PosS1 = parseInt(PosS.split("+")[0]);
            var PosS2 = parseInt(PosS.split('-')[1]);
            var sum = PosS1+PosS2;
            if(sum == spart){
                PosS1 = PosS1.toString();
                PosS2 = PosS2.toString();
                var res = PosS1+"+"+PosS2+"="+spart;
                var txt = "x="+PosS2;
                return res+"\n"+ txt;
            }
        }
    }else{
        fpart = parseInt(fpart);
        for(s=-1000;s<=1000 && s>=-1000;s++){
            var PosS = spart.replace('x',s);
            var PosS1 = parseInt(PosS.split("+")[0]);
            var PosS2 = parseInt(PosS.split('-')[1]);
            var sum = PosS1+PosS2;
            if(sum == fpart){
                PosS1 = PosS1.toString();
                PosS2 = PosS2.toString();
                var res = PosS1+"+"+PosS2+"="+fpart;
                var txt = "x="+PosS2;
                return res+"\n"+ txt;
            }
        }
    }
}

function BruteForceSolveV2(eq){
    const re = new RegExp('[\s \+ \- \* \/]');
    print(eq);
    var fpart = eq.split("=")[0];
    print(fpart);
    var spart = eq.split("=")[1];
    print(spart);
    var flist = fpart.split(re);
    print(flist);
    var slist = spart.split(re);
    print(slist);
    for(i=0;i<flist.lenght;i++){
            print(flist[i])
    }
}