# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
bruno=Trainer.create(name:"Bruno")
Pokemon.create(name: 'onix', img: 'pokemon-lite/app/assets/images/onix.jpeg', poke_type: 'rock', level: 52, life: 104, trainer:bruno)
Pokemon.create(name: 'hitmonchan', img: 'pokemon-lite/app/assets/images/hitmonlee.png', poke_type: 'fighting', level: 50, life: 100, trainer:bruno)
Pokemon.create(name: 'hitmonlee', img: 'pokemon-lite/app/assets/images/hitmonchan.png', poke_type: 'fighting', level: 51, life: 102, trainer:bruno)

toni=Trainer.create(name:"Toni")
Pokemon.create(name: 'charizard', poke_type: 'fire', img: 'pokemon-lite/app/assets/images/charizard.jpeg', level:65, life:130, trainer:toni)
Pokemon.create(name: 'rapidash', poke_type: 'fire', img: 'pokemon-lite/app/assets/images/rapidash.png', level:60, life:120, trainer:toni)

misty=Trainer.create(name:"Misty")
Pokemon.create(name: 'staryu', poke_type: 'water', img: 'pokemon-lite/app/assets/images/staryu.jpeg', level:62, life:124, trainer:misty)
Pokemon.create(name: 'squirtle', poke_type: 'water', img: 'pokemon-lite/app/assets/images/squirtle.jpeg', level:63, life:126, trainer:misty)

sparky=Trainer.create(name:"Sparky")
Pokemon.create(name: 'zapdos', poke_type: 'electric', img: 'pokemon-lite/app/assets/images/zapdos.jpeg', level:58, life:116, trainer:sparky)
Pokemon.create(name: 'pikachu', poke_type: 'electric', img: 'pokemon-lite/app/assets/images/pikachu.jpeg', level:61, life:122, trainer:sparky)