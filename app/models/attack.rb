class Attack < ApplicationRecord
    has_many :pokemon_attacks 
    has_many :pokemon, through: :pokemon_attacks
end
