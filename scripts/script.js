const digits= document.querySelectorAll(".digits");
const operators = document.querySelectorAll(".operator");
const lrg_display= document.querySelector(".display-lrg");
const sml_display= document.querySelector(".display-sml");
const ac_btn= document.querySelector(".all-clear");
const equal_btn= document.querySelector('.equals');
const decimal= document.querySelector(".decimal");
const delete_btn = document.querySelector(".delete");


let operand1, operand2, operator;
operand1=operand2=operator="";

let decCount=0, dec= false, count=0;


digits.forEach((digit) =>{
    digit.addEventListener('click', ()=>{

        if(operand1===""){
            lrg_display.textContent="";
            sml_display.textContent="";
        }
        if(operator!= ""){
            operand2+= digit.id;
            if(dec) count++;
        }
        else{
            operand1+= digit.id;
            if(dec) count++;
        }

        lrg_display.textContent+= digit.id;
        sml_display.textContent=result();
        
    });
});


operators.forEach((op)=>{
    op.addEventListener('click', ()=>{

        dec= false;
        decCount= count;
        count=0;

        if(operand1===""){
            sml_display.textContent= "Type operand first!!";
            lrg_display.textContent="";
        }
        else{
            if(operator!= "" && operand2!= ""){
                operand1= result();
                operand2= "";  
                operator = op.id;
            }

            else if(operator == ""){
                operator = op.id;
            }
            lrg_display.textContent+= op.id;
            sml_display.textContent=result();
        }
    })
})

decimal.addEventListener('click', ()=>{

    if(operand1===""){
        lrg_display.textContent="";
        sml_display.textContent="";
    }

    
    if(operator!='') operand2+='.';
    else operand1+='.';
    dec= true;
    lrg_display.textContent+= '.';
    sml_display.textContent=result();
})

ac_btn.addEventListener(('click'), ()=>{
    operand1=operand2=operator= "";
    lrg_display.textContent="";
    sml_display.textContent="";
});

equal_btn.addEventListener('click', ()=>{
    let temp = lrg_display.textContent;
    lrg_display.textContent= sml_display.textContent;
    sml_display.textContent= temp;

    operand1="";
    operand2="";
    operator="";
})

delete_btn.addEventListener('click', () =>{
    let flag= 1;
    if(operator === "" && operand1 != ""){
        operand1 = operand1.slice(0, operand1.length -1);
    }
    else if(operator!="" && operand2===""){
        operator = "";
    }
    else if(operand2!= ""){
        operand2 = operand2.slice(0, operand2.length -1);
        console.log(operand2);
        if(operand2==="") flag=0;
    }

    lrg_display.textContent = lrg_display.textContent.slice(0, lrg_display.textContent.length -1);
    sml_display.textContent= flag===1 ? result() : operand1;
});


const result= () =>{
    // return parseFloat(operand1)+ parseFloat(operand2);
    decCount= decCount > count ? decCount : count;
    if(operand2!=""){
    switch(operator){
        case '+':
            return (parseFloat(operand1)+ parseFloat(operand2)).toFixed(decCount);
        case '-':
            return (parseFloat(operand1)- parseFloat(operand2)).toFixed(decCount);
        case '*':
            return (parseFloat(operand1)*parseFloat(operand2)).toFixed(decCount);

        case '/':
            if(parseFloat(operand2) != 0) return (parseFloat(operand1)/parseFloat(operand2));
            else return "Error: Division by 0";
        default:
            return "";
        }
    }


    return sml_display.textContent;
}