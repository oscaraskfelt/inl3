const color1 = {
    intelligence : 'royalblue',
    combat: 'tomato',
    durability: 'papayawhip'
}

const color2 = {
    intelligence : 'lightskyblue',
    combat: 'salmon	',
    durability: 'moccasin'
}


exports.updateChart = (chart, faction, data) => {
    console.log(data)
    const color = faction == 1 ? color1 : color2
    
    chart.data.datasets[faction - 1] = {
        label: data.name,
        data: [
            data.powerstats.intelligence, 
            data.powerstats.combat,
            data.powerstats.durability            
        ],
        backgroundColor: [
            color.intelligence,
            color.combat,
            color.durability
        ],
        borderColor: [
            color.intelligence,
            color.combat,
            color.durability
        ],
        borderWidth: 1
    };

    return chart
}
