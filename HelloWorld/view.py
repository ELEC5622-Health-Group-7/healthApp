# -*- coding: utf-8 -*-
 
#from django.http import HttpResponse
from django.shortcuts import render
 
def hello(request):
    context          = {}
    context['hello'] = 'Hello World!'
    return render(request, 'hello.html', context)

def monitor_heart(request):
    context          = {}
    return render(request, 'monitor_heart.jsp', context)

def monitor_blood(request):
    context          = {}
    return render(request, 'monitor_blood.jsp', context)

def tracker_heart(request):
    context          = {}
    return render(request, 'tracker_heart.jsp', context)

def tracker_blood(request):
    context          = {}
    return render(request, 'tracker_blood.jsp', context)

def login(request):
    context          = {}
    return render(request, 'login.html', context)

def register(request):
    context = {}
    return render(request, 'register.html', context)

def chooseFunction(request):
    context = {}
    return render(request, 'chooseFunction.html', context)