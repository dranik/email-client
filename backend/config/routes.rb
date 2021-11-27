Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :emails, only: [:index, :show, :create]
  resources :credential_sessions, only: [:create]
end
