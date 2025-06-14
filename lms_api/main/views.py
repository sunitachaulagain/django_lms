from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, permissions 
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from django.utils.decorators import method_decorator
from . import models
from django.views.decorators.http import require_http_methods
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods  # ← Add this
from django.db.models import Q
from rest_framework import status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404




from django.contrib.auth.hashers import check_password

#Teacher serializer
from .serializers import TeacherSerializer, CategorySerializer, CourseSerializer, ChapterSerializer, TeacherDashboardSerializer

#student serializer
from .serializers import StudentSerializer, StudentCourseEnrollSerializer, CourseRatingSerializer, StudentFavoriteCoursesSerializer, StudentAssignmentSerializer, StudentDashboardSerializer


# -----------------------------
# Teacher Views
# -----------------------------
class TeacherList(generics.ListCreateAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    # Add authentication if needed


class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Teacher.objects.all()
    serializer_class = TeacherSerializer
    
@api_view(['GET'])
def teacher_dashboard(request, pk):
    try:
        teacher = models.Teacher.objects.get(id=pk)
        serializer = TeacherDashboardSerializer(teacher)
        return Response(serializer.data)
    except models.Teacher.DoesNotExist:
        return Response({'error': 'Teacher not found'}, status=404)
      

@csrf_exempt
def teacher_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        try:
            teacher = models.Teacher.objects.get(email=email)
            if teacher.password == password:
                return JsonResponse({'bool': True, 'teacher_id': teacher.id})
            else:
                return JsonResponse({'bool': False, 'error': 'password'})
        except models.Teacher.DoesNotExist:
            return JsonResponse({'bool': False, 'error': 'email'})
    return JsonResponse({'bool': False, 'error': 'invalid'})

# -----------------------------
# Category Views
# -----------------------------
class CategoryList(generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CategorySerializer


# -----------------------------
# Course Views
class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        result = self.request.GET.get('result')
        if 'result' in self.request.GET:
            qs=models.Course.objects.all().order_by('-id')[:4]
        return qs
    
    def get_queryset(self):
        queryset = models.Course.objects.all()
        result = self.request.GET.get('result')
        category = self.request.GET.get('category')
        skill = self.request.GET.get('skill')
        teacher_id = self.request.GET.get('teacher')

        if result:
            queryset = queryset.order_by('-id')[:4]

        if category:
            queryset = queryset.filter(category__title__iexact=category)

        if skill and teacher_id:
            queryset = queryset.filter(techs__icontains=skill, teacher_id=teacher_id)
        elif skill:
            queryset = queryset.filter(techs__icontains=skill)
        elif teacher_id:
            queryset = queryset.filter(teacher_id=teacher_id)

        return queryset
  

#course detail
class CourseDetailView(generics.RetrieveAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer    
    
 # Teacher courses   
class TeacherCourseList(generics.ListAPIView):
    serializer_class = CourseSerializer
    
    
    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)

#----------------------------------
#specific course by id    
class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Course.objects.all()
    serializer_class = CourseSerializer
    




# Chapter Views
class ChapterList(generics.ListCreateAPIView):
    queryset = models.Chapter.objects.all()  # ✅ Corrected: use Course, not CourseCategory
    serializer_class = ChapterSerializer
    
    

class ChapterListByCourse(generics.ListAPIView):
    serializer_class = ChapterSerializer

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        return models.Chapter.objects.filter(course_id=course_id)    
    
    


class ChapterDetailView(RetrieveUpdateDestroyAPIView):
    queryset = models.Chapter.objects.all()
    serializer_class = ChapterSerializer
    
    
    
# student views
class StudentList(generics.ListCreateAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    # Add authentication if needed 
    
    
       
#student login
@csrf_exempt
def student_login(request):
    if request.method == 'POST':
        print("POST data:", request.POST)  # Debug line
        email = request.POST.get('email')
        password = request.POST.get('password')

        if not email or not password:
            return JsonResponse({'bool': False, 'error': 'missing_fields'})

        try:
            student = models.Student.objects.get(email=email)
            if student.password == password:
                return JsonResponse({'bool': True, 'student_id': student.id})
            else:
                return JsonResponse({'bool': False, 'error': 'password'})
        except models.Student.DoesNotExist:
            return JsonResponse({'bool': False, 'error': 'email'})
    else:
        print("Invalid method:", request.method)  # Debug line

    return JsonResponse({'bool': False, 'error': 'invalid'})



@method_decorator(csrf_exempt, name='dispatch')
class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset = models.StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer
   
@csrf_exempt 
def fetch_enroll_status(request, student_id, course_id):
    try:
        student = models.Student.objects.get(id=student_id)
        course = models.Course.objects.get(id=course_id)
        enrolled = models.StudentCourseEnrollment.objects.filter(student=student, course=course).exists()
        return JsonResponse({'bool': enrolled})
    except models.Student.DoesNotExist:
        return JsonResponse({'bool': False, 'error': 'Student not found'})
    

@method_decorator(csrf_exempt, name='dispatch')
class EnrolledStudentList(generics.ListAPIView):
    serializer_class = StudentCourseEnrollSerializer
    
    def get_queryset(self):
        student_id = self.kwargs.get('student_id')
        course_id = self.kwargs.get('course_id')

        queryset = models.StudentCourseEnrollment.objects.all()

        if student_id:
            try:
                student = models.Student.objects.get(pk=student_id)
                queryset = queryset.filter(student=student)
            except models.Student.DoesNotExist:
                return models.StudentCourseEnrollment.objects.none()

        if course_id:
            queryset = queryset.filter(course_id=course_id)

        return queryset.distinct()

    
@method_decorator(csrf_exempt, name='dispatch')    
class CourseRatingList(generics.ListCreateAPIView):
    serializer_class = CourseRatingSerializer

    def get_queryset(self):
        course_id = self.kwargs.get('course_id')
        if course_id:
            return models.CourseRating.objects.filter(course__id=course_id)
        return models.CourseRating.objects.all()

def fetch_rating_status(request, student_id, course_id):
    try:
        rating_exists = models.CourseRating.objects.filter(student_id=student_id, course_id=course_id).exists()
        return JsonResponse({'bool': rating_exists})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)     




@csrf_exempt
@require_http_methods(["POST"])  # Only allow POST
def teacher_change_password(request, teacher_id):
    password = request.POST.get('password')  # Safe access

    if not password:
        return JsonResponse({'bool': False, 'error': 'Password is required'}, status=400)

    try:
        teacher = models.Teacher.objects.get(id=teacher_id)
    except models.Teacher.DoesNotExist:
        return JsonResponse({'bool': False, 'error': 'Teacher not found'}, status=404)

    teacher.password = password  # ⚠️ Insecure — consider hashing
    teacher.save()

    return JsonResponse({'bool': True, 'teacher_id': teacher.id})



from django.http import JsonResponse  # just for testing

from django.db.models import Q

@method_decorator(csrf_exempt, name='dispatch')
class RecommendedCourses(generics.ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        student_id = self.kwargs.get('student_id')

        try:
            student = models.Student.objects.get(pk=student_id)

            # Clean and split interested categories into a list of lowercase strings
            interest_list = [
                interest.strip().lower() 
                for interest in student.interested_categories.split(',') 
                if interest.strip()
            ]

            # Build a dynamic OR query to filter courses matching any tech in interests
            query = Q()
            for interest in interest_list:
                query |= Q(techs__icontains=interest)

            # Retrieve distinct courses matching the query
            courses = models.Course.objects.filter(query).distinct()

            # Debug print each matched course
            for course in courses:
                print(f"📘 Course: {course.title} | Techs: {course.techs}")

            return courses

        except models.Student.DoesNotExist:
            return models.Course.objects.none()
  
  

#student favorite courses
class StudentFavoriteCourseList(generics.ListCreateAPIView):
    queryset = models.StudentFavoriteCourses.objects.all()
    serializer_class = StudentFavoriteCoursesSerializer
    

    
    def get_queryset(self):
        student_id = self.kwargs.get('student_id')
        if student_id:
            return models.StudentFavoriteCourses.objects.filter(student__id=student_id).distinct()
        return models.StudentFavoriteCourses.objects.none()
    
def fetch_enroll_status(request, student_id, course_id):
    student = models.Student.objects.filter(id = student_id).first()
    course = models.Course.objects.filter(id = course_id).first()
    enroll_status = models.StudentCourseEnrollment.objects.filter(course=course,student=student).count()
    if enroll_status:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

def fetch_favorite_status(request, student_id, course_id):
    student = models.Student.objects.filter(id = student_id).first()
    course = models.Course.objects.filter(id = course_id).first()
    favorite_status = models.StudentFavoriteCourses.objects.filter(course=course,student=student).first()
    if favorite_status and favorite_status.status == True:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
@csrf_exempt        
def remove_favorite_course(request,course_id, student_id):
    student = models.Student.objects.filter(id = student_id).first()
    course = models.Course.objects.filter(id = course_id).first()
    favorite_status = models.StudentFavoriteCourses.objects.filter(course=course,student=student).delete()
    if favorite_status:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
    
# fetch enrolled courses according to teacher
class EnrolledStudentsByTeacherView(APIView):
    def get(self, request, teacher_id):
        students = models.Student.objects.filter(
            enrolled_students__course__teacher__id=teacher_id
        ).distinct()

        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# Assignments for teachers views
class StudentAssignmentList(generics.ListCreateAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer

    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        student_id = self.kwargs['student_id']

        return models.StudentAssignment.objects.filter(
            teacher_id=teacher_id,
            student_id=student_id
        )

    def perform_create(self, serializer):
        teacher_id = self.kwargs['teacher_id']
        student_id = self.kwargs['student_id']
        
        teacher = get_object_or_404(models.Teacher, id=teacher_id)
        student = get_object_or_404(models.Student, id=student_id)

        serializer.save(teacher=teacher, student=student)


# Student Assignment Detail View
class MyAssignmentList(generics.ListCreateAPIView):
    serializer_class = StudentAssignmentSerializer

    def get_queryset(self):
        student_id = self.kwargs['studentId']
        return models.StudentAssignment.objects.filter(student__id=student_id)

class UpdateAssignmentList(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    
    
# student dashboard
class StudentDashboard(generics.RetrieveAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentDashboardSerializer
    
    
#student detail  
class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Student.objects.all()
    serializer_class = StudentSerializer
    
    def get_object(self):
        student_id = self.kwargs.get('pk')
        return get_object_or_404(models.Student, id=student_id)  

 
# student change password
@csrf_exempt
@require_http_methods(["POST"])  # Only allow POST
def student_change_password(request, student_id):
    password = request.POST.get('password')  # Safe access

    if not password:
        return JsonResponse({'bool': False, 'error': 'Password is required'}, status=400)

    try:
        student = models.Student.objects.get(id=student_id)
    except models.Student.DoesNotExist:
        return JsonResponse({'bool': False, 'error': 'Student not found'}, status=404)

    student.password = password  # ⚠️ Insecure — consider hashing
    student.save()

    return JsonResponse({'bool': True, 'student_id': student.id})
 