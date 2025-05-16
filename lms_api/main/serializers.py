from rest_framework import serializers, generics
from . import models
from .models import Chapter  


# Teacher serializer
class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = models.Teacher
        fields = [
            'id',
            'full_name',
            'detail', 
            'email',
            'password', 
            'qualification', 
            'mobile_no', 
            'skills', 
            'teacher_courses',
            'skill_list',  # This is a method, not a field
            ]
        depth = 1

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
            'course_chapters',# This is the related name for the reverse relationship
            'related_videos',   # This is a method, not a field   
            'tech_list',         # This is a method, not a field
        ]
        depth = 1
        
    def get_related_videos(self, obj):
        return obj.related_videos()
    
    
        
class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Chapter
        fields = '__all__'
        # fields = [
        #     'id',
        #     'course',           # accepts course ID during POST
        #     'title',
        #     'description',
        #     'video',
        #     'remarks',
        # ]        



#student serializer
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = [
            'id',
            'full_name',
            'email',
            'password',
            'username',
            'interested_categories',  # This is a method, not a field
        ]
 
