# frozen_string_literal: true

module Entities
  class CharacterResponse < Grape::Entity
    expose :id, documentation: { type: "Integer", desc: "Character ID" }
    expose :label, documentation: { type: "String", desc: "Character label" }
    expose :name, documentation: { type: "String", desc: "Character name" }
    expose :sex, documentation: { type: "String", desc: "Character sex" }
    expose :origin, documentation: { type: "String", desc: "Character origin" }
    expose :hair_color, documentation: { type: "String", desc: "Character hair color" }
    expose :age, documentation: { type: "String", desc: "Character age" }
    expose :age_group, documentation: { type: "String", desc: "Character age group" }
    expose :height, documentation: { type: "Integer", desc: "Character height" }
    expose :eye_color, documentation: { type: "String", desc: "Character eye color" }
    expose :anime_id, documentation: { type: "Integer", desc: "Anime id" }
    expose :birthday, documentation: { type: "Datetime", desc: "Character birthday" }
    expose :difficulty, documentation: { type: "String", desc: "Character difficulty" }
    expose :editorial_staff_hint, documentation: { type: "String", desc: "Editorial Staff Hint" }
    expose :version, documentation: { type: "Integer", desc: "Version" }
    expose :created_at, documentation: { type: "Datetime", desc: "Created at" }
    expose :updated_at, documentation: { type: "DateTime", desc: "Updated at" }
  end
end
