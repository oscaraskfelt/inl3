import *  as heroes from './heroAPI'
import *  as create from './liCreator'
import * as charts from './chartHandler'
import Chart from 'chart.js'

let chars = {
    faction1: null,
    faction2: null,
    char1 : null,
    char2: null
}

let chart;

window.onload = () => {
    const form1 = document.getElementById('form1')
    const form2 = document.getElementById('form2')
    form1.addEventListener('submit', submitHandler)
    form2.addEventListener('submit', submitHandler)

    const ctx = document.getElementById('chart').getContext('2d')
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Intelligence', 'Combat', 'Speed'],
            datasets: [{label: 'Hero #1', backgroundColor: 'tomato'}, {label: 'Hero #2', backgroundColor: 'papayawhip'}]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }        
    })
}

function submitHandler(e){
    // TODO: add disabling submitbutton until call is complete
    e.preventDefault()
    const faction = this.id == 'form1' ? 1 : 0 
    document.getElementById(`status${faction?1:2}`).innerHTML = "laddar.."
    const ul = document.getElementById(faction ? 'charPicker1' : 'charPicker2')
    const nameQuery = this.querySelector('.nameInput').value
    heroes.searchChar(nameQuery)
    .then(
        res => {
            ul.innerHTML = ''
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
                setTimeout(() => {
                    if(ul.textContent == 'No results'){
                        ul.innerHTML = ''
                    }
                }, 3000);
            }
            document.getElementById(`status${faction?1:2}`).innerHTML = ""
        }
    )
    .catch(error => {
        console.warn(error)
        document.getElementById(`status${faction?1:2}`).innerHTML = ""
    })
}


function charPicker(){
    let factionNr;
    this.classList.contains('faction1')
    ? factionNr = 1
    : factionNr = 2
    
    chars[`char${factionNr}`] = chars[`faction${factionNr}`].filter(char => char.id == this.id)[0]
    document.getElementById(`charPicker${factionNr}`).innerHTML = ""

    chart = charts.updateChart(chart, factionNr, chars[`char${factionNr}`])
    chart.update()

    let portrait = document.getElementById(`portrait${factionNr}`)
    portrait.src = chars[`char${factionNr}`].image.url
    portrait.alt = chars[`char${factionNr}`].name
    portrait.style.opacity = '1'
}