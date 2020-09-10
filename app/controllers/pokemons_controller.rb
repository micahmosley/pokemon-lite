class PokemonsController < ApplicationController
    skip_before_action :verify_authenticity_token
    def data
        pokemon=[{name: 'squirtle', poke_type: 'water', img: 'pokemon-lite/app/assets/images/squirtle.jpeg'},
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
        render json: pokemon
    end 

    def index 
        pokemon=Pokemon.all

        render json: pokemon
    end 

    def create 
        pokemon_array=[]
        params["_json"].each do |pokemon|
            pokemon=Pokemon.create(name: pokemon["name"], img: pokemon["img"], level: pokemon["level"], poke_type: pokemon["poke_type"], trainer_id: pokemon["trainer_id"])
            pokemon_array << pokemon
        end 
        

        render json: pokemon_array
    end 

    def update 
        id=params["id"].to_i
        level=params["level"].to_i
        life=level*2
        pokemon=Pokemon.find(id)
        pokemon.update(level: level, life: life)

        render json: pokemon
    end 

    
    
end
