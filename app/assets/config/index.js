// Load all the channels within this directory and all subdirectories.
// Channel files must be named *_channel.js.

const Pokemon_URL="http://localhost:3000/pokemons"
document.addEventListener('DOMContentLoaded', function() {

    
    startConvo()
    document.querySelector('form').addEventListener('submit', addName)
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

    // let configObject= {
    //     method: 'PATCH',
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Accept": "application/json"
    //     },
    //     body: JSON.stringify(name: name)
    //   }
    
    //   fetch('http://localhost:3000/trainers', configObject)
      
    continueConvo(name)
}

function continueConvo(name){
    const div=document.querySelector('#convo')
    div.innerHTML=`<p>Wonderful! Trainer ${name} you are about to embark on an exciting but challenging journey. I'm confident that one day you'll be the greatest trainer alive! But first, let's get you some Pokemon.</p>`
    setTimeout(function(){
        div.setAttribute('class', 'hidden')
    }, 5000)

    fetch(Pokemon_URL)
    .then(resp => resp.json())
    .then(json => renderPokemon(json));

}

function renderPokemon(data){
    console.log(data)

}
