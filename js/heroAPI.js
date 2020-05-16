const key = require('./key')

exports.getChar = async (id) => {
    const request = await fetch(`https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/${key.apiKey}/${id}/`)
    const data = await request.json()
    return data
  }