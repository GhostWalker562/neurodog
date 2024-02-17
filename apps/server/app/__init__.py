from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={"/ai/*": {"origins": "*", "allow_headers": "Content-Type"}})

from app.openai import *
