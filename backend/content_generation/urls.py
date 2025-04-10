from django.urls import path
from .views import generate_content, generate_questions

urlpatterns = [
    path('generate-content/', generate_content, name='generate_content'),
    path('generate-questions/', generate_questions, name='generate_questions'),
]