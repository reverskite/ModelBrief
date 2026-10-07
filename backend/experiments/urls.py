from django.urls import path
from .views import health, sample_experiments

urlpatterns = [
    path("health/", health, name="health"),
    path("sample/", sample_experiments, name="sample-experiments"),
]
