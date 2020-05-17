exports.updateChart = (chart, faction, data) => {
    console.log(data)
    const color = faction == 1 ? ['tomato', 'orangered'] : ['papayawhip', 'moccasin']
    
    chart.data.datasets[faction - 1] = {
        label: data.name,
        data: [
            data.powerstats.intelligence, 
            data.powerstats.combat,
            data.powerstats.speed            
        ],
        backgroundColor: [
            color[0],
            color[0],
            color[0]
        ],
        borderColor: [
            color[1],
            color[1],
            color[1]
        ],
        borderWidth: 1
    };

    return chart
}
