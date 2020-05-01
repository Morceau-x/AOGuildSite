# AOGuildSite
Website for an Albion Online guild.
This project was created for the french guild 'Le Tonneau Sans Fond' (The bottomless Barrel).
It implements features and tools that could be useful for other guilds' websites.
The project will be imporved to be more modular over time and as such be easily reusable.

## Technologies
### BACK
- Django 2.2 (LTS) / will migrate when 3.2 (LTS) is out
- Python 3.6 (Ubuntu 18.04 LTS)
- PostgreSQL 10
- Meaningfull dependencies:
  - requests
  - django-cors-headers
  - python-dotenv
- Nginx: config files for deployment
- UWSGI: config files for deployment

### Front
- Typescript 
- Webpack 4.41+
- React 16.12+ (Fully implemented with hooks)
- Material-UI 4.9+ (For UI)
- Meaningfull dependencies:
  - Axios
  - Redux
  - Redux Sagas
  - es6
  - i18next (Internationalisation)

## Install
Go to your home on an Ubuntu 18.04.

Download the 'setup.sh' from the root of this repository.

Ensure you have something like this:
```bash
> pwd
/home/<user>/
> ls -a
. .. .bashrc setup.sh
```

Make 'setup.sh' executable:
```bash
> chmod 700 setup.sh
```

Create a '.env' file
```bash
> touch .env
> ls -a
. .. .bashrc .env setup.sh
```

On discord, create an application (that will be used for authentication) and a bot that has to join the targetted Discord guild for permissions management.

Fill the '.env' file with the following data:
```bash
CLIENT_ID='' # Discord client id
CLIENT_SECRET='' # Discord client secret
BOT_TOKEN='' # Discord bot token
GUILD_ID='' # Discord guild id
DJANGO_SECRET='' # Django secret
DB_NAME='' # How you want the database to be named
DB_USER='' # How you want the database user to be named
DB_PASSWORD='' # The database password (don't hesitate to use a password generator and create a very long one)
DB_HOST='' # The database server IP
DB_PORT='' # The database server port
DEBUG='' # Debug mode for django 'True', 'False' or '' ('' will set debug to False in production mode else True)
MODE='' # Starting mode for bakend 'production' or 'development'
DEV_USER= # Only set for development mode. The id (user_id) of the user to connect with in development mode.
# The files below are used in the nginx config file to setup HTTPS
BACKEND_CERT='' # HTTP, HTTPS or FTP link to the backend cert (for HTTPS)  
BACKEND_KEY='' # HTTP, HTTPS or FTP link to the backend key (for HTTPS)
CLOUDFLARE='' # HTTP, HTTPS or FTP link to the certification authority cert (for HTTPS)
FRONTEND_CERT='' # HTTP, HTTPS or FTP link to the frontend cert (for HTTPS)
FRONTEND_KEY='' # HTTP, HTTPS or FTP link to the frontend key (for HTTPS)
```

Launch 'setup.sh'
```bash
> ./setup.sh
...
...
...
```

This will clone the git repo, setup nginx, setup uwsgi, copy all files where needed, make all migrations and start the website.

## TODO
- Internationalisation
- Tests (front and back)
- Deploying locally
- Github Pipeline
- Highest priority features:
  - Events creation and management
  - Events calendar
  - ZvZ event type
  - Managing Albion players accounts
  - Managing builds (stuff) for events that require them
  - Managing Destiny Board
  - Permissions Administration
  - Guides about the game and the how the guild works
- Improvements:
  - Change color theme
  - Change landing page global design
  - Make landing page editable by admins
  

## Current main features
- Discord Authentication
- Landing page

## Changelog

### v0.1.0 (current)
The project is setup and has barely any features
- Setup scripts and files
- Discord Authentication
- NavBar
- Basic project with back and front
