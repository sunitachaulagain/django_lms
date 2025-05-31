from django.urls import path
from . import views
from .views import TeacherList, TeacherDetail, ChapterListByCourse, ChapterDetailView, CourseDetailView, EnrolledStudentList, RecommendedCourses, StudentFavoriteCourseList, EnrolledStudentsByTeacherView, UpdateAssignmentList  # Import TeacherList and TeacherDetail from views

urlpatterns = [
    
    # Teacher URLs
    path('teacher/', views.TeacherList.as_view()),  
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()),
    path('teacher-login/', views.teacher_login),
    path('teacher/dashboard/<int:pk>/', views.teacher_dashboard),
    path('teacher-change-password/<int:teacher_id>/',views.teacher_change_password),
    # Category URLs
    path('category/', views.CategoryList.as_view()),
    
    # Course URLs
    path('course/', views.CourseList.as_view()), 
    
    
    #course detail
    path('course/<int:pk>/', views.CourseDetailView.as_view()),
    
    
    #Teacher courses 
    path('teacher-courses/<int:teacher_id>', views.TeacherCourseList.as_view()), 
    
    #Teacher detail
    #path('teacher-detail/<int:teacher_id>', views.)
    
    
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
    path('student-enroll-course/', views.StudentEnrollCourseList.as_view(), name='student-enroll-course'),
    
    path('student-enroll-status/<int:student_id>/<int:course_id>/', views.fetch_enroll_status),
    
    path('fetch-enrolled-students/<int:course_id>/', views.EnrolledStudentList.as_view()),
    
    #course rating
    path('course-rating/', views.CourseRatingList.as_view()),

    path('course-rating/<int:course_id>/', views.CourseRatingList.as_view()),
    
    path('fetch-rating-status/<int:student_id>/<int:course_id>/', views.fetch_rating_status),


    #fetch enrolled course
    path('fetch-enrolled-courses/<int:student_id>/', EnrolledStudentList.as_view()),

    #fetch enrolled course according to teacher
    path('fetch-all-enrolled-students/<int:teacher_id>/', EnrolledStudentsByTeacherView.as_view(), name='fetch-all-enrolled-students'),


    #fetch recommended courses
    path('recommended-courses/<int:student_id>/', RecommendedCourses.as_view()),


    #favorite courses
    path('student-add-favorite-course/', views.StudentFavoriteCourseList.as_view()),
    path('student-remove-favorite-course/<int:course_id>/<int:student_id>/', views.remove_favorite_course),
    path('fetch-favorite-status/<int:student_id>/<int:course_id>/', views.fetch_favorite_status),


    #fetch favorite course
    path('fetch-favorite-courses/<int:student_id>/', StudentFavoriteCourseList.as_view()),
    
    
    #Assignments URLs teacher
    path('student-assignment/<int:teacher_id>/<int:student_id>/', views.StudentAssignmentList.as_view()), 

    # Assignment URLs student
    path('my-assignments/<int:studentId>/', views.MyAssignmentList.as_view()),

    path('update-assignments/<int:pk>/', views.UpdateAssignmentList.as_view(), name='update-assignment'),

]