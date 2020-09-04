class Pokemon < ApplicationRecord
    belongs_to :trainer
    has_many :pokemon_attacks
    has_many :attacks, through: :pokemon_attacks
end
