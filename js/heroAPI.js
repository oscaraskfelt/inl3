const key = require('./key')
const axios = require('axios')

//api call to return results for query made with axios
exports.searchChar = async (name) => {
    //Threw a CORS-error so used a proxy as a the easy way out..
    const data = await axios.get(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${key.apiKey}/search/${name}/`)
    return data
}
