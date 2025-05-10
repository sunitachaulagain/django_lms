from rest_framework import serializers, generics
from . import models
from .models import Chapter  


# Teacher serializer
class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = models.Teacher
        fields = ['id','full_name', 'email', 'password', 'qualification', 'mobile_no', 'skills']

# Category serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ['id', 'title', 'description']

# Course serializer
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = [
            'id',
            'category',          # accepts category ID during POST
            'teacher',           # accepts teacher ID during POST
            'title',
            'description',
            'featured_img',
            'techs',

        ]
        
class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = [
            'id',
            'course',           # accepts course ID during POST
            'title',
            'description',
            'video',
            'remarks',
        ]        



