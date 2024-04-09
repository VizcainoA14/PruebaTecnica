from .googleapp import Create_Service
import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


CLIENT_SECRET_FILE = 'Empledo/credentials.json'
API_NAME = 'gmail'
API_VERSION = 'v1'
SCOPES = ['https://mail.google.com/']

service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)


class SendMail():
    def __init__(self, to, nombre, cargo):
        self.to = to
        self.subject = "Bienvenido a la empresa"
        self.body = self.create_body(nombre, cargo)
        self.send_email()

    def create_body(self, nombre, cargo):
        return f"Hola {nombre},\n\nNos complace darte la bienvenida a nuestro equipo como {cargo}.\n\nEsperamos trabajar contigo.\n\nSaludos,\n\nEquipo de la empresa"

    def send_email(self):
        emailMsg = MIMEMultipart()
        emailMsg['to'] = self.to
        emailMsg['subject'] = self.subject

        emailMsg.attach(MIMEText(self.body, 'plain'))

        raw_string = base64.urlsafe_b64encode(emailMsg.as_bytes()).decode()

        message = service.users().messages().send(
            userId='me',
            body={
                'raw': raw_string
            }
        ).execute()

        print(message)



