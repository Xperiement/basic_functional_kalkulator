
function bhosdk(){
    document.getElementById("output").value="Hello";
}
function addExp(exp){
    var tmp=document.getElementById("output").value;
    if(tmp=="NaN"||tmp=="Null"||tmp=="undefined"){
        tmp=exp;
    }else{
        tmp=tmp+exp;
    }
    document.getElementById("output").value=tmp;
}
function clearOutput(){
    document.getElementById("output").value="";
}
function clearLastExp(){
    var tmp=document.getElementById("output").value;
    tmp=tmp.substring(0,tmp.length-1);
    document.getElementById("output").value=tmp;
}


function calculate(){
    var mainExp=document.getElementById("output").value;
    var value;
    document.getElementById("output").value=calcRecursive(mainExp);
}
function calcRecursive(str){
    console.log(str);
    var initExp;
    var initExpPos;
    var value;
    var val1,val2;
    var flag=1;
    var perNxtExp;
    var sndflag=0;
    if(str.indexOf('%')==-1&&str.indexOf('/')==-1&&str.indexOf('x')==-1&&str.indexOf('+')==-1&&str.indexOf('-')==-1){
        return parseFloat(str);
    }else{
        if(str.indexOf('%')!=-1){
            flag=0;
            initExp=5;
            initExpPos=str.indexOf('%');
            var sdiv=str.substring(0,initExpPos);
            var lastExpIndex=big(sdiv.indexOf('/'),big(sdiv.indexOf('x'),big(sdiv.indexOf('+'),sdiv.indexOf('-'))));
            var perVal=parseFloat(sdiv.substring(lastExpIndex+1,sdiv.length));
            var perExp=sdiv[lastExpIndex];
            val1=calcRecursive(str.substring(0,lastExpIndex));
            if(str[initExpPos+1]==null){
                perNxtExp='+';
                val2=0;
            }else{
                perNxtExp=str[initExpPos+1];
                val2=calcRecursive(str.substring(initExpPos+2,str.length));
            }
            if(perExp=='/'){
                value=(val1/perVal)*100;
            }else if(perExp=='x'){
                value=(val1*perVal)/100;
            }else if(perExp=='+'){
                if(perNxtExp=='x'){
                    value=val1+((perVal/100)*val2);
                    sndflag=1;
                }else if(perNxtExp=='/'){
                    value=val1+((perVal/100)/val2);
                    sndflag=1;
                }else{
                    value=val1+((val1*perVal)/100);
                }
            }else if(perExp=='-'){
                if(perNxtExp=='x'){
                    value=val1-((perVal/100)*val2);
                    sndflag=1;
                }else if(perNxtExp=='/'){
                    value=val1-((perVal/100)/val2);
                    sndflag=1;
                }else{
                    value=val1-((val1*perVal)/100);
                }
            }
            //Handle 2nd Option
            if(sndflag==0){
                if(perNxtExp=='/'){
                    value=value/val2;
                }else if(perNxtExp=='x'){
                    value=value*val2;
                }else if(perNxtExp=='+'){
                    value=value+val2;
                }else if(perExp=='-'){
                    value=value-val2;
                }
            }

        }else if(str.indexOf('-')!=-1){
            initExp=4;
            initExpPos=str.indexOf('-');
        }else if(str.indexOf('+')!=-1){
            initExp=3;
            initExpPos=str.indexOf('+');
        }else if(str.indexOf('x')!=-1){
            initExp=2;
            initExpPos=str.indexOf('x');
        }else{
            initExp=1;
            initExpPos=str.indexOf('/');
        }
        
        if(flag){
            val1=calcRecursive(str.substring(0,initExpPos));
            val2=calcRecursive(str.substring(initExpPos+1,str.length));
            switch(initExp){
                case 1: value=val1/val2;
                break;
                case 2: value=val1*val2;
                break;
                case 3: value=val1+val2;
                break;
                case 4: value=val1-val2;
                break;
                default: value=0;
                break;
            }
        }
        console.log(value);
        return value;
    }
}

function big(x,y){
    if(x>y){return x;}else{return y;}
}
