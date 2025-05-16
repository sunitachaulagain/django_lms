from django.urls import path
from . import views
from .views import TeacherList, TeacherDetail, ChapterListByCourse, ChapterDetailView  # Import TeacherList and TeacherDetail from views

urlpatterns = [
    
    # Teacher URLs
    path('teacher/', views.TeacherList.as_view()),  
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()),
    path('teacher-login/', views.teacher_login),
    
    # Category URLs
    path('category/', views.CategoryList.as_view()),
    
    # Course URLs
    path('course/', views.CourseList.as_view()), 
    
    
    #course detail
    path('course/<int:pk>/', views.CourseDetail.as_view()),
    
    
    #Teacher courses 
    path('teacher-courses/<int:teacher_id>', views.TeacherCourseList.as_view()), 
    
    
    #chapter URLs
    path('chapter/', views.ChapterList.as_view(), name='chapter-list'),
    path('course-chapters/<int:course_id>/', views.ChapterListByCourse.as_view(), name='course-chapters'),
    path('chapter/<int:pk>/', ChapterDetailView.as_view(), name='chapter-detail'),

    #course detail
    path('teacher-course-detail/<int:pk>/', views.TeacherCourseDetail.as_view(), name='teacher-course-detail'),

    #student urls
    path('student/', views.StudentList.as_view(), name='student-list'),
    path('student-login/', views.student_login, name='student-login'),

    #student course enrollment
    path('student-enroll-course/', views.StudentEnrollCourseList.as_view(), ),
    
    path('student-enroll-status/<int:student_id>/<int:course_id>/', views.fetch_enroll_status),
]