class CredentialSessionsController < ApplicationController
  def create
    credential_session = CredentialSession.create(
      params
        .require(:credential_session)
        .permit(
          :imap_host,
          :imap_port,
          :smtp_host,
          :smtp_port,
          :domain,
          :username,
          :from_email,
          :password
        )
    )

     if credential_session.persisted?
       render json: { id: credential_session.id }
     else
       render json: { error: "Could not initiate the session" }, status: 500
     end
  end
end
