from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model, authenticate
from .serializers import ChangeEmailSerializer, ChangePasswordSerializer

# from django.contrib.auth import get_user_model
User = get_user_model()


def get_user_from_token(request):
    """ for testing """
    # print(request.META)

    # get user from the token
    # take the 2nd element from the array with .split('')[1]
    tokenKey = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
    # query:  from the token model, get the token that matches with the key of a user's token
    token = Token.objects.get(key=tokenKey)
    # query:  from the user model, get the user that matches with the token's user id
    user = User.objects.get(id=token.user_id)
    return user


class FileUploadView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        return Response({"test": True}, status=HTTP_200_OK)


class UserEmailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        # get the user
        user = get_user_from_token(request)
        # get the email
        obj = {'email': user.email}

        return Response(obj)


class ChangeEmailView(APIView):
    """ can only post to this view if authenticated """
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        # grab user from request
        user = get_user_from_token(request)
        # user serializer to validate email change
        email_serializer = ChangeEmailSerializer(data=request.data)
        if email_serializer.is_valid():
            # get the data from serializer
            email = email_serializer.data.get('email')
            confirm_email = email_serializer.data.get('confirm_email')
            # save the email to the user
            if email == confirm_email:
                user.email = email
                user.save()
                return Response({'email': email}, status=HTTP_200_OK)
            # else
            return Response({'message': 'The emails DID NOT match'}, status=HTTP_400_BAD_REQUEST)
        # else, if serializer not valid
        return Response({'message': 'Incorrect data received'}, status=HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    """ can only post to this view if authenticated """
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        # grab user from request
        user = get_user_from_token(request)
        # user serializer to validate password change
        password_serializer = ChangePasswordSerializer(data=request.data)
        if password_serializer.is_valid():
            # get the data from serializer
            password = password_serializer.data.get('password')
            confirm_password = password_serializer.data.get('confirm_password')
            current_password = password_serializer.data.get('current_password')

            """ authenticates the user """
            auth_user = authenticate(
                username=user.username,
                password=current_password
            )

            """ check if valid authentication """
            if auth_user is not None:
                if password == confirm_password:
                    # set the password
                    # set_password is a method from the authenticated user object (auth_user)
                    auth_user.set_password(password)
                    # save the password
                    auth_user.save()
                    return Response(status=HTTP_200_OK)
                else:
                    return Response({'message': 'The passwords DID NOT match'}, status=HTTP_400_BAD_REQUEST)
            # else, if serializer not valid
            return Response({'message': 'Incorrect user details received'}, status=HTTP_400_BAD_REQUEST)
        return Response({'message': 'Incorrect data received'}, status=HTTP_400_BAD_REQUEST)


class UserDetailsView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        # grab user from request
        user = get_user_from_token(request)
        obj = {
            'membershipType': 'free_trial'
        }
        return Response(obj)


class SubscribeView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        # grab user from request
        user = get_user_from_token(request)
        # update user membership
        return Response({
            'test': True
        })
