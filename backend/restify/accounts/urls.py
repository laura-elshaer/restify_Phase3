from django.urls import path
from . import views
app_name = "accounts"
from .views import user_list

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.Login.as_view(), name='token_obtain_pair'),
    path('update/<int:pk>/', views.UpdateProfileView.as_view(), name='auth_update_profile'),
    path('users/', user_list),
]