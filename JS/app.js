const container = document.querySelector('.container')
const input = document.getElementById('input')
const resultList = document.getElementById("result-list");
const searchBtn = document.querySelector('.search-button')
let currentItem = -1

function keyUpEventFunc(inputValue){

    currentItem = -1 // Very Important (Refresh of CurrentItem Value)
    updateCurrentItem([]) // Delete active Class

    if(inputValue.length !==  0){
        resultList.innerHTML = ''
        container.classList.add('active')

        let checkSuggestion = suggestions.filter(item => item.toLowerCase().startsWith(inputValue.toLowerCase()))
        
        if(checkSuggestion.length !== 0){
            checkSuggestion.forEach((item,index) => {
                let liItem = document.createElement('li')
                liItem.className = 'result-item'
                liItem.innerHTML = item
                liItem.setAttribute('data-index',index)
                resultList.append(liItem)

                liItem.addEventListener('click',() => clickedItem(item))
            })
        }
        else{
            let notFoundItem = document.createElement('li')
            notFoundItem.className = "result-item";
            notFoundItem.innerHTML = inputValue
            resultList.append(notFoundItem)

            notFoundItem.addEventListener('click',() => clickedItem(inputValue))
        }
    }
    else{
        container.classList.remove('active')
    }
}

function navigationFunc(code){
    let items = resultList.querySelectorAll('li')


    if(code === 'ArrowDown'){
        currentItem = ( currentItem + 1 ) % items.length
        input.value = items[currentItem].textContent

        updateCurrentItem(items)
    }
    else if(code === 'ArrowUp'){
        currentItem = ( currentItem - 1 + items.length ) % items.length
        input.value = items[currentItem].textContent

        updateCurrentItem(items)
    }
    else if(code === 'Enter'){
        if(currentItem >= 0 && items[currentItem]){
            clickedItem(items[currentItem].textContent)
        }
        else if(currentItem == -1){
            container.classList.remove('active')
        }
    }
}

function clickedItem(value){
    input.value = value 

    container.classList.remove('active')
}

function updateCurrentItem(items){
    items.forEach((item,index) => item.classList.toggle('active',currentItem === index))
}

input.addEventListener('keyup', e => {
    if(e.code === 'ArrowUp' || e.code === "ArrowDown" || e.code === "Enter"){
        navigationFunc(e.code)
    }
    else{
        keyUpEventFunc(input.value)
    }
})
searchBtn.addEventListener('click',() => clickedItem(input.value))