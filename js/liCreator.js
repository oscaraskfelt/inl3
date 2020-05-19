//function to create li-element 
exports.getLi = (element, faction) => {
    let li = document.createElement('li')
    //creates object with the different parts included in the li
    let char = {
        name: document.createElement('p'),
        fullName: document.createElement('p'),
        img : document.createElement('img')
    }
    //append to li-parts
    char.name.appendChild(document.createTextNode('Name: ' + element.name))
    char.fullName.appendChild(document.createTextNode('Full name: ' +element.biography['full-name']))

    //set the img-element
    char.img.alt = element.name
    char.img.setAttribute('src', element.image.url)
    
    //append to li
    li.appendChild(char.name)
    li.appendChild(char.fullName)
    li.appendChild(char.img)
    li.setAttribute("id", element.id)
    li.classList.add('charSuggestions', faction ? 'faction1' : 'faction2')
    return li
}