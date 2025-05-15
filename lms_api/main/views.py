from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, permissions 
from rest_framework.generics import RetrieveUpdateDestroyAPIView

from django.contrib.auth.hashers import check_password
from .serializers import TeacherSerializer, CategorySerializer, CourseSerializer, ChapterSerializer
from . import models

#student serializer
from .serializers import StudentSerializer


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

#correct the IndentationError here
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
class CourseDetail(generics.RetrieveAPIView):
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
    