class CreatePokemons < ActiveRecord::Migration[6.0]
  def change
    create_table :pokemons do |t|
      t.string :name
      t.string :img
      t.integer :life
      t.integer :level
      t.string :type
      t.integer :trainer_id

      t.timestamps
    end
  end
end
