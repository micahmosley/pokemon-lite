class Pokemon < ApplicationRecord
    belongs_to :trainer
    has_many :pokemon_attacks
    has_many :attacks, through: :pokemon_attacks

    def populate_attacks
        if poke_type=="water" 
            PokemonAttack.create(pokemon_id: self.id, attack_id: 1)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 2)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 3)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 4)
        elsif poke_type=="fire"
            PokemonAttack.create(pokemon_id: self.id, attack_id: 5)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 6)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 7)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 8)
        elsif poke_type=="grass"
            PokemonAttack.create(pokemon_id: self.id, attack_id: 9)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 10)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 11)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 12)
        elsif poke_type=="electric"
            PokemonAttack.create(pokemon_id: self.id, attack_id: 13)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 14)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 15)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 16)
        elsif poke_type=="ghost"
            PokemonAttack.create(pokemon_id: self.id, attack_id: 17)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 18)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 19)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 20)
        elsif poke_type=="rock"
            PokemonAttack.create(pokemon_id: self.id, attack_id: 21)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 22)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 23)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 24)
        elsif poke_type=="fighting"
            PokemonAttack.create(pokemon_id: self.id, attack_id: 25)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 26)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 27)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 28)
        elsif poke_type=="bug"
            PokemonAttack.create(pokemon_id: self.id, attack_id: 29)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 30)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 31)
            PokemonAttack.create(pokemon_id: self.id, attack_id: 32)
        end 
    end 
end
