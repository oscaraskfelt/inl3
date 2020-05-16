import *  as heroes from './heroAPI'
import *  as create from './liCreator'

window.onload = () => {
    const form1 = document.getElementById('form1')
    form1.addEventListener('submit', submitHandler)
}


function submitHandler(e){
    e.preventDefault()
    const ul = document.getElementById('charPicker')
    const nameQuery = this.querySelector('.nameInput').value
    heroes.searchChar(nameQuery)
    .then(
        res => {
            res.data.results.forEach(element => {
                let li = create.getLi(element)
                ul.appendChild(li)
                li.addEventListener('click', charPicker)
            })
        }
    )
}


function charPicker(){
    console.log(this.id)
}