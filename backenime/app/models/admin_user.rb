class AdminUser < ApplicationRecord
  has_secure_password

  def set_authentication_token
    update!(authentication_token: SecureRandom.urlsafe_base64(nil, false))
  end

  def reset_authentication_token
    update!(authentication_token: nil)
  end
end
