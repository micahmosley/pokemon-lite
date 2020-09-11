class AttacksController < ApplicationController


    def show
        render json: Attack.find(params[:id])
    end 
end
