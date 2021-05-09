from django.shortcuts import render
from rest_framework import viewsets
from .models import Customer
from .serializers import CustomerSerializer
from rest_framework import permissions



# Create your views here.
class CustomerView(viewsets.ModelViewSet):
    # permission_classes = [permissions.AllowAny]
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

   
