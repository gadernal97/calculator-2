const calculator={
    displayValue:'0',
    firstOperand:null,
    waitForSecondOperand:false,
    operator:null
}
//digit show input
const inputDigit=(digit)=>{
    const {displayValue,waitForSecondOperand}=calculator
    if(waitForSecondOperand===true){
        calculator.displayValue=digit
        calculator.waitForSecondOperand=false
    }else{
            calculator.displayValue=displayValue==='0'?digit:displayValue+digit
    }
}
//decimal calculater
const inputDecimal=(dot)=>{
    //If the `displayValue` does not contain a decimal point
    if(!calculator.displayValue.includes(dot)){
        //Append the decimal point
        calculator.displayValue+=dot
    }
}
//function for handle Operator
const handleOperator=(nextOperator)=>{
 const {firstOperand,displayValue,operator}=calculator
 const inputValue=Number(displayValue)
 if(operator && calculator.waitForSecondOperand){
     calculator.operator=nextOperator
     return
   }
   if(firstOperand==null){
       calculator.firstOperand=inputValue

   }else if(operator){
       const currentValue=firstOperand||0
       const result=performCalculation[operator](currentValue,inputValue)
       calculator.displayValue=String(result)
       calculator.firstOperand=result
   }
   calculator.waitForSecondOperand=true
   calculator.operator=nextOperator
}
//Obeject for operator calculation
const performCalculation={
    '/':(firstOperand,secondOperand)=>firstOperand/secondOperand,
    '*':(firstOperand,secondOperand)=>firstOperand*secondOperand,
    '+':(firstOperand,secondOperand)=>firstOperand+secondOperand,
    '-':(firstOperand,secondOperand)=>firstOperand-secondOperand,
    '=':(firstOperand,secondOperand)=>secondOperand
}
//Function for reset the Calculator
const resetCalculator=()=>{
    calculator.displayValue='0'
    calculator.firstOperand=null
    calculator.waitForSecondOperand=false
    calculator.operator=null
}
//upadte element of screen
const upadteDisplay=()=>{
    const display=document.querySelector('.calculator-screen')
    display.value=calculator.displayValue
}
upadteDisplay()
//Function for tranform button in element a screen
const key=document.querySelector('.calculator-keys')
key.addEventListener('click',(event)=>{
    const {target}=event
    if(!target.matches('button')){
        return
    }
    if(target.classList.contains('operator')){
        handleOperator(target.value)
        upadteDisplay()
        return
    }
    if(target.classList.contains('decimal')){
        inputDecimal(target.value)
        upadteDisplay()
        return
    }
    if(target.classList.contains('all-clear')){
        resetCalculator()
        upadteDisplay()
        return
    }
    inputDigit(target.value)
    upadteDisplay()
})
