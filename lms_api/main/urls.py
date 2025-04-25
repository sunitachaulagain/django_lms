
from django.urls import path
from . import views

urlpatterns = [
    path('teacher/', views.TeacherList.as_view(), name='teacher-list'),
    path('teacher/<int:pk>/', views.TeacherDetail.as_view(), name='teacher-detail'),
]
