# frozen_string_literal: true

class V1::ApiGrape < Grape::API
  version "v1", using: :path
  format :json
  default_format :json

  # Mount your endpoints here
  mount V1::AnimeQuiz

  add_swagger_documentation(
    api_version: "v1",
    hide_documentation_path: true,
    mount_path: "/swagger_doc",
    hide_format: true,
    info: {
      title: "AnimeQuiz API",
      description: "API for AnimeQuiz",
      contact_name: "João Paulo",
      contact_email: "johnnys.ribeiro@gmail.com"
    },
    security_definitions: {
      Bearer: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        description: 'Enter "Bearer" followed by your token. Example: Bearer abc123'
      }
    },
    security: [ { Bearer: [] } ]
  )
end
