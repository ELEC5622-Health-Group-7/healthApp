# -*- coding: utf-8 -*-
import datetime
from django.http import HttpResponse
from json import loads, dumps

from TestModel.models import Test
from TestModel.models import User,Exercise_monitor,Daily_tracker

 
# 数据库操作
def testdb(request):
    test1 = Test(name='runoob')
    test1.save()
    return HttpResponse("<p>数据添加成功！</p>")

# 数据库操作
def userdb(request):
    test1 = User(name='runoob', password='123')
    test1.save()
    return HttpResponse("<p>数据添加成功！</p>")

#login
def getuserdb(request):
     if request.method == 'GET' :
       list = User.objects.all()
       newlist=[]
       print(list)
       for user in list:
         dic = {}
         key2='uid'
         ivalue=user.id
         dic[key2] = ivalue
         key='uname'
         uvalue=user.name
         dic[key]=uvalue
         key1='upassword'
         kvalue=user.password
         dic[key1]=kvalue
         newlist.append(dic)
       jstr = dumps(newlist)
       return HttpResponse(jstr, content_type='application/json')

#register
def insertuserdb(request):
    if request.method == 'GET':
        Uname=request.GET.get('Uname')
        Upassword=request.GET.get('Upassword')
        Newuser= User(name=Uname, password=Upassword)
        Newuser.save()
        dic = {}
        key = 'message'
        value='success'
        dic[key] = value
        jstr = dumps(dic)
        return HttpResponse(jstr, content_type='application/json')

#register
def checkUsername(request):
    if request.method == 'GET':
        Uname=request.GET.get('Uname')
        Olduser=User.objects.filter(name=Uname)
        dic = {}
        if len(Olduser)==0  :
            key = 'message'
            value = 'yes'
        else:
            key = 'message'
            value = 'no'
        dic[key] = value
        jstr = dumps(dic)
        return HttpResponse(jstr, content_type='application/json')

#register
def getNewAccountdb(request):
    if request.method == 'GET':
        Uname=request.GET.get('Uname')
        Newuser=User.objects.filter(name=Uname)
        for user in Newuser:
            dic = {}
            key = 'uid'
            uvalue = user.id
            dic[key] = uvalue
        jstr = dumps(dic)
        return HttpResponse(jstr, content_type='application/json')

#exercise
def getExerciseData(request):
    if request.method == 'GET':
        user_id = request.GET.get('id')
        monitor_type=request.GET.get('type')
        infolist=Exercise_monitor.objects.filter(user_id=user_id,monitor_type=monitor_type)
        for info in infolist:
            dic = {}
            pkey = 'pulse'
            pvalue = info.pulse
            dic[pkey] = pvalue
            dkey = 'diastolic'
            dvalue=info.diastolic
            dic[dkey] = dvalue
            skey='systolic'
            svalue=info.systolic
            dic[skey] = svalue
        jstr = dumps(dic)
        return HttpResponse(jstr, content_type='application/json')

#daily tracker
def getTrackerData(request):
    if request.method == 'GET':
        user_id = request.GET.get('id')
        infolist=Daily_tracker.objects.filter(user_id=user_id).order_by("time")
        datalist = []
        i=0
        for info in infolist:
            dic = {}
            tkey='time'
            tvalue=info.time.strftime('%Y-%m-%d')
            dic[tkey] = tvalue
            pkey = 'pulse'
            pvalue = info.pulse
            dic[pkey] = pvalue
            dkey = 'diastolic'
            dvalue=info.diastolic
            dic[dkey] = dvalue
            skey='systolic'
            svalue=info.systolic
            dic[skey] = svalue
            datalist.append(dic)
            i=i+1
            if i==8 :
                break
        jstr = dumps(datalist)
        return HttpResponse(jstr, content_type='application/json')