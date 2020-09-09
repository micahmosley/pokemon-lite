class TrainersController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        trainers = Trainer.all
        render json: trainers
    end

    def create 
        trainer=Trainer.create(name: params["name"])

        render json: trainer
    end 



end
