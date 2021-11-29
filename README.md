# Email client

Email client, uses IMAP/SMTP

## How to run

You need docker in order to run the app

```
  docker-compose build
  docker-compose up
```

In the separate terminal:

```
  docker-compose exec backend rails db:create
  docker-compose exec backend rails db:migrate
```

The app is available at localhost, port 80
