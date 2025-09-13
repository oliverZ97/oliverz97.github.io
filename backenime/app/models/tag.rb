class Tag < ApplicationRecord
  has_many :tags_animes
  has_many :animes, through: :tags_animes
end
