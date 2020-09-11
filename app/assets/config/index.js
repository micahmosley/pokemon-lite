// Load all the channels within this directory and all subdirectories.
// Channel files must be named *_channel.js.
let battleDiv=document.querySelector('#battle')
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
    //added line breaks for readablity
    div.innerHTML=`<p>Wonderful! Trainer ${name} you are about to embark on an exciting but challenging journey. <br><br>I'm confident that one day you'll be the greatest trainer alive! <br><br>But first, let's get you some Pokemon.</p>`
    setTimeout(function(){
        div.setAttribute('class', 'hidden')

        fetch(Pokemon_URL)
        .then(resp => resp.json())
        .then(json => renderPokemon(json,id));
    }, 8000)
    
}

function renderPokemon(data, trainerId){
    const types=document.querySelectorAll('ul')
    data.forEach((pokemon)=> {
        
        let li=document.createElement('li')
        li.setAttribute('trainer-id', trainerId)
        li.setAttribute('type', pokemon.poke_type)
        li.setAttribute('pic', pokemon.img)
        li.innerHTML=`${pokemon.name} <img src=${pokemon.img}>`
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
        // changed this to include the name
        li.innerText=pokemonElement.innerText
        li.setAttribute('type', `${pokemonElement.getAttribute('type')}`)
        li.setAttribute('pic', `${pokemonElement.getAttribute('pic')}`)
        li.setAttribute('trainer-id', `${pokemonElement.getAttribute('trainer-id')}`)
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
    let dataArray=[]
    roster.forEach((pokemon)=> {
        const type=pokemon.getAttribute('type')
        const pic=pokemon.getAttribute('pic')
        let name=pokemon.innerText
        name=name.slice(0,-7)
        const trainerId=pokemon.getAttribute('trainer-id')
        let data={name: name, img: pic, level: 1, poke_type: type, trainer_id: parseInt(trainerId)}
        dataArray.push(data)
    })

    let configObject= {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(dataArray)
      }
    
    fetch('http://localhost:3000/pokemons', configObject)
    .then(resp => resp.json())
    .then(json => addPokemonIdToPokemon(json, roster)); 

    startChoosePokemonLevelsProcess(e)
}

function addPokemonIdToPokemon(data, roster){
    roster.forEach((pokemon) => {
        data.forEach((poke)=> {
            if (poke.name==pokemon.innerText.slice(0,-7)){
                pokemon.setAttribute('pokemon-id', poke.id)
            }
        })
    })
    
}

function removePokemonFromRoster(e){
    e.target.parentElement.remove()
}

function startChoosePokemonLevelsProcess(e){
    document.querySelector('#all-pokemon').setAttribute('class', 'pokemon')
    document.querySelector('#poke-roster').setAttribute('class', 'hidden')
    choosePokemonConvo(e)

}

function choosePokemonConvo(e){
    const main=document.querySelector('#pre-battle')
    const div=document.createElement('div')
    // setting an id for stylng purposes 
    div.setAttribute("id", "text-info")
    // added some line breaks as well for readablity 
    div.innerHTML=`<p>Now, let's get these pokemon trained up! <br><br>Choose the level you want for each pokemon! <br><br>Choose wisely, the total level of all your pokemon is capped at 300.</p>`
    main.append(div)

    setTimeout(function(){
        div.setAttribute('class', 'hidden')
        choosePokemonLevels(e)
    }, 9000)

}


function choosePokemonLevels(e){
    const pokemonElements=e.target.parentElement.querySelectorAll('li')
    let levelTotal=pokemonElements.length
    let div=document.querySelector('#choose-pokemon-levels')
    let h3=document.createElement('h3')
    let remainingLevels=300-levelTotal
    h3.setAttribute('id', 'remaining-levels')
    h3.innerHTML=`Remaining levels yet to be alloted: <span>${remainingLevels}</span>`
    div.append(h3)
    pokemonElements.forEach((pokemon)=>{
        let innerDiv=document.createElement('div')
        innerDiv.setAttribute('pokemon-id', pokemon.getAttribute('pokemon-id'))
        let img=document.createElement('img')
        img.setAttribute('src', pokemon.getAttribute('pic'))
        innerDiv.append(img)
        let name=pokemon.innerText
        name=name.slice(0,-6)
        let p=document.createElement('p')
        p.innerText=`What level would you like your ${name} to be?`
        innerDiv.append(p)
        let form=document.createElement('form')
        form.innerHTML=`<input
        type="text"
        name="level"
        value=""
        placeholder="Enter Level"
        
        />

        <input
            type="submit"
            name="submit"
            value="Enter"
            class="submit"
        />`
        form.addEventListener('submit', addLevelToPokemon)


        innerDiv.append(form)

        div.append(innerDiv)

        
    })
    const submit= document.createElement('button')
    submit.innerText='Submit Roster'
    div.append(submit)
    submit.addEventListener('click', beginBattleProcess)

}

function addLevelToPokemon(e){
    e.preventDefault()
    let remainingLevels=parseInt(document.querySelector('#remaining-levels span').innerText)
    const level= e.target.querySelector('input[type="text"]').value 
    const id=e.target.parentElement.getAttribute('pokemon-id')
    //If the user's level input was valid
    if ((remainingLevels-level)>=0 && level<100){
        document.querySelector('#remaining-levels span').innerText=remainingLevels-level
        e.target.parentElement.setAttribute('class', 'hidden')
    }
    
    let configObject= {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({id: id, level: level})
      }
    
    fetch(`http://localhost:3000/pokemons/${id}`, configObject)
    
    
}

function beginBattleProcess(e){
    const roster=e.target.parentElement.querySelectorAll('div')
    e.target.parentElement.setAttribute('class', 'hidden')

    const main=document.querySelector('#pre-battle')
    const div=document.createElement('div')
    // added an id to div for styling 
    div.setAttribute("id", "battle-intro")
    // added line breaks for better reading
    div.innerHTML=`<p>You have your Pokemon and you've trained them up. <br><br>It's time to put your skills to the test with a Pokemon Battle!</p>`
    main.append(div)

    setTimeout(function(){
        div.setAttribute('class', 'hidden')
        chooseOpponent(e.target.parentElement)
    }, 9000)

} 

function chooseOpponent(roster){
    const main=document.querySelector('#pre-battle')
    const div=document.createElement('div')
    div.setAttribute('id','choose-opponent' )
    div.innerHTML=`<h3>Select an opponent to battle:</h3>`
    let select=document.createElement('select')
    select.innerHTML=`
    <option value="1">Brock</option>
    <option value="2">Toni</option>
    <option value="3">Misty</option>
    <option value="4">Gary</option>
    `
    div.append(select)
    const submit=document.createElement('button')
    submit.innerText='Battle!'
    submit.addEventListener('click', (e)=>{
        renderOpponent(e,roster)
    })
    div.append(submit)

    main.append(div)
}

function renderOpponent(e,roster){
    let trainerId=e.target.parentElement.querySelector('select').value
    document.querySelector('#pre-battle').setAttribute('class', 'hidden')

    fetch(`http://localhost:3000/trainers/${trainerId}`)
    .then(resp => resp.json())
    .then(json=> {
        let div=document.createElement('div')
        div.innerHTML=`<img src=${json.img}>`
        div.setAttribute('id', 'opponent')
        div.setAttribute('opponent', `${json.name}`)
        battleDiv.append(div)
        let h3=document.createElement('h3')
        h3.innerText=`${json.name} wants to Battle!`
        div.append(h3)
        battleDiv.append(div)
    });

    fetch(`http://localhost:3000/trainers/${trainerId}/pokemons`)
    .then(resp => resp.json())
    .then(json=> renderBattle(json, roster, trainerId));

}

function renderBattle(opponentRoster, roster, trainerId){
    const pokemonRoster=roster.querySelectorAll('div')
    const numberOfPokemon=pokemonRoster.length
    let currentPokemonIndex=0
    let counter=0

    setTimeout(function(){
        let div=document.querySelector('#opponent')
        const opponentName=div.getAttribute('opponent')
        div.setAttribute('class', 'hidden')
        startBattle(opponentName)
    }, 4000)

    function startBattle(opponentName){
        
        let div=document.createElement('div')
        div.setAttribute('class', 'opponent-pokemon')
        
        div.innerHTML=`<h4 id='opponent-level' data-name='${opponentRoster[0].name}' level= '${opponentRoster[0].level}'>lvl ${opponentRoster[0].level} ${opponentRoster[0].name}</h4><h4>Life Points: <span>${opponentRoster[0].life}</span></h4><img src=${opponentRoster[0].img}>`
        battleDiv.append(div)

        fetch(`http://localhost:3000/pokemons/${opponentRoster[0].id}/attacks`)
        .then(resp => resp.json())
        .then(json=> {
            renderAttacks(json, "opponent")
        });

        fetch(`http://localhost:3000/pokemons/${pokemonRoster[0].getAttribute('pokemon-id')}`)
        .then(resp => resp.json())
        .then(json=> {
        let div2=document.createElement('div')
        div2.setAttribute('class', 'your-pokemon')
        div2.innerHTML=`<h4 id='your-level' data-name='${json.name}'level= '${json.level}'>lvl ${json.level} ${json.name}</h4><h4>Life Points: <span>${json.life}</span></h4><img src=${pokemonRoster[0].querySelector('img').getAttribute('src')}>`
        battleDiv.append(div2)
        });
    
        fetch(`http://localhost:3000/pokemons/${pokemonRoster[0].getAttribute('pokemon-id')}/attacks`)
        .then(resp => resp.json())
        .then(json=> {
            renderAttacks(json, "player")
        });

    }

    function renderAttacks(attacks, player){
        if (player=="opponent"){
            let ul=document.createElement('ul')
            ul.setAttribute('class', 'attacks')
            ul.setAttribute('id', 'opponent-attacks')
            attacks.forEach((attack)=> {
            let li=document.createElement('li')
            //added yet another line break doesnt seem to do anything tho
            li.innerHTML=`<span>${attack.name}<br></span>`
            li.setAttribute('attack-id', `${attack.id}`)
            ul.append(li)
            document.querySelector('.opponent-pokemon').append(ul)
        })
        } else {
            let ul2=document.createElement('ul')
            ul2.setAttribute('class', 'attacks')
            attacks.forEach((attack)=> {
            let li=document.createElement('li')
            li.innerHTML=`<span>${attack.name}</span><br>`
            li.setAttribute('attack-id', `${attack.id}`)
            li.addEventListener('click', executePlayerAttack)
            ul2.append(li)
            document.querySelector('.your-pokemon').append(ul2)
        });
        if (counter==0){
            let box=document.createElement('div')
            box.setAttribute('id', 'battle-box')
            battleDiv.append(box)
            counter++
        }
        
      
    }

    function executePlayerAttack(e){
        //Execute player's attack
        //Get player's pokemon's level
        const level= document.querySelector('#your-level').getAttribute('level')
        let opponentLife=document.querySelector('.opponent-pokemon h4 span')
        let fainted="false"
        let box=document.querySelector('#battle-box')
        const pokemonName=document.querySelector('.your-pokemon h4').getAttribute('data-name')
        const opponentPokemonName=document.querySelector('.opponent-pokemon h4').getAttribute('data-name')
        fetch(`http://localhost:3000/attacks/${e.target.parentElement.getAttribute('attack-id')}`)
        .then(resp => resp.json())
        .then(attack=> {
            //If attack hits
            if (Math.random()<attack.hit){
                myMove()
                if (attack.damage=="low"){
                    let damage=Math.round(level/6)
                    let newLife=opponentLife.innerText-damage
                    box.innerHTML=`<p>${pokemonName} used ${attack.name}!</p>`
                    setTimeout(function(){
                        box.innerHTML=`<p>${attack.name} did ${damage} damage!</p>`
                    }, 2000)
                    //If pokemon is still alive
                    if (newLife >0){
                        opponentLife.innerText=newLife
                    } else {
                        opponentLife.innerText=0
                        setTimeout(function(){
                            box.innerHTML=`<p>${opponentPokemonName} fainted!</p>`
                            switchComputerPokemon()
                        }, 4000)
                        fainted="true"
                    }
                    
                } else if (attack.damage=="medium"){
                    let damage=Math.round(level/4)
                    let newLife=opponentLife.innerText-damage
                    box.innerHTML=`<p>${pokemonName} used ${attack.name}!</p>`
                    setTimeout(function(){
                        box.innerHTML=`<p>${attack.name} did ${damage} damage!</p>`
                    }, 2000)
                    //If pokemon is still alive
                    if (newLife >0){
                        opponentLife.innerText=newLife
                    } else {
                        opponentLife.innerText=0
                        setTimeout(function(){
                            box.innerHTML=`<p>${opponentPokemonName} fainted!</p>`
                            switchComputerPokemon()
                        }, 4000)
                        fainted="true"
                    }
                } else {
                    let damage=Math.round(level/2)
                    let newLife=opponentLife.innerText-damage
                    box.innerHTML=`<p>${pokemonName} used ${attack.name}!</p>`
                    setTimeout(function(){
                        box.innerHTML=`<p>${attack.name} did ${damage} damage!</p>`
                    }, 2000)
                    //If pokemon is still alive
                    if (newLife >0){
                        opponentLife.innerText=newLife
                    } else {
                        opponentLife.innerText=0
                        setTimeout(function(){
                            box.innerHTML=`<p>${opponentPokemonName} fainted!</p>`
                            switchComputerPokemon()
                        }, 4000)
                        fainted="true"
                    }
                }
            } 
            //if attack missed
            else {
                box.innerHTML=`<p>${pokemonName}'s ${attack.name} missed!</p>`
            }

            if (fainted=="false") {
                //Execute Computer's attack
                setTimeout(function(){
                executeComputerAttack()
            }, 4000)
            }
    
        })

    


    }

}

function executeComputerAttack(){
    const attacks=document.querySelectorAll('#opponent-attacks li')
    let randomAttack = attacks[Math.floor(Math.random()*attacks.length)];
    //Get computer's pokemon's level
    const level= document.querySelector('#opponent-level').getAttribute('level')
    let playerLife=document.querySelector('.your-pokemon h4 span')
    let box=document.querySelector('#battle-box')
    const pokemonName=document.querySelector('.opponent-pokemon h4').getAttribute('data-name')
    const opponentPokemonName=document.querySelector('.your-pokemon h4').getAttribute('data-name')
    fetch(`http://localhost:3000/attacks/${randomAttack.getAttribute('attack-id')}`)
    .then(resp => resp.json())
    .then(attack=> {
        //If attack hits
        if (Math.random()<attack.hit){
            if (attack.damage=="low"){
                let damage=Math.round(level/6)
                let newLife=playerLife.innerText-damage
                box.innerHTML=`<p>${pokemonName} used ${attack.name}!</p>`
                setTimeout(function(){
                    box.innerHTML=`<p>${attack.name} did ${damage} damage!</p>`
                }, 2000)
                //If pokemon is still alive
                if (newLife >0){
                    playerLife.innerText=newLife
                } else {
                    playerLife.innerText=0
                    setTimeout(function(){
                        box.innerHTML=`<p>${opponentPokemonName} fainted!</p>`
                        switchPlayerPokemon()
                    }, 4000)
                }
                
            } else if (attack.damage=="medium"){
                let damage=Math.round(level/4)
                let newLife=playerLife.innerText-damage
                box.innerHTML=`<p>${pokemonName} used ${attack.name}!</p>`
                setTimeout(function(){
                    box.innerHTML=`<p>${attack.name} did ${damage} damage!</p>`
                }, 2000)
                //If pokemon is still alive
                if (newLife >0){
                    playerLife.innerText=newLife
                } else {
                    playerLife.innerText=0
                    setTimeout(function(){
                        box.innerHTML=`<p>${opponentPokemonName} fainted!</p>`
                        switchPlayerPokemon()
                    }, 4000)
                }
            } else {
                let damage=Math.round(level/2)
                let newLife=playerLife.innerText-damage
                box.innerHTML=`<p>${pokemonName} used ${attack.name}!</p>`
                setTimeout(function(){
                    box.innerHTML=`<p>${attack.name} did ${damage} damage!</p>`
                }, 2000)
                //If pokemon is still alive
                if (newLife >0){
                    playerLife.innerText=newLife
                } else {
                    playerLife.innerText=0
                    setTimeout(function(){
                        box.innerHTML=`<p>${opponentPokemonName} fainted!</p>`
                        switchPlayerPokemon()
                    }, 4000)
                }
            }
        } 
        //if attack missed
        else {
            box.innerHTML=`<p>${pokemonName}'s ${attack.name} missed!</p>`
        }

    });
}

function switchComputerPokemon(){
    setTimeout(function(){
    let box=document.querySelector('#battle-box')
    opponentRoster.shift()
    box.innerHTML=`Opponent switched to ${opponentRoster[0].name}`

    if (opponentRoster.length==0){
        youWin()
    }else{
    let div=document.querySelector('.opponent-pokemon')
    div.innerHTML=`<h4 id='opponent-level' data-name='${opponentRoster[0].name}' level= '${opponentRoster[0].level}'>lvl ${opponentRoster[0].level} ${opponentRoster[0].name}</h4><h4>Life Points: <span>${opponentRoster[0].life}</span></h4><img src=${opponentRoster[0].img}>`

    fetch(`http://localhost:3000/pokemons/${opponentRoster[0].id}/attacks`)
    .then(resp => resp.json())
    .then(json=> {
        renderAttacks(json, "opponent")
    });
    }
    }, 1500)

}

function switchPlayerPokemon(){
    currentPokemonIndex++
    if (currentPokemonIndex==numberOfPokemon){
        youLose()
    }
    else{
    setTimeout(function(){
        let box=document.querySelector('#battle-box')
        fetch(`http://localhost:3000/pokemons/${pokemonRoster[currentPokemonIndex].getAttribute('pokemon-id')}`)
        .then(resp => resp.json())
        .then(json=> {
        box.innerHTML=`You switched to ${json.name}`
        let div2=document.querySelector('.your-pokemon')
        div2.innerHTML=`<h4 id='your-level' data-name='${json.name}' level= '${json.level}'>lvl ${json.level} ${json.name}</h4><h4>Life Points: <span>${json.life}</span></h4><img src=${pokemonRoster[currentPokemonIndex].querySelector('img').getAttribute('src')}>`
    });
    
        fetch(`http://localhost:3000/pokemons/${pokemonRoster[currentPokemonIndex].getAttribute('pokemon-id')}/attacks`)
        .then(resp => resp.json())
        .then(json=> {
            renderAttacks(json, "player")
        });
    }, 1500)
   
    }
   

}

function youWin(){
    setTimeout(function(){
    document.querySelector('#battle').setAttribute('class', 'hidden')
    fetch(`http://localhost:3000/trainers/${trainerId}`)
    .then(resp => resp.json())
    .then(trainer=> {
        let div=document.querySelector('#post-battle')
        div.innerHTML=`<img src=${trainer.img}> <h3>You win....this time.</h3>`
    });
    }, 3000)
    
}

function youLose(){
    setTimeout(function(){
    document.querySelector('#battle').setAttribute('class', 'hidden')
    fetch(`http://localhost:3000/trainers/${trainerId}`)
    .then(resp => resp.json())
    .then(trainer=> {
        let div=document.querySelector('#post-battle')
        div.innerHTML=`<img src=${trainer.img}> <h3>Better luck next time, loser.</h3>`
    });
    }, 3000)
}

function myMove() {
    var elem = document.querySelector(".your-pokemon");
    var pos = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (pos == 350) {
        clearInterval(id);
      } else {
        pos++;
        elem.style.top = pos + 'px';
        elem.style.left = pos + 'px';
      }
    }
  }
  

}
