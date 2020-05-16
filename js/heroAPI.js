const key = require('./key')
const axios = require('axios')

exports.getChar = async (id) => {
    const data = await axios.get(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${key.apiKey}/${id}/`)
    return data
}

exports.searchChar = async (name) => {
    const data = await axios.get(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${key.apiKey}/search/${name}/`)
    return data
}
