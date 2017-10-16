# -*- coding: utf-8 -*-
 
#from django.http import HttpResponse
from django.shortcuts import render
 
def hello(request):
    context          = {}
    context['hello'] = 'Hello World!'
    return render(request, 'hello.html', context)

def calendar(request):
    context          = {}
    return render(request, 'calendar.html', context)

def login(request):
    context          = {}
    return render(request, 'login.html', context)

def register(request):
    context = {}
    return render(request, 'register.html', context)

def chooseFunction(request):
    context = {}
    return render(request, 'chooseFunction.html', context)