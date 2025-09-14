# frozen_string_literal: true

module Entities
  class AnimeResponse < Grape::Entity
    expose :id, documentation: { type: "Integer", desc: "Anime ID" }
    expose :name, documentation: { type: "String", desc: "Anime name" }
    expose :studio, documentation: { type: "String", desc: "Anime studio" }
    expose :genre_id, documentation: { type: "Integer", desc: "Genre ID" }
    expose :subgenre_id, documentation: { type: "Integer", desc: "SubGenre ID" }
    expose :second_subgenre_id, documentation: { type: "Integer", desc: "Second SubGenre ID" }
    expose :created_at, documentation: { type: "Datetime", desc: "Created at" }
    expose :updated_at, documentation: { type: "DateTime", desc: "Updated at" }
  end
end
