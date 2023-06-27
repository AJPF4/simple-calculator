const inputSpace = document.querySelector('input')

const buttons = [...document.getElementsByTagName('button')]
const equalButton = document.getElementById('equal')
const removeButton = document.getElementById('remove')
const deleteButton = document.getElementById('delete')
const noInputButtons = [...document.getElementsByClassName('noInputButtons')]

inputSpace.value = null
inputSpace.focus()

const addButtonInput = (event)=>{
    inputSpace.value = inputSpace.value + event.target.innerText
}

const operationResult = (string, type) =>{
    const index = string.indexOf(type)
    const num1 = Number(string.slice(0, index))
    const num2 = Number(string.slice(index+1, string.length))

    if(type == 'x'){
        return num1*num2
    }else if(type=='/'){
        return num1/num2
    }else if(type == '+'){
        return num1+num2
    }else if(type == '-'){
        return num1-num2
    }else{
        return 'Error'
    }
}

const equalButtonEvent = () =>{
    //const acceptedOperations = ['*', '/', '+', '-']
    const acceptedOperations = ['x']

    acceptedOperations.map(charOperation =>{
        const inputString = inputSpace.value
        
        for(let index in inputString){
            let otherIndex = index
            let first_number = 0
            let second_number = 0
            if(inputString[index] == charOperation){
                while(Number.isInteger(Number(inputString[--otherIndex])) && otherIndex!= 0){
                }

                console.log(otherIndex, index)
                first_number = inputString.slice(otherIndex+1, index)
                otherIndex  = index

                while(Number.isInteger(Number(inputString[++otherIndex])) && otherIndex!= inputString.length){
                }

                second_number = inputString.slice(Number(index)+1, Number(otherIndex))
                
            }

            console.log(first_number, '-', second_number)
        }
    })

    
    /* for(let i =0;i < inputString.length;++i){
        const char = inputString[i]

        if(Number.isNaN(Number(char))){
            const result = (operationResult(inputString,char))

            inputSpace.value = result
        }
    } */
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