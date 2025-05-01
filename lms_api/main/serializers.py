from rest_framework import serializers
from . import models
from .models import Teacher


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        #fields = ['id', 'full_name', 'email', 'password', 'qualification', 'mobile_no', 'skills']
        fields = '__all__'
