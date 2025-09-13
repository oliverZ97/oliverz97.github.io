class CreateTagsAnime < ActiveRecord::Migration[8.0]
  def change
    create_table :tags_animes do |t|
      t.integer :tag_id
      t.integer :anime_id
      t.timestamps
    end
  end
end
