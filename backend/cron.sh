#!/bin/bash
source .bashrc
workon AOGS
cd /home/ubuntu/AOGuildSite/backend
python manage.py clearsessions
ret=$?
deactivate
exit $?
