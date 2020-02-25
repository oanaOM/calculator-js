/*
 Main calculator functions
*/

const calculate = (first, operator, second) => {
    first = parseFloat(first);
    second = parseFloat(second);
    let result = '';
    
    switch(operator){
        case 'minus':
            return result = first - second;
            break;
        case 'sum':
            return result = first + second;
            break;
        case 'divide':
            return result = first / second;
            break;
        case 'multiply':
            return result = first * second;
            break;
    }
    return result;
    
}


function getKeys(){
    const calculator = document.querySelector('.calc-wrapper');
    const keys = document.querySelector('.calc-keys');
    const inputDisplay = document.querySelector('.calc-display');
   
 
    keys.addEventListener('click', event=>{
        if(event.target.matches('button')){
            //get the value of the key
            const key = event.target;
            //get the type of the key
            const action = key.dataset.action;
            //get the content of the key
            const keyContent = key.textContent;
            //get the display
            const displayNum = inputDisplay.textContent;
            //
            const previousKeyType = calculator.dataset.previousKeyType;
            const dataFirstValue = calculator.dataset.firstValue;

            if(!action){
                if(displayNum === '0' || (previousKeyType === 'operator')){
                    inputDisplay.textContent = keyContent;
                }else{
                    inputDisplay.textContent += keyContent;
                }
                //reinitializ previous value
                calculator.dataset.previousKeyType = 'number';
                //TODO: implement remove this class
                //...
                key.classList.add('is-pressed');
               
            }
            
            //const previousKey = keys.dataset.previousKeyType;
            if(action === 'sum' | action === 'minus' || action === 'divide' || action === 'multiply'){
                //store the values we know so far
                const firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                const secondValue = displayNum;
                //TODO: IMPLETEMENT THIS
                //key.classList.add('is-pressed');
                           
                //reinitialize previous value
                calculator.dataset.previousKeyType = 'operator';
                //we need to store the first number
                calculator.dataset.firstValue = displayNum;
                //we need to store the operator
                calculator.dataset.operator = action;
                console.log('operator key:');
                if(firstValue && operator && previousKeyType!='result'){
                    const calcValue = calculate(firstValue, operator, secondValue);
                    inputDisplay.textContent = calcValue;
                    //update first value with the one in display
                    calculator.dataset.firstValue = calcValue;
                }else{
                    calculator.dataset.firstValue = displayNum;
                }
            }
            if(action === 'clear'){
                //reinitializ previous value
                calculator.dataset.previousKeyType = 'clear';
                if(key.textContent === 'AC'){
                    calculator.dataset.previousKeyType = '';
                    calculator.dataset.firstValue = '';
                    calculator.dataset.modValue = '';
                    calculator.dataset.operator = '';
                }else{
                    key.textContent = 'AC';
                }
                
                //reset display value to 0
                inputDisplay.textContent = 0;
                console.log('clear key', keyContent);
            }
            if(action!== 'clear'){
                document.querySelector('[data-action="clear"]').textContent = 'CE';

            }
            if(action === 'result'){
                //get the operation members
                let secondValue = displayNum;
                let firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                let calculatedValue='';

                if(firstValue && operator && previousKeyType!=='operator'){
                    if(previousKeyType === 'result'){
                        firstValue = displayNum;
                        secondValue = calculator.dataset.modValue;
                    }
                    calculatedValue = calculate(firstValue, operator, secondValue);
                    inputDisplay.textContent = calculatedValue;
                }
                //store the previous second value
                calculator.dataset.modValue = secondValue;
                //reinitialize previous key type
                calculator.dataset.previousKeyType = 'result';
                calculator.dataset.firstValue = calculatedValue;
                
               
                console.log('result key', firstValue, operator, secondValue);
                
            }
            if(action === 'decimal'){
                
                if(!displayNum.includes('.') && previousKeyType !== 'result'){
                    inputDisplay.textContent = displayNum + '.';
                }else if(previousKeyType === 0 || previousKeyType === 'result'){
                    inputDisplay.textContent = '0.';
                }
                //reinitializ previous value
                calculator.dataset.previousKeyType = 'decimal';
                
            }





        }


    })
}


getKeys();

// =================== my Particles
const myParticles = {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":2,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true};

particlesJS("particles-js", myParticles);