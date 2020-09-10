// Load all the channels within this directory and all subdirectories.
// Channel files must be named *_channel.js.

const Pokemon_URL="http://localhost:3000/pocketmonsters"
document.addEventListener('DOMContentLoaded', function() {

    
    startConvo()
    document.querySelector('form').addEventListener('submit', addName)
    document.querySelector('#submit').addEventListener('click', createPokemonInBackend)
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
    const name=e.target.querySelector('input[name="name"]').value

    let configObject= {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({"name": name})
      }
    
    fetch('http://localhost:3000/trainers', configObject)
    .then(resp => resp.json())
    .then(json=> continueConvo(json));
      
    
}

function continueConvo(data){
    const name=data.name 
    const id=data.id 
    const div=document.querySelector('#convo')
    div.innerHTML=`<p>Wonderful! Trainer ${name} you are about to embark on an exciting but challenging journey. I'm confident that one day you'll be the greatest trainer alive! But first, let's get you some Pokemon.</p>`
    setTimeout(function(){
        div.setAttribute('class', 'hidden')

        fetch(Pokemon_URL)
        .then(resp => resp.json())
        .then(json => renderPokemon(json,id));
    }, 5000)
    
}

function renderPokemon(data, trainerId){
    // removed a console.log
    const types=document.querySelectorAll('ul')
    data.forEach((pokemon)=> {
        
        let li=document.createElement('li')
        li.innerText=pokemon.name
        console.log(pokemon)
       
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

function createPokemonInBackend(e){

    const roster=e.target.parentElement.querySelectorAll('li')
    roster.forEach((pokemon)=> {
        const type=pokemon.getAttribute('type')
        const pic=pokemon.getAttribute('pic')
        const name=pokemon.innerText
    })

    choosePokemonLevels(e)
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
    div.innerHTML=`<p>Now, let's get these pokemon trained up! Choose the level you want for each pokemon! Be careful the total level of all your pokemon is capped at 300.</p>`
    main.append(div)

    setTimeout(function(){
        div.setAttribute('class', 'hidden')
    }, 9000)

}
