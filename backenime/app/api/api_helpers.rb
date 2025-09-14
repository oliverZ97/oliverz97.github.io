# frozen_string_literal: true

# rubocop:disable Metrics/ModuleLength
module ApiHelpers
  def authenticate!
    admin_user = AdminUser.find_by(login: params[:login], authentication_token: params[:authentication_token])
    byebug
    error!({ error: "Unauthorized" }, 401) unless admin_user.present?
  end
end
