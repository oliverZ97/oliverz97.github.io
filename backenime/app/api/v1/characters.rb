# frozen_string_literal: true

module V1
  class Characters < Grape::API
    helpers ApiHelpers

    helpers do
      def character_params
        ActionController::Parameters.new(params).permit(
          :label,
          :name,
          :sex,
          :origin,
          :hair_color,
          :age,
          :age_group,
          :height,
          :eye_color,
          :anime_id,
          :birthday,
          :difficulty,
          :editorial_staff_hint,
          :version
        )
      end

      def find_character
        @character = Character.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        error!({ error: "Character not found" }, 404)
      end
    end

    resource :characters do
      desc "Get all characters", {
        success: ::Entities::CharacterResponse,
        failure: [
          { code: 401, message: "Unauthorized" }
        ],
        characters: [ "characters" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
      end
      get do
        authenticate!
        @characters = Character.all
        present @characters, with: ::Entities::CharacterResponse
      end

      desc "Get a specific character", {
        success: ::Entities::CharacterResponse,
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 404, message: "Not Found" }
        ],
        characters: [ "characters" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :id, type: Integer, desc: "Character ID"
      end
      get ":id" do
        authenticate!
        find_character
        present @character, with: ::Entities::CharacterResponse
      end

      desc "Create a new character", {
        success: ::Entities::CharacterResponse,
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 422, message: "Unprocessable Entity" }
        ],
        characters: [ "characters" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :label, type: String, desc: "Character label"
        requires :name, type: "String", desc: "Character name"
        requires :sex, type: "String", desc: "Character sex"
        requires :origin, type: "String", desc: "Character origin"
        requires :hair_color, type: "String", desc: "Character hair color"
        requires :age, type: "String", desc: "Character age"
        requires :age_group, type: "String", desc: "Character age group"
        requires :height, type: "Integer", desc: "Character height"
        requires :eye_color, type: "String", desc: "Character eye color"
        requires :anime_id, type: "Integer", desc: "Anime id"
        requires :birthday, type: "Datetime", desc: "Character birthday"
        requires :difficulty, type: "String", desc: "Character difficulty"
        requires :editorial_staff_hint, type: "String", desc: "Editorial Staff Hint"
        requires :version, type: "Integer", desc: "Version"
      end
      post do
        authenticate!
        @character = Character.new(character_params)
        if @character.save
          present @character, with: ::Entities::CharacterResponse
        else
          error!({ errors: @character.errors.full_messages }, 422)
        end
      end

      desc "Update an existing character", {
        success: ::Entities::CharacterResponse,
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 404, message: "Not Found" },
          { code: 422, message: "Unprocessable Entity" }
        ],
        characters: [ "characters" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :id, type: Integer, desc: "Character ID"
        requires :label, type: String, desc: "Character label"
        requires :name, type: "String", desc: "Character name"
        requires :sex, type: "String", desc: "Character sex"
        requires :origin, type: "String", desc: "Character origin"
        requires :hair_color, type: "String", desc: "Character hair color"
        requires :age, type: "String", desc: "Character age"
        requires :age_group, type: "String", desc: "Character age group"
        requires :height, type: "Integer", desc: "Character height"
        requires :eye_color, type: "String", desc: "Character eye color"
        requires :anime_id, type: "Integer", desc: "Anime id"
        requires :birthday, type: "Datetime", desc: "Character birthday"
        requires :difficulty, type: "String", desc: "Character difficulty"
        requires :editorial_staff_hint, type: "String", desc: "Editorial Staff Hint"
        requires :version, type: "Integer", desc: "Version"
      end
      put ":id" do
        authenticate!
        find_character
        if @character.update(character_params)
          present @character, with: ::Entities::CharacterResponse
        else
          error!({ errors: @character.errors.full_messages }, 422)
        end
      end

      desc "Delete an character", {
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 404, message: "Not Found" }
        ],
        characters: [ "characters" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :id, type: Integer, desc: "Character ID"
      end
      delete ":id" do
        authenticate!
        find_character
        if @character.destroy
          { success: true, message: "Character successfully deleted" }
        else
          error!({ errors: @character.errors.full_messages }, 422)
        end
      end
    end
  end
end
