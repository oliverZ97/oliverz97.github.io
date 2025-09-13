# frozen_string_literal: true

module Entities
  class GenreResponse < Grape::Entity
    expose :id, documentation: { type: "Integer", desc: "Genre ID" }
    expose :name, documentation: { type: "String", desc: "Genre name" }
    expose :created_at, documentation: { type: "Datetime", desc: "Created at" }
    expose :updated_at, documentation: { type: "DateTime", desc: "Updated at" }
  end
end
