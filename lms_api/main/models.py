
from django.db import models
from django.core.validators import RegexValidator
from django.core import serializers

# Teacher Model
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    detail = models.TextField(null=True)
    email = models.EmailField(unique=True)  # Ensure email uniqueness
    password = models.CharField(max_length=100, blank=True, null=True)  # You should hash the password, ideally
    qualification = models.CharField(max_length=200)
    mobile_no = models.CharField(max_length=10, validators=[RegexValidator(r'^\+?1?\d{9,15}$')])  # Validator for mobile
    profile_img = models.ImageField(upload_to='teacher_profile_imgs/', null=True)
    skills = models.TextField()

    class Meta:
        verbose_name_plural = "1. Teachers"

    def __str__(self):
        return self.full_name
    
    def skill_list(self):
        skill_list = self.skills.split(',')
        return skill_list  
    
    def total_teacher_courses(self):
        total_courses = Course.objects.filter(teacher=self).count()
        return total_courses
    
    def total_teacher_chapters(self):
        from main.models import Chapter  # if needed
        return Chapter.objects.filter(course__teacher=self).count()

    def total_teacher_students(self):
        from main.models import StudentCourseEnrollment
        return StudentCourseEnrollment.objects.filter(course__teacher=self).count()


    
    

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
    
    # def course_rating(self):
    #     course_rating = CourseRating.objects.filter(course=self).aggregate(models.Avg('rating'))
    #     return course_rating
    
    def course_rating(self):
        course_rating = CourseRating.objects.filter(course=self).aggregate(avg=models.Avg('rating'))
        return course_rating['avg']

    
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
        verbose_name_plural = "5. Students"
        
    def __str__(self):
        return self.full_name
    
    #total enrolled courses
    def enrolled_courses(self): 
        enrolled_courses = StudentCourseEnrollment.objects.filter(student=self).count()
        return enrolled_courses 
     
    #total favorite courses
    def favorite_courses(self):
        favorite_courses = StudentFavoriteCourses.objects.filter(student=self).count()
        if favorite_courses > 0:
            return favorite_courses
        else:
            return 0
    
    #completed Assignments
    def completed_assignments(self):
        completed_assignments = StudentAssignment.objects.filter(student=self, student_status=True).count()
        if completed_assignments > 0:
            return completed_assignments
        else:
            return 0
    
    #pending Assignments  
    def pending_assignments(self): 
        pending_assignments = StudentAssignment.objects.filter(student=self, student_status=False).count()
        if pending_assignments > 0:
            return pending_assignments
        else:
            return 0    
        
#student course enrollment
class StudentCourseEnrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrolled_courses')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrolled_students')
    enrolled_time = models.DateTimeField(auto_now_add=True)
   
    class Meta:
        verbose_name_plural = "6. Enrolled Courses"
        
    def __str__(self):
        return f"{self.student} enrolled in {self.course}"
    
# course rating and review    
class CourseRating(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE,)
    student = models.ForeignKey(Student, on_delete=models.CASCADE,)
    rating = models.PositiveBigIntegerField(default=0)
    review = models.TextField(null=True)
    review_time = models.DateTimeField(auto_now_add=True)
    
    
    class Meta:
        verbose_name_plural = "7. Course Rating"
        
    def __str__(self):
        return f"{self.course} - {self.student} - {self.rating}"
    
    
#favorite courses
class StudentFavoriteCourses(models.Model):
    course = models.ForeignKey(Course,on_delete=models.CASCADE)  
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)
    
    class Meta:
        verbose_name_plural = "8. Student Favorite Courses"
        
    
    def __str__(self):
        return f"{self.course}- {self.student}"     
    
    
# student  assignment
class StudentAssignment(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200)
    detail = models.TextField(null=True, blank=True)
    student_status = models.BooleanField(default=False, null=True)  # True if assignment is submitted
    submission_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "9. Student Assignments"

    def __str__(self):
        return f"{self.title}"