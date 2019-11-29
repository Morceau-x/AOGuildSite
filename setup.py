import os
from typing import List

from dotenv import load_dotenv

load_dotenv()

commands: List[str] = ['mkdir /home/ubuntu/AOGuildSite/certs/',
                       'wget {0} -O /home/ubuntu/AOGuildSite/certs/backend_cert.pem'.format(os.getenv('BACKEND_CERT')),
                       'wget {0} -O /home/ubuntu/AOGuildSite/certs/backend_key.pem'.format(os.getenv('BACKEND_KEY')),
                       'wget {0} -O /home/ubuntu/AOGuildSite/certs/cloudflare.crt'.format(os.getenv('CLOUDFLARE')),
                       'wget {0} -O /home/ubuntu/AOGuildSite/certs/frontend_cert.pem'.format(os.getenv('FRONTEND_CERT')),
                       'wget {0} -O /home/ubuntu/AOGuildSite/certs/frontend_key.pem'.format(os.getenv('FRONTEND_KEY')),
                       ]

os.system(';'.join(commands))
