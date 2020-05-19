const key = require('./key')
const axios = require('axios')

exports.searchChar = async (name) => {
    const data = await axios.get(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${key.apiKey}/search/${name}/`)
    return data
}
