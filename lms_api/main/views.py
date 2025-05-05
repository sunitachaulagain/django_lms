from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, permissions
from django.contrib.auth.hashers import check_password
from .serializers import TeacherSerializer, CategorySerializer, CourseSerializer
from . import models


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


@csrf_exempt
def teacher_login(request):
        email = request.POST.get('email')
        password = request.POST.get('password')
        teacherData = models.Teacher.objects.get(email=email, password=password)
        if teacherData:
            return JsonResponse({'bool':True})
        else:
            return JsonResponse({'bool':False})   
# -----------------------------
# Category Views
# -----------------------------
class CategoryList(generics.ListCreateAPIView):
    queryset = models.CourseCategory.objects.all()
    serializer_class = CategorySerializer


# -----------------------------
# Course Views
class CourseList(generics.ListCreateAPIView):
    queryset = models.Course.objects.all()  # ✅ Corrected: use Course, not CourseCategory
    serializer_class = CourseSerializer

