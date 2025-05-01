from django.urls import path
from .views import TeacherList, TeacherDetail  # Import TeacherList and TeacherDetail from views

urlpatterns = [
    path('teacher/', TeacherList.as_view(), name='teacher-list'),  # Corrected this line
    path('teacher/<int:pk>/', TeacherDetail.as_view(), name='teacher-detail'),  # Added 'api/' to keep consistency
]
