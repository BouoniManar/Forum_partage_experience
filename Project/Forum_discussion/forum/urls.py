from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from django.urls import path
from .views import register, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('api/register/', register, name='register'),
    #path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/login/', CustomTokenObtainPairView.as_view(), name='login'),  # Login endpoint

    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # autres.......
]










""" # forum/urls.py


from django.urls import path
from .views import UserCreateView, CustomTokenObtainPairView, CustomTokenRefreshView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
]
 """