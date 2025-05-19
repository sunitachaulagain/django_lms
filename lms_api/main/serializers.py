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
# class CourseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Course
#         fields = [
#             'id',
#             'category',          # accepts category ID during POST
#             'teacher',           # accepts teacher ID during POST
#             'title',
#             'description',
#             'featured_img',
#             'techs',
#             'course_chapters',# This is the related name for the reverse relationship
#             'related_videos',   # This is a method, not a field   
#             'tech_list',         # This is a method, not a field
#             'total_enrolled_students'
#         ]
#         depth = 1
        
#     def get_related_videos(self, obj):
#         return obj.related_videos()
    
    

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseCategory
        fields = ['id', 'title', 'description']

# Course serializer
# class CourseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Course
#         fields = [
#             'id',
#             'category',          # accepts category ID during POST
#             'teacher',           # accepts teacher ID during POST
#             'title',
#             'description',
#             'featured_img',
#             'techs',
#             'course_chapters',# This is the related name for the reverse relationship
#             'related_videos',   # This is a method, not a field   
#             'tech_list',         # This is a method, not a field
#             'total_enrolled_students'
#         ]
#         depth = 1
        
#     def get_related_videos(self, obj):
#         return obj.related_videos()

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
    
class CourseSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=models.CourseCategory.objects.all(), write_only=True)
    teacher = serializers.PrimaryKeyRelatedField(queryset=models.Teacher.objects.all(), write_only=True)

    category_detail = serializers.SerializerMethodField(read_only=True)
    teacher_detail = serializers.SerializerMethodField(read_only=True)
    total_enrolled_students = serializers.SerializerMethodField(read_only=True)

    course_chapters = ChapterSerializer(many=True, read_only=True)

    class Meta:
        model = models.Course
        fields = [
            'id',
            'category',
            'category_detail',     # added
            'teacher',
            'teacher_detail',      # added
            'title',
            'description',
            'featured_img',
            'techs',
            'course_chapters',
            'related_videos',
            'tech_list',
            'total_enrolled_students',
            'course_rating',
        ]
    
    def get_category_detail(self, obj):
        return {
            "id": obj.category.id,
            "title": obj.category.title,
            "description": obj.category.description
        }

    def get_teacher_detail(self, obj):
        return {
            "id": obj.teacher.id,
            "full_name": obj.teacher.full_name
        }

    def get_related_videos(self, obj):
        return obj.related_videos()
    
    def get_total_enrolled_students(self, obj):
        return obj.enrolled_courses.count()

    
    
    
        
       



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
 
class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentCourseEnrollment
        fields = [
            'id',
            'student',
            'course', 
            'enrolled_time',
        ]
        
    def __init__(self,*args,**kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
             self.Meta.depth = 1   
        
        
        
class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseRating
        fields = ['id', 'course', 'student', 'rating', 'review', 'review_time'] 
        
    def __init__(self,*args,**kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
             self.Meta.depth = 1   
        
               
        