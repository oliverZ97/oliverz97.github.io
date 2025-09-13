class CreateAnime < ActiveRecord::Migration[8.0]
  def change
    create_table :animes do |t|\
      t.string :name
      t.integer :genre_id
      t.integer :subgenre_id
      t.integer :second_subgenre_id
      t.integer :studio
      t.timestamps
    end
  end
end
