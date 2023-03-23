# Crypto Monitor

This is an application which provides you the current price of top 20 crypto coins. It is built using Django with DRF for the server part and ReactJS for the client part. The stack includes:

- ReactJS client
- Django REST API
- Postgresql as database
- Celery worker for background and periodic tasks
- Redis as message broker for celery tasks
- Daphne as an application server
- Nginx as web server

### Installation

- Clone this repository using

```bash
    git clone https://github.com/N1cus0r/crypto-monitor.git
```

- Build and run docker containers

```bash
docker-compose build

docker-compose run
```

The application will be available on **localhost** or **127.0.0.1** and you don't have to specify the port.
