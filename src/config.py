import os
from dotenv import load_dotenv
from pathlib import Path  # python3 only

# load enviorment variables
env_path = '.env'
load_dotenv(dotenv_path=env_path)


class Config:
    """
    Set Flask configuration vars from .env file
    """

    # Load in environment variables
    LOG_FILE = os.getenv('LOG_FILE')
    LOG_FORMAT = os.getenv('LOG_FORMAT')
    FILE_DIRECTORY = os.getenv('FILE_DIRECTORY')
    FILE_FORMAT = os.getenv('FILE_FORMAT')
    OUTPUT = os.getenv('OUTPUT')

