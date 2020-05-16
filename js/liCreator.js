exports.getLi = (element, faction) => {
    let li = document.createElement('li')
    let char = {
        name: document.createElement('p'),
        fullName: document.createElement('p'),
        img : document.createElement('img')
    }
    char.name.appendChild(document.createTextNode('Name: ' + element.name))
    char.fullName.appendChild(document.createTextNode('Full name: ' +element.biography['full-name']))
    char.img.alt = element.name
    char.img.setAttribute('src', element.image.url)
    li.appendChild(char.name)
    li.appendChild(char.fullName)
    li.appendChild(char.img)
    li.setAttribute("id", element.id)
    li.classList.add('charSuggestions', faction ? 'faction1' : 'faction2')
    return li
}