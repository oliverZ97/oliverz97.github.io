class TagsAnime < ApplicationRecord
  belongs_to :anime
  belongs_to :tag
end
