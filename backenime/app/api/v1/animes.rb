# frozen_string_literal: true

module V1
  class Animes < Grape::API
    helpers ApiHelpers

    helpers do
      def anime_params
        ActionController::Parameters.new(params).permit(
          :name, :studio, :genre_id, :subgenre_id, :second_subgenre_id
        )
      end

      def find_anime
        @anime = Anime.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        error!({ error: "Anime not found" }, 404)
      end

      def find_tag
        @tag = Tag.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        error!({ error: "Tag not found" }, 404)
      end
    end

    resource :animes do
      desc "Get all animes", {
        success: Entities::AnimeResponse,
        failure: [
          { code: 401, message: "Unauthorized" }
        ],
        animes: [ "animes" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
      end
      get do
        authenticate!
        @animes = Anime.all
        present @animes, with: Entities::AnimeResponse
      end

      desc "Get a specific anime", {
        success: Entities::AnimeResponse,
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 404, message: "Not Found" }
        ],
        animes: [ "animes" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :id, type: Integer, desc: "Anime ID"
      end
      get ":id" do
        authenticate!
        find_anime
        present @anime, with: Entities::AnimeResponse
      end

      desc "Create a new anime", {
        success: Entities::AnimeResponse,
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 422, message: "Unprocessable Entity" }
        ],
        animes: [ "animes" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :name, type: String, desc: "Anime name"
        requires :studio, type: String, desc: "Studio name"
        requires :genre_id, type: Integer, desc: "Genre ID"
        optional :subgenre_id, type: Integer, desc: "SubGenre ID"
        optional :second_subgenre_id, type: Integer, desc: "Second SubGenre ID"
      end
      post do
        authenticate!
        @anime = Anime.new(anime_params)
        if @anime.save
          present @anime, with: Entities::AnimeResponse
        else
          error!({ errors: @anime.errors.full_messages }, 422)
        end
      end

      desc "Update an existing anime", {
        success: Entities::AnimeResponse,
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 404, message: "Not Found" },
          { code: 422, message: "Unprocessable Entity" }
        ],
        animes: [ "animes" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :name, type: String, desc: "Anime name"
        requires :studio, type: String, desc: "Studio name"
        requires :genre_id, type: Integer, desc: "Genre ID"
        optional :subgenre_id, type: Integer, desc: "SubGenre ID"
        optional :second_subgenre_id, type: Integer, desc: "Second SubGenre ID"
      end
      put ":id" do
        authenticate!
        find_anime
        if @anime.update(anime_params)
          present @anime, with: Entities::AnimeResponse
        else
          error!({ errors: @anime.errors.full_messages }, 422)
        end
      end

      desc "Delete an anime", {
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 404, message: "Not Found" }
        ],
        animes: [ "animes" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :id, type: Integer, desc: "Anime ID"
      end
      delete ":id" do
        authenticate!
        find_anime
        if @anime.destroy
          { success: true, message: "Anime successfully deleted" }
        else
          error!({ errors: @anime.errors.full_messages }, 422)
        end
      end

      desc "Assign a tag anime", {
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 404, message: "Not Found" }
        ],
        animes: [ "animes" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :id, type: Integer, desc: "Anime ID"
        requires :tag_id, type: Integer, desc: "Tag ID"
      end
      post ":id/assign_tag" do
        authenticate!
        find_anime
        find_tag
        tags_anime = TagsAnime.new(tag_id: @tag.id, anime_id: @anime.id)
        if tags_anime.save
          { success: true, message: "Tag succesfully assigned" }
        else
          error!({ errors: tags_anime.errors.full_messages }, 422)
        end
      end
    end
  end
end
