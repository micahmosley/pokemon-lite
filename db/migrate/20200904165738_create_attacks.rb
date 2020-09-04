class CreateAttacks < ActiveRecord::Migration[6.0]
  def change
    create_table :attacks do |t|
      t.string :name
      t.integer :damage
      t.float :hit
      t.string :special
      

      t.timestamps
    end
  end
end
