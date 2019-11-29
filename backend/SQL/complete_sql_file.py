import os
from typing import List

from dotenv import load_dotenv

load_dotenv()

dir: str = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(dir, 'aogs_setup.sql'), 'r+') as file:
    text: str = ''.join(file.readlines())
    text = text.replace('<POSTGRESQL-DB-NAME>', os.getenv('DB_NAME'))
    text = text.replace('<POSTGRESQL-USER>', os.getenv('DB_USER'))
    text = text.replace('<POSTGRESQL-PWD>', os.getenv('DB_PASSWORD'))
    file.truncate(0)
    file.seek(0)
    file.write(text)
