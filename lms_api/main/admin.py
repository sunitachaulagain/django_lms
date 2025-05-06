from django.contrib import admin
from . import models

admin.site.register(models.Teacher)
admin.site.register(models.CourseCategory)
admin.site.register(models.Course)
admin.site.register(models.Student)
admin .site.register(models.Chapter)

# Register your models here.
