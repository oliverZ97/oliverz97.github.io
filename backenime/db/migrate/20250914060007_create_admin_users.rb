class CreateAdminUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :admin_users do |t|
      t.string :login
      t.string :authentication_token
      t.string :password_digest

      t.timestamps
    end
  end
end
