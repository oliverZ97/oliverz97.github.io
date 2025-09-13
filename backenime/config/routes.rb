Rails.application.routes.draw do
  mount Rswag::Ui::Engine => "/api-docs"

  mount V1::ApiGrape => "api", as: :v1_api
end
