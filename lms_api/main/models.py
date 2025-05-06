from django.db import models
from django.core.validators import RegexValidator

# Teacher Model
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)  # Ensure email uniqueness
    password = models.CharField(max_length=100)  # You should hash the password, ideally
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=15, validators=[RegexValidator(r'^\+?1?\d{9,15}$')])  # Validator for mobile
    skills = models.TextField()

    class Meta:
        verbose_name_plural = "1. Teachers"

    def __str__(self):
        return self.full_name

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
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    description = models.TextField()
    featured_img = models.ImageField(upload_to='course_imgs/', null=True)
    techs = models.TextField(null=True)  # You could also use a ManyToManyField for technologies if they are a separate model

    class Meta:
        verbose_name_plural = "3. Courses"
        
        
# Chapter Model
class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to='chapter_videos/', null=True)
    remarks = models.TextField(null=True)  # You could also use a ManyToManyField for technologies if they are a separate model

    class Meta:
        verbose_name_plural = "4. Chapters"        

# Student Model
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)  # Ensure email uniqueness
    password = models.CharField(max_length=100)  # Same here, password should be hashed
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=15, validators=[RegexValidator(r'^\+?1?\d{9,15}$')])  # Adding a phone number validator
    address = models.TextField()
    intrested_categories = models.TextField()

    class Meta:
        verbose_name_plural = "4. Students"
