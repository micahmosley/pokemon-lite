Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :pokemons
  resources :trainers
  resources :attacks

  get 'pocketmonsters', to: 'pokemons#data'
  get '/trainers/:id/pokemons', to: 'trainers#pokemons'
  get '/pokemons/:id/attacks', to: 'pokemons#pokemon_attacks'

end
