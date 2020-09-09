class PokemonsController < ApplicationController
    
    def index
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
        {name: 'magnemite', poke_type: 'electric', img: 'pokemon-lite/app/assets/images/magnemite.jpeg'}
        ]


        render json: pokemon
    end 
    
end
