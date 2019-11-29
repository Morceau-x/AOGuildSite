
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${RED}Apt update and install${NC}"
sudo apt-get update
sudo apt-get install -y python3 python3-dev python3-pip nginx postgresql-10 postgresql-server-dev-10

echo -e "${RED}Pip upgrade and install${NC}"
sudo -H pip3 install --upgrade pip
sudo -H pip3 install virtualenv virtualenvwrapper uwsgi python-dotenv

echo -e "${RED}Setup .bashrc${NC}"
echo "export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3" >> ~/.bashrc
echo "export WORKON_HOME=~/Env" >> ~/.bashrc
echo "source /usr/local/bin/virtualenvwrapper.sh" >> ~/.bashrc
source ~/.bashrc

echo -e "${RED}Setup project${NC}"
mkvirtualenv AOGS
git clone https://github.com/Morceau-x/AOGuildSite.git ~/AOGuildSite/
pip install -r ~/AOGuildSite/backend/requirements.txt
deactivate

echo -e "${RED}Setting up UWSGI config${NC}"
sudo mkdir -p /etc/uwsgi/sites
sudo ln -s ~/AOGuildSite/backend/uwsgi/aogs_backend_uwsgi.ini /etc/uwsgi/sites/
sudo cp ~/AOGuildSite/backend/uwsgi/uwsgi.service /etc/systemd/system/

echo -e "${RED}Setting up NGINX config${NC}"
sudo ln -s ~/AOGuildSite/backend/nginx/backend /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/backend /etc/nginx/sites-enabled
sudo ln -s ~/AOGuildSite/frontend/nginx/frontend /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled

echo -e "\033[41mScript will stop working from here, need to get the .env file${NC}"

echo -e "${RED}Getting and Moving certificates in the right folders (need to get files then restart script)${NC}"
python3 ~/AOGuildSite/setup.py
sudo ln -s ~/AOGuildSite/certs/backend_cert.pem /etc/ssl/certs/
sudo ln -s ~/AOGuildSite/certs/backend_key.pem /etc/ssl/private/
sudo ln -s ~/AOGuildSite/certs/cloudflare.crt /etc/ssl/certs/
sudo ln -s ~/AOGuildSite/certs/frontend_cert.pem /etc/ssl/certs/
sudo ln -s ~/AOGuildSite/certs/frontend_key.pem /etc/ssl/private/

echo -e "${RED}Setting up postgres (need to get files then restart script)${NC}"
python3 ~/AOGuildSite/backend/SQL/complete_sql_file.py
dir="$(echo ~)"
sudo -H -u postgres bash -c "psql -f $dir/AOGuildSite/backend/SQL/aogs_setup.sql"
workon AOGS
python ~/AOGuildSite/backend/manage.py makemigrations
python ~/AOGuildSite/backend/manage.py migrate
python ~/AOGuildSite/backend/manage.py migrate --run-syncdb
deactivate

echo -e "${RED}Testing and launching nginx${NC}"
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

echo -e "${RED}launching uwsgi${NC}"
sudo systemctl start uwsgi
sudo systemctl enable uwsgi


