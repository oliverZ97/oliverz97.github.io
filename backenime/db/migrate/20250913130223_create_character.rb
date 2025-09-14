class CreateCharacter < ActiveRecord::Migration[8.0]
  def change
    create_table :characters do |t|
:label
      t.string :name
      t.string :sex
      t.string :origin
      t.string :hair_color
      t.string :age
      t.string :age_group
      t.integer :height
      t.string :eye_color
      t.integer :anime_id
      t.datetime :birthday
      t.string :difficulty
      t.string :editorial_staff_hint
      t.integer :version
      t.timestamps
    end
  end
end
