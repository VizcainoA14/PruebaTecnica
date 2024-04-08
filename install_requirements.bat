@echo off
python -m venv .venv
call .venv\Scripts\activate
pip install -r requirements.txt
pip uninstall -y pyjwt PyJWT jwt
pip install pyjwt