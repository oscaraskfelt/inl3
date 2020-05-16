import *  as heroes from './heroAPI'
import *  as create from './liCreator'

window.onload = () => {
    const form1 = document.getElementById('form1')
    const form2 = document.getElementById('form2')
    form1.addEventListener('submit', submitHandler)
    form2.addEventListener('submit', submitHandler)
}

function submitHandler(e){
    e.preventDefault()
    const ul = document.getElementById(this.id == 'form1' ? 'charPicker1' : 'charPicker2')
    const nameQuery = this.querySelector('.nameInput').value
    heroes.searchChar(nameQuery)
    .then(
        res => {
            ul.innerHTML = ''
            console.log(res)
            if(!res.data.error){
                res.data.results.forEach(element => {
                    let li = create.getLi(element)
                    ul.appendChild(li)
                    li.addEventListener('click', charPicker)
                })
            }
            else {
                ul.innerHTML = 'No results'
            }
        }
    )
}


function charPicker(){
    console.log(this.id)
}