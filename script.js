'use strict';

const calculate = (a,b,operation) =>{
  let result = '';
  if(operation === 'add'){
    result = parseFloat(a) + parseFloat(b);
  }else if(operation === 'subtract'){
    result = parseFloat(a) - parseFloat(b);
  }else if(operation === 'multiply'){
    result = parseFloat(a) * parseFloat(b);
  }else if(operation === 'divide'){
    result = parseFloat(a) / parseFloat(b);
  }
  return result;
}


const calculator = document.querySelector('.calculator');
const key = document.querySelector('.calculator_keys');
const display = document.querySelector('.calculator_display');

key.addEventListener('click', e=>{
    if(e.target.matches('button')){
        const key_type = e.target;
        const key_content = key_type.textContent;
        const action = key_type.dataset.action;
        const display_content = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;
        
        
        Array.from(key.parentNode.children).forEach(k=>k.classList.remove('is-depressed'));

        if(!action){
          if(display_content==='0' || previousKeyType==='operator'|| previousKeyType==='equal'){
              display.textContent = key_content;
          }else{
              display.textContent= display_content + key_content;
          }
          calculator.dataset.previousKeyType = 'number';
          //console.log("number key");
      }

      if(action==='decimal'){
            if(!display_content.includes('.')){
              display.textContent = display_content + '.';
            }else if(previousKeyType==='operator' || previousKeyType==='equal'){
              display.textContent = '0.';
            }

            calculator.dataset.previousKeyType = 'decimal';
            //console.log('decimal');
        }

        if(action=='add'|| action=='subtract' || action=='multiply' || action=='divide'){
          const firstNum = calculator.dataset.firstNum;
          const operation = calculator.dataset.operator;
          const secondNum = display_content;

          //if you don't add this line, when you click the operator your display becomes blank 'cause like for the first operator click, the firstNum and operation variables are missing values
          //Always check firstNum and operation as secondNum always exists
          if(firstNum && operation && previousKeyType!=='operator' && previousKeyType!=='equal'){
            const result = calculate(firstNum,secondNum,operation);
            display.textContent = result;
            calculator.dataset.firstNum = result; //updating firstNum after calculation with the result
          }else{
            //if there is no calculation set the firstNum to display content
            calculator.dataset.firstNum = display_content;
          }

          key.classList.add('is-depressed');
          calculator.dataset.previousKeyType = 'operator';
          calculator.dataset.operator = action;
        }
      
       if(action==='equal'){
          let firstNum = calculator.dataset.firstNum;
          const operation = calculator.dataset.operator;
          let secondNum  = display_content;
          
          if(firstNum){
            if(previousKeyType==='equal'){
              firstNum = display_content;
              secondNum = calculator.dataset.modNum;
            }
            display.textContent = calculate(firstNum,secondNum,operation);
          }

          calculator.dataset.modNum = secondNum;
          calculator.dataset.previousKeyType = 'equal';
          //console.log("equal key");
        }

        if(action!=='clear'){
          const clearButton = calculator.querySelector('[data-action=clear]');
          clearButton.textContent = 'CE';
        }
        if(action==='clear'){
          if(key_type.textContent==='AC'){
            calculator.dataset.firstNum = '';
            calculator.dataset.operator = '';
            calculator.dataset.modNum = '';
            calculator.dataset.previousKeyType = 'clear';
          }else{
            key_type.textContent = 'AC';
          }

          display.textContent = '0';
          calculator.dataset.previousKeyType = 'clear';
        }

        //console.log("A button is pressed");
    }

}
                    );
