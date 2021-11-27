class CredentialSession < ApplicationRecord
  validates :imap_host,
            :imap_port,
            :smtp_host,
            :smtp_port,
            :domain,
            :username,
            :from_email,
            :password,
            presence: true
end
