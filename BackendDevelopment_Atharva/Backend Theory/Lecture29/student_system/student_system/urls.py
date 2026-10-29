
from django.contrib import admin
from django.urls import path
from students import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', views.health_check, name='health-check'),
    path(
        'api/students/<int:student_id>/',
        views.student_detail,
        name='student-detail'
    ),
]
