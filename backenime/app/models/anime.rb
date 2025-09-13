class Anime < ApplicationRecord
  has_many :characters
  has_many :tags_animes
  has_many :tags, through: :tags_animes
  belongs_to :genre, class_name: "Genre", foreign_key: "genre_id"
  belongs_to :subgenre, class_name: "Genre", foreign_key: "subgenre_id", optional: true
  belongs_to :second_subgenre, class_name: "Genre", foreign_key: "second_subgenre_id", optional: true
end
