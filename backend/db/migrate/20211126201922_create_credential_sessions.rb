class CreateCredentialSessions < ActiveRecord::Migration[6.1]
  def change
    create_table :credential_sessions do |t|

      t.string :imap_host, null: false
      t.integer :imap_port, null: false
      t.string :smtp_host, null: false
      t.integer :smtp_port, null: false
      t.string :domain, null: false
      t.string :username, null: false
      t.string :from_email, null: false
      t.string :password, null: false
      t.timestamps
    end
  end
end
