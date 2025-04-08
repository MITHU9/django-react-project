from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note  # Import the Note model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}} # Ensure password is write-only and not returned in responses

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)  # Create a new user instance
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'author', 'title', 'content', 'created_at']
        extra_kwargs = {
            'author': {'read_only': True},  # Ensure author is read-only and set automatically
        }
 
