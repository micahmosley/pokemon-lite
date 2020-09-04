class CreatePokemonAttacks < ActiveRecord::Migration[6.0]
  def change
    create_table :pokemon_attacks do |t|
      t.integer :pokemon_id
      t.integer :attack_id

      t.timestamps
    end
  end
end
