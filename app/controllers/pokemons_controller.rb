class PokemonsController < ApplicationController
    skip_before_action :verify_authenticity_token
    def data
        pokemon=[{name: 'squirtle', poke_type: 'water', img: '../assets/images/squirtle.jpeg'},
        {name: 'ivysaur', poke_type: 'grass', img: '../assets/images/ivysaur.jpeg'},
        {name: 'charizard', poke_type: 'fire', img: '../assets/images/charizard.jpeg'},
        {name: 'staryu', poke_type: 'water', img: '../assets/images/staryu.jpeg'},
        {name: 'vileplume', poke_type: 'grass', img: '../assets/images/vileplume.jpeg'},
        {name: 'vulpix', poke_type: 'fire', img: '../assets/images/vulpix.jpeg'},
        {name: 'weepinbell', poke_type: 'grass', img: '../assets/images/weepinbell.png'},
        {name: 'rapidash', poke_type: 'fire', img: '../assets/images/rapidash.png'},
        {name: 'pikachu', poke_type: 'electric', img: '../assets/images/pikachu.jpeg'},
        {name: 'zapdos', poke_type: 'electric', img: '../assets/images/zapdos.jpeg'},
        {name: 'magnemite', poke_type: 'electric', img: '../assets/images/magnemite.jpeg'},
        {name: 'onix', img: '../assets/images/onix.jpeg', poke_type: 'rock'},
        {name: 'hitmonchan', img: '../assets/images/hitmonlee.png', poke_type: 'fighting'},
        {name: 'hitmonlee', img: '../assets/images/hitmonchan.png', poke_type: 'fighting'},
        {name: 'rhyhorn', img: '../assets/images/rhyhorn.jpeg', poke_type: 'rock'},
        {name: 'gastly', img: '../assets/images/gastly.jpeg', poke_type: 'ghost'},
        {name: 'gengar', img: '../assets/images/gengar.jpeg', poke_type: 'ghost'},
        {name: 'beedrill', img: '../assets/images/beedrill.jpeg', poke_type: 'bug'},
        {name: 'butterfree', img: '../assets/images/butterfree.jpeg', poke_type: 'bug'}
        
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
            pokemon.attacks
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
