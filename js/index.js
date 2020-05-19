import *  as heroes from './heroAPI'
import *  as create from './liCreator'
import * as charts from './chartHandler'
import Chart from 'chart.js'

//state-like object
let chars = {
    faction1: null,
    faction2: null,
    char1 : null,
    char2: null
}

// placeholder for the chart to make it accessible 
let chart;

window.onload = () => {
    const form1 = document.getElementById('form1')
    const form2 = document.getElementById('form2')
    form1.addEventListener('submit', submitHandler)
    form2.addEventListener('submit', submitHandler)

    //creating the chart
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
    e.preventDefault()
    //creates a switch for the two faction cases 
    const faction = this.id == 'form1' ? 1 : 0 
    
    //targets element for user feedback
    let status = document.getElementById(`status${faction?1:2}`)
    status.innerHTML = "laddar.." //user feedback

    const ul = document.getElementById(faction ? 'charPicker1' : 'charPicker2')
    const nameQuery = this.querySelector('.nameInput').value
    
    //send api-call  
    heroes.searchChar(nameQuery)
    .then(
        res => {
            ul.innerHTML = '' //empties ul if previous results exists
            if(!res.data.error){
                faction 
                ? chars.faction1 = res.data.results
                : chars.faction2 = res.data.results
                
                //creates li elements for each result
                res.data.results.forEach(element => {
                    let li = create.getLi(element, faction)
                    ul.appendChild(li)
                    li.addEventListener('click', charPicker)
                })
            }
            else {
                ul.innerHTML = 'No results' //user feedback
                setTimeout(() => {
                    if(ul.textContent == 'No results'){
                        ul.innerHTML = ''
                    }
                }, 3000);
            }
            status.innerHTML = "" //user feedback
        }
    )
    .catch(error => {
        console.warn(error)
        status.innerHTML = "" //user feedback
    })
}


function charPicker(){
    //creates a switch for the two faction cases 
    let factionNr;
    this.classList.contains('faction1')
    ? factionNr = 1
    : factionNr = 2
    //picks out the character from the state-like object
    chars[`char${factionNr}`] = chars[`faction${factionNr}`].filter(char => char.id == this.id)[0]
    document.getElementById(`charPicker${factionNr}`).innerHTML = "" //empties the suggestions after picking

    //updates the chart with the new data
    chart = charts.updateChart(chart, factionNr, chars[`char${factionNr}`])
    chart.update()

    //updates the images with the characters
    let portrait = document.getElementById(`portrait${factionNr}`)
    portrait.src = chars[`char${factionNr}`].image.url
    portrait.alt = chars[`char${factionNr}`].name
    portrait.style.opacity = '1'
}