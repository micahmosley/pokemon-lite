# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
bruno=Trainer.create(name:"Bruno")
Pokemon.create(name: 'Onix', img: 'pokemon-lite/app/assets/images/onix.jpeg', type: 'rock', level: 52, life: 104, trainer:bruno)
Pokemon.create(name: 'Hitmonchan', img: 'pokemon-lite/app/assets/images/hitmonlee.png', type: 'fighting', level: 50, life: 100, trainer:bruno)
Pokemon.create(name: 'Hitmonlee', img: 'pokemon-lite/app/assets/images/hitmonchan.png', type: 'fighting', level: 51, life: 102, trainer:bruno)
