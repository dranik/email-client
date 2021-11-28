class MailService
  def self.get_emails(credential_session, page)
    imap = Net::IMAP.new(credential_session.imap_host, credential_session.imap_port, true)
    imap.login(credential_session.username, credential_session.password)
    imap.examine('INBOX')
    emails = imap.uid_search(["ALL"]).each_slice(10).to_a[page.to_i - 1]
      .map do |uid|
        email = Mail.new(imap.uid_fetch(uid, "RFC822").first.attr["RFC822"])
        { subject: email.subject, date: email.date, from: email.from, uid: uid }
      end

    emails
  end

  def self.get_email(credential_session, id)
    imap = Net::IMAP.new(credential_session.imap_host, credential_session.imap_port, true)
    imap.login(credential_session.username, credential_session.password)
    imap.examine('INBOX')
    letter = Mail.new(imap.uid_fetch(id.to_i, "RFC822").first.attr["RFC822"])

    if letter.multipart?
      return flatten_email(letter)
               .filter{ |part| part.content_type.starts_with? 'text' }
               .map(&:decoded)
    else
      return [ letter.decoded ]
    end
  end

  def self.send_email(credential_session, params)
    options = {
      :address              => credential_session.smtp_host,
      :port                 => credential_session.smtp_port,
      :domain               => credential_session.domain,
      :user_name            => credential_session.username,
      :from                 => credential_session.from_email,
      :password             => credential_session.password,
      :authentication       => 'plain',
      :enable_starttls_auto => true
    }

    parameters = params

    mail = Mail.new do
      from            credential_session.from_email
      to              parameters[:to]
      cc              parameters[:cc] if parameters[:cc]
      bcc             parameters[:bcc] if parameters[:bcc]
      subject         parameters[:subject]
      delivery_method :smtp, options

      content_type 'text/html; charset=UTF-8'
      body parameters[:text]
    end

    mail.deliver
  end

  private

  def flatten_email(letter)
    if letter.multipart?
      letter.parts
        .map { |part| flatten_email(part) }
        .flatten
    else
      letter
    end
  end
end
