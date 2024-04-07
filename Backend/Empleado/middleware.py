
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .utils import VerifyToken


class CustomTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        if request.path == '/swagger/':
            return None, None  # Return a tuple of two values
        
        authorization_header = request.META.get('HTTP_AUTHORIZATION')

        if not authorization_header:
            raise AuthenticationFailed('No Authorization header provided.')
        
        token = authorization_header

        verify_token = VerifyToken(token)
        verification_result = verify_token.verify()

        if verification_result.get('status') == 'error':
            raise AuthenticationFailed(verification_result.get('msg'))  # Raise an exception if the token is not valid

        return None, None  # Return a tuple of two values