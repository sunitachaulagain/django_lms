from django.db import models
from django.core.validators import RegexValidator
from django.core import serializers

# Teacher Model
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    detail = models.TextField(null=True)
    email = models.EmailField(unique=True)  # Ensure email uniqueness
    password = models.CharField(max_length=100)  # You should hash the password, ideally
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=15, validators=[RegexValidator(r'^\+?1?\d{9,15}$')])  # Validator for mobile
    skills = models.TextField()

    class Meta:
        verbose_name_plural = "1. Teachers"

    def __str__(self):
        return self.full_name
    
    def skill_list(self):
        skill_list = self.skills.split(',')
        return skill_list  
    
    

# CourseCategory Model
class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(default="No description available")

    class Meta:
        verbose_name_plural = "2. Course categories"

    def __str__(self):
        return self.title

# Course Model
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='teacher_courses')
    title = models.CharField(max_length=150)
    description = models.TextField()
    featured_img = models.ImageField(upload_to='course_imgs/', null=True)
    techs = models.TextField(null=True)  # You could also use a ManyToManyField for technologies if they are a separate model

    class Meta:
        verbose_name_plural = "3. Courses"
        
    def related_videos(self):
      related_videos = Course.objects.filter(techs__icontains=self.techs)
      return serializers.serialize('json', related_videos, fields=('id', 'title', 'featured_img'))
            
    def tech_list(self):
        tech_list = self.techs.split(',')
        return tech_list
    
    def total_enrolled_students(self):
        total_enrolled_students = StudentCourseEnrollment.objects.filter(course=self).count()
        return total_enrolled_students
    
    def __str__(self):
        return self.title  
    
# Chapter Model
class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_chapters')
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to='chapter_videos/', null=True)
    remarks = models.TextField(default='Remarks not available')  # You could also use a ManyToManyField for technologies if they are a separate model

    class Meta:
        verbose_name_plural = "4. Chapters"        

# Student Model
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)  # Ensure email uniqueness
    password = models.CharField(max_length=10)  # Same here, password should be hashed
    username = models.CharField(max_length=200)
    interested_categories = models.TextField()

    class Meta:
        verbose_name_plural = "4. Students"
        
#student course enrollment
class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrolled_courses')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrolled_students')
    enrolled_time = models.DateTimeField(auto_now_add=True)
   
    class Meta:
        verbose_name_plural = "5. Enrolled Courses"
        
    def __str__(self):
        return {self.course}, {self.student}
    