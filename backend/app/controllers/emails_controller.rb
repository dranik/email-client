require 'net/imap'

class EmailsController < ApplicationController
  def index
    credential_session = CredentialSession.created_after(1.hour.ago).find(params[:credential_session_id])

    render :json => MailService.get_emails(credential_session, params[:page])
  end

  def show
    credential_session = CredentialSession.created_after(1.hour.ago).find(params[:credential_session_id])

    render :json => MailService.get_email(credential_session, params[:id])
  end

  def create
    credential_session = CredentialSession.created_after(1.hour.ago).find(params[:credential_session_id])

    MailService.send_email(credential_session, params)
    render :json => { status: :ok }
  end


end
