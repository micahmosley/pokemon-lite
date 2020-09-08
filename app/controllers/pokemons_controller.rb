class PokemonsController < ApplicationController

    def index
        pokemon=[{name: 'squirtle', poke_type: 'water', img: 'pokemon-lite/app/assets/images/squirtle.jpeg'},
        {name: 'ivysaur', poke_type: 'leaf', img: 'pokemon-lite/app/assets/images/ivysaur.jpeg'},
        {name: 'charizard', poke_type: 'fire', img: 'pokemon-lite/app/assets/images/charizard.jpeg'}
        ]

        render json: pokemon
    end 
    
end
