from django.urls import path
from . import views
from .views import TeacherList, TeacherDetail  # Import TeacherList and TeacherDetail from views

urlpatterns = [
    
    # Teacher URLs
    path('teacher/', views.TeacherList.as_view()),  
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()),
    path('teacher-login/', views.teacher_login),
    
    # Category URLs
    path('category/', views.CategoryList.as_view()),
    
    # Course URLs
    path('course/', views.CourseList.as_view()), 
]
