import *  as heroes from './heroAPI'
import *  as create from './liCreator'

let chars = {
    faction1: null,
    faction2: null,
    char1 : null,
    char2: null
}

window.onload = () => {
    const form1 = document.getElementById('form1')
    const form2 = document.getElementById('form2')
    form1.addEventListener('submit', submitHandler)
    form2.addEventListener('submit', submitHandler)
}

function submitHandler(e){
    e.preventDefault()
    const faction = this.id == 'form1' ? 1 : 0 
    const ul = document.getElementById(faction ? 'charPicker1' : 'charPicker2')
    const nameQuery = this.querySelector('.nameInput').value
    heroes.searchChar(nameQuery)
    .then(
        res => {
            ul.innerHTML = ''
            console.log(res)
            if(!res.data.error){
                faction 
                ? chars.faction1 = res.data.results
                : chars.faction2 = res.data.results

                res.data.results.forEach(element => {
                    let li = create.getLi(element, faction)
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
    let factionNr;
    this.classList.contains('faction1')
    ? factionNr = 1
    : factionNr = 2
    
    chars[`char${factionNr}`] = chars[`faction${factionNr}`].filter(char => char.id == this.id)
    document.getElementById(`charPicker${factionNr}`).innerHTML = ""
}