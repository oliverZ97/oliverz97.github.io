# frozen_string_literal: true

module V1
  class Tags < Grape::API
    helpers ApiHelpers

    helpers do
      def tag_params
        ActionController::Parameters.new(params).permit(:name)
      end

      def find_tag
        @tag = Tag.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        error!({ error: "Tag not found" }, 404)
      end
    end

    resource :tags do
      desc "Get all tags", {
        success: Entities::TagResponse,
        failure: [
          { code: 401, message: "Unauthorized" }
        ],
        tags: [ "tags" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
      end
      get do
        authenticate!
        @tags = Tag.all
        present @tags, with: Entities::TagResponse
      end

      desc "Get a specific tag", {
        success: Entities::TagResponse,
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 404, message: "Not Found" }
        ],
        tags: [ "tags" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :id, type: Integer, desc: "Tag ID"
      end
      get ":id" do
        authenticate!
        find_tag
        present @tag, with: Entities::TagResponse
      end

      desc "Create a new tag", {
        success: Entities::TagResponse,
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 422, message: "Unprocessable Entity" }
        ],
        tags: [ "tags" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :name, type: String, desc: "Tag name"
      end
      post do
        authenticate!
        @tag = Tag.new(tag_params)
        if @tag.save
          present @tag, with: Entities::TagResponse
        else
          error!({ errors: @tag.errors.full_messages }, 422)
        end
      end

      desc "Update an existing tag", {
        success: Entities::TagResponse,
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 404, message: "Not Found" },
          { code: 422, message: "Unprocessable Entity" }
        ],
        tags: [ "tags" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :id, type: Integer, desc: "Tag ID"
        optional :name, type: String, desc: "Tag name"
      end
      put ":id" do
        authenticate!
        find_tag
        if @tag.update(tag_params)
          present @tag, with: Entities::TagResponse
        else
          error!({ errors: @tag.errors.full_messages }, 422)
        end
      end

      desc "Delete an tag", {
        failure: [
          { code: 401, message: "Unauthorized" },
          { code: 404, message: "Not Found" }
        ],
        tags: [ "tags" ]
      }
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :authentication_token, type: String, desc: "Authentication Token - can be fetched by login action"
        requires :id, type: Integer, desc: "Tag ID"
      end
      delete ":id" do
        authenticate!
        find_tag
        if @tag.destroy
          { success: true, message: "Tag successfully deleted" }
        else
          error!({ errors: @tag.errors.full_messages }, 422)
        end
      end
    end
  end
end
