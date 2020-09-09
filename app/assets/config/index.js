// Load all the channels within this directory and all subdirectories.
// Channel files must be named *_channel.js.

const Pokemon_URL="http://localhost:3000/pokemons"
document.addEventListener('DOMContentLoaded', function() {

    
    startConvo()
    document.querySelector('form').addEventListener('submit', addName)
    document.querySelector('#submit').addEventListener('click', choosePokemonLevels)
});

function startConvo(){
    const convoElements=document.querySelectorAll('p.hidden')


    for (let count=0;count<convoElements.length; count++){
       
        convoElements[count].setAttribute('class', '')
        const convoElement=convoElements[count]
        setTimeout(()=>hideConvo(convoElement), 3000)
       
    }
    
}

function hideConvo(convoElement){

    convoElement.setAttribute('class', 'hidden')
    showForm()
}

function showForm(){
    const form=document.querySelector('form')
    form.setAttribute('class','')
}

function addName(e){
    e.preventDefault()
    e.target.setAttribute('class','hidden')
    const trainerName=e.target.querySelector('input[name="name"]').value

    let configObject= {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({"name": trainerName})
      }
    
      fetch('http://localhost:3000/trainers', configObject)
      
    continueConvo(name)
}

function continueConvo(name){
    const div=document.querySelector('#convo')
    div.innerHTML=`<p>Wonderful! Trainer ${name} you are about to embark on an exciting but challenging journey. I'm confident that one day you'll be the greatest trainer alive! But first, let's get you some Pokemon.</p>`
    setTimeout(function(){
        div.setAttribute('class', 'hidden')

        //only here until fetch is working
        renderPokemon()
    }, 5000)

    // fetch(Pokemon_URL)
    // .then(resp => resp.json())
    // .then(json => renderPokemon(json));
    
}

function renderPokemon(){
    data=[{name: 'squirtle', poke_type: 'water', img: 'pokemon-lite/app/assets/images/squirtle.jpeg'},
    {name: 'ivysaur', poke_type: 'grass', img: 'pokemon-lite/app/assets/images/ivysaur.jpeg'},
    {name: 'charizard', poke_type: 'fire', img: 'pokemon-lite/app/assets/images/charizard.jpeg'},
    {name: 'staryu', poke_type: 'water', img: 'pokemon-lite/app/assets/images/staryu.jpeg'},
    {name: 'vileplume', poke_type: 'grass', img: 'pokemon-lite/app/assets/images/vileplume.jpeg'},
    {name: 'vulpix', poke_type: 'fire', img: 'pokemon-lite/app/assets/images/vulpix.jpeg'},
    {name: 'weepinbell', poke_type: 'grass', img: 'pokemon-lite/app/assets/images/weepinbell.png'},
    {name: 'rapidash', poke_type: 'fire', img: 'pokemon-lite/app/assets/images/rapidash.png'},
    {name: 'pikachu', poke_type: 'electric', img: 'pokemon-lite/app/assets/images/pikachu.jpeg'},
    {name: 'zapdos', poke_type: 'electric', img: 'pokemon-lite/app/assets/images/zapdos.jpeg'},
    {name: 'magnemite', poke_type: 'electric', img: 'pokemon-lite/app/assets/images/magnemite.jpeg'},
    {name: 'onix', img: 'pokemon-lite/app/assets/images/onix.jpeg', poke_type: 'rock'},
    {name: 'hitmonchan', img: 'pokemon-lite/app/assets/images/hitmonlee.png', poke_type: 'fighting'},
    {name: 'hitmonlee', img: 'pokemon-lite/app/assets/images/hitmonchan.png', poke_type: 'fighting'},
    {name: 'rhyhorn', img: 'pokemon-lite/app/assets/images/rhyhorn.jpeg', poke_type: 'rock'},
    {name: 'gastly', img: 'pokemon-lite/app/assets/images/gastly.jpeg', poke_type: 'ghost'},
    {name: 'gengar', img: 'pokemon-lite/app/assets/images/gengar.jpeg', poke_type: 'ghost'},
    {name: 'beedrill', img: 'pokemon-lite/app/assets/images/beedrill.jpeg', poke_type: 'bug'},
    {name: 'butterfree', img: 'pokemon-lite/app/assets/images/butterfree.jpeg', poke_type: 'bug'}
    
]
    const types=document.querySelectorAll('ul')
    data.forEach((pokemon)=> {
        let li=document.createElement('li')
        li.innerText=pokemon.name
        li.setAttribute('type', pokemon.poke_type)
        li.setAttribute('pic', pokemon.img)
        types.forEach((type)=>{
            let id=type.getAttribute('id')
            if (id==pokemon.poke_type){
                type.append(li)
            }
        })
        li.addEventListener('click', addPokemonToRoster)
    })
    let div=document.querySelector('.pokemon')
    div.setAttribute('class', '')

}

function addPokemonToRoster(e){
    let pokemonElement=e.target
    const ul=document.querySelector('#roster')
    //Ensure that you cant add more than 6 pokemmon
    if (ul.children.length<6){
        let li=document.createElement('li')
        li.innerText=pokemonElement.innerText 
        li.setAttribute('type', `${pokemonElement.getAttribute('type')}`)
        li.setAttribute('pic', `${pokemonElement.getAttribute('pic')}`)
        let deleteButton=document.createElement('button')
        deleteButton.setAttribute('class', 'remove')
        deleteButton.innerText='remove'
        deleteButton.addEventListener('click', removePokemonFromRoster)
        li.append(deleteButton)
        ul.append(li)
       
    }
    document.querySelector('#poke-roster').setAttribute('class', '')
    
}

function removePokemonFromRoster(e){
    e.target.parentElement.remove()
}

function choosePokemonLevels(e){
    const roster=e.target.parentElement.querySelectorAll('li')
    document.querySelector('#all-pokemon').setAttribute('class', 'pokemon')
    document.querySelector('#poke-roster').setAttribute('class', 'hidden')
    choosePokemonConvo()
}

function choosePokemonConvo(){
    const main=document.querySelector('main')
    const div=document.createElement('div')


}
