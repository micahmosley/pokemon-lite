# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
bruno=Trainer.create(name:"Brock", img: './images/brock.jpeg')
onix=Pokemon.create(name: 'onix', img: './images/onix.jpeg', poke_type: 'rock', level: 52, life: 104, trainer:bruno)
hitmonchan=Pokemon.create(name: 'hitmonchan', img: './images/hitmonlee.png', poke_type: 'fighting', level: 50, life: 100, trainer:bruno)
hitmonlee=Pokemon.create(name: 'hitmonlee', img: './images/hitmonchan.png', poke_type: 'fighting', level: 51, life: 102, trainer:bruno)

toni=Trainer.create(name:"Toni", img: './images/Toni.jpeg')
charizard=Pokemon.create(name: 'charizard', poke_type: 'fire', img: './images/charizard.jpeg', level:65, life:130, trainer:toni)
rapidash=Pokemon.create(name: 'rapidash', poke_type: 'fire', img: './images/rapidash.png', level:60, life:120, trainer:toni)

misty=Trainer.create(name:"Misty", img: './images/misty.jpeg')
staryu=Pokemon.create(name: 'staryu', poke_type: 'water', img: './images/staryu.jpeg', level:62, life:124, trainer:misty)
squirtle=Pokemon.create(name: 'squirtle', poke_type: 'water', img: './images/squirtle.jpeg', level:63, life:126, trainer:misty)


sparky=Trainer.create(name:"Gary", img: './images/Gary.jpeg')
zapdos=Pokemon.create(name: 'zapdos', poke_type: 'electric', img: './images/zapdos.jpeg', level:58, life:116, trainer:sparky)
pikachu=Pokemon.create(name: 'pikachu', poke_type: 'electric', img: './images/pikachu.jpeg', level:61, life:122, trainer:sparky)

# water attacks
Attack.create(name:"tackle", damage: "low", hit:0.9, special: "n/a")
Attack.create(name:"water gun", damage: "medium", hit:0.7, special: "n/a")
Attack.create(name:"tidal wave", damage: "high", hit:0.5, special: "n/a")
Attack.create(name:"rain", damage: "none", hit:1.0, special: "increase")
#fire attacks
Attack.create(name:"scratch", damage: "low", hit:0.9, special: "n/a")
Attack.create(name:"ember", damage: "medium", hit:0.7, special: "n/a")
Attack.create(name:"flamethrower", damage: "high", hit:0.5, special: "n/a")
Attack.create(name:"fire up", damage: "none", hit:1.0, special: "increase")
#grass attacks
Attack.create(name:"tackle", damage: "low", hit:0.9, special: "n/a")
Attack.create(name:"razor leaf", damage: "medium", hit:0.7, special: "n/a")
Attack.create(name:"solar beam", damage: "high", hit:0.5, special: "n/a")
Attack.create(name:"photosynthesis", damage: "none", hit:1.0, special: "heal")
#electric attacks
Attack.create(name:"tackle", damage: "low", hit:0.9, special: "n/a")
Attack.create(name:"shock", damage: "medium", hit:0.7, special: "n/a")
Attack.create(name:"thundershock", damage: "high", hit:0.5, special: "n/a")
Attack.create(name:"stun", damage: "none", hit:0.9, special: "paralyze")
#ghost attacks
Attack.create(name:"tackle", damage: "low", hit:0.9, special: "n/a")
Attack.create(name:"shadow ball", damage: "medium", hit:0.7, special: "n/a")
Attack.create(name:"nightmare", damage: "high", hit:0.5, special: "n/a")
Attack.create(name:"scare", damage: "none", hit:0.9, special: "paralyze")
#rock attacks
Attack.create(name:"ram", damage: "low", hit:0.9, special: "n/a")
Attack.create(name:"rockslide", damage: "medium", hit:0.7, special: "n/a")
Attack.create(name:"earthquake", damage: "high", hit:0.5, special: "n/a")
Attack.create(name:"harden", damage: "none", hit:0.9, special: "heal")
#fighting attacks
Attack.create(name:"punch", damage: "low", hit:0.9, special: "n/a")
Attack.create(name:"mega punch", damage: "medium", hit:0.7, special: "n/a")
Attack.create(name:"bodyslam", damage: "high", hit:0.5, special: "n/a")
Attack.create(name:"mega kick", damage: "high", hit:0.5, special: "n/a")
#bug attacks
Attack.create(name:"scratch", damage: "low", hit:0.9, special: "n/a")
Attack.create(name:"sting", damage: "medium", hit:0.7, special: "n/a")
Attack.create(name:"fury cutter", damage: "high", hit:0.5, special: "n/a")
Attack.create(name:"leech", damage: "n/a", hit:0.5, special: "lowers")
squirtle.populate_attacks
staryu.populate_attacks
charizard.populate_attacks
rapidash.populate_attacks
onix.populate_attacks
hitmonchan.populate_attacks
hitmonlee.populate_attacks
zapdos.populate_attacks
pikachu.populate_attacks