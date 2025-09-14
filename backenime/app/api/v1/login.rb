# frozen_string_literal: true

module V1
  class Login < Grape::API
    resource :login do
      desc "Login"
      params do
        requires :login, type: String, desc: "Login of AdminUser"
        requires :password, type: String, desc: "Password"
      end
      get do
        admin_user = AdminUser.authenticate_by(login: params[:login], password: params[:password])
        error!({ error: "Unauthorized" }, 401) unless admin_user.present?
        admin_user.set_authentication_token

        {
          login: admin_user.login,
          authentication_token: admin_user.authentication_token
        }
      end
    end
  end
end
