# frozen_string_literal: true

module V1
  class Genres < Grape::API
    helpers ApiHelpers

    helpers do
      def genre_params
        ActionController::Parameters.new(params).permit(:name)
      end

      def find_genre
        @genre = Genre.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        error!({ error: "Genre not found" }, 404)
      end
    end

    resource :genres do
      desc "Get all genres", {
        success: ::Entities::GenreResponse,
        failure: [
          { code: 401, message: "Unauthorized" }
        ],
        genres: [ "genres" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
      end
      get do
        authenticate!
        @genres = Genre.all
        present @genres, with: ::Entities::GenreResponse
      end

      desc "Get a specific genre", {
        success: ::Entities::GenreResponse,
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 404, message: "Not Found" }
        ],
        genres: [ "genres" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :id, type: Integer, desc: "Genre ID"
      end
      get ":id" do
        authenticate!
        find_genre
        present @genre, with: ::Entities::GenreResponse
      end

      desc "Create a new genre", {
        success: ::Entities::GenreResponse,
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 422, message: "Unprocessable Entity" }
        ],
        genres: [ "genres" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :name, type: String, desc: "Genre name"
      end
      post do
        authenticate!
        @genre = Genre.new(genre_params)
        if @genre.save
          present @genre, with: ::Entities::GenreResponse
        else
          error!({ errors: @genre.errors.full_messages }, 422)
        end
      end

      desc "Update an existing genre", {
        success: ::Entities::GenreResponse,
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 404, message: "Not Found" },
          { code: 422, message: "Unprocessable Entity" }
        ],
        genres: [ "genres" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :id, type: Integer, desc: "Genre ID"
        optional :name, type: String, desc: "Genre name"
      end
      put ":id" do
        authenticate!
        find_genre
        if @genre.update(genre_params)
          present @genre, with: ::Entities::GenreResponse
        else
          error!({ errors: @genre.errors.full_messages }, 422)
        end
      end

      desc "Delete an genre", {
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 404, message: "Not Found" }
        ],
        genres: [ "genres" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :id, type: Integer, desc: "Genre ID"
      end
      delete ":id" do
        authenticate!
        find_genre
        if @genre.destroy
          { success: true, message: "Genre successfully deleted" }
        else
          error!({ errors: @genre.errors.full_messages }, 422)
        end
      end
    end
  end
end
