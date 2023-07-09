const inputSpace = document.querySelector('input')

const buttons = [...document.getElementsByTagName('button')]
const equalButton = document.getElementById('equal')
const removeButton = document.getElementById('remove')
const deleteButton = document.getElementById('delete')
const noInputButtons = [...document.getElementsByClassName('noInputButtons')]


const acceptedOperations = ['x', '/', '+', '-']


inputSpace.focus()

const opResult = (countString, typeOper) =>{
    const roundNumber = (num) => Math.round(num * 1000)/1000
    
    let indexOperation = null
    console.log(`countString: ${countString}`)
    if(countString[0] == '-')   
        indexOperation = countString.replace('-','$').indexOf(typeOper)
    else
        indexOperation = countString.indexOf(typeOper)

    const num1 = Number(countString.slice(0, indexOperation))
    const num2 = Number(countString.slice(indexOperation+1, countString.length))
    
    let result = null
    if(typeOper == 'x'){
        result =  roundNumber(num1*num2)
    }else if(typeOper=='/'){
        result =  roundNumber(num1/num2)
    }else if(typeOper == '+'){
        result =  roundNumber(num1+num2)
    }else if(typeOper == '-'){
        result =  roundNumber(num1-num2)
    }else{
        return 'Error'
    }

    return result
}

const getIndexOfOperation = (opString,index) =>{
    const isNumber = (char) =>{
        if(String(char).trim() == ''){
            return false
        }
        else  
            return !isNaN(char)
    }

    const Ind = {
        start: index,
        end: index
    }
    
    do{ //'.' and '-' condition to don't stop the loop on dots that simbolise float numbers
        --Ind.start
    }while(( isNumber(opString[Ind.start]) || opString[Ind.start]=='.') && Ind.start!= 0)

    do{
        ++Ind.end
    }while((isNumber(opString[Ind.end]) || opString[Ind.end] == '.') && Ind.end!= opString.length)

    return Ind
}

const equalButtonEvent = () =>{
    let inpStr = inputSpace.value       

    const operationInInput = acceptedOperations.filter(charOper => inpStr.includes(charOper))

    operationInInput.map(charOp =>{ 
        for(let i = 0; i < inpStr.length; ++i){
            if(inpStr[i] == charOp && i != 0){ //i!=0 prevents error -3-4 (catch first signal)
                const limIndex = getIndexOfOperation(inpStr,i)
                const singleOpStr = inpStr.slice(limIndex.start, limIndex.end)
                const resultSingleOp = opResult(singleOpStr, charOp)
                
                //console.log(singleOpStr)
                inpStr = inpStr.replace(singleOpStr, resultSingleOp)
                inputSpace.value = inpStr

                i = 0 // restar the loop, to verify existence of another operation represented by the charOP on the new input
            }
        }
    })
    
    inputSpace.value = inpStr.replace('$', '-')
}

const addButtonInput = (event)=>{
    inputSpace.value = inputSpace.value + event.target.innerText
}
buttons.map((el)=>{
    el.addEventListener('click', addButtonInput)
        
})
noInputButtons.map(button=>button.removeEventListener('click', addButtonInput))

inputSpace.addEventListener("keypress", (event)=>{
    if(event.key == 'Enter')
        equalButtonEvent()
})
equalButton.addEventListener('click', equalButtonEvent)

removeButton.addEventListener('click', ()=>{
    const stringInput = inputSpace.value

    const newStringInput = stringInput.slice(0,stringInput.length-1 )
    inputSpace.value = newStringInput
})

deleteButton.addEventListener('click', ()=>inputSpace.value = null)

/* const test = () =>{
    const arrOp = ['6-2x2', '-1+2', '3-4', '3/4', '10x10-10/10']
    arrOp.map(op=>{
        inputSpace.value = op;
        equalButton.dispatchEvent(new Event('click'))

        console.log(`Result: ${op} = ${inputSpace.value}`)
        const newOp  = op.replaceAll('x','*')
        var tBe = Number(eval(newOp))
        console.log(`should be: ${tBe}}`)
    })
}

test() */