from django.http import HttpResponse
from json import loads, dumps
from TestModel.models import User,Exercise_monitor,Daily_tracker

#register
def insertuserdb(a,b):

        Uname=a
        Upassword=b
        Newuser= User(name=Uname, password=Upassword)
        Newuser.save()
        dic = {}
        key = 'message'
        value='success'
        dic[key] = value
        jstr = dumps(dic)
        print (jstr)

#register
def checkUsername(a):
        Uname = a
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
        print (jstr)


#register
def getNewAccountdb(a):
        Uname =a
        Newuser=User.objects.filter(name=Uname)
        for user in Newuser:
            dic = {}
            key = 'uid'
            uvalue = user.id
            dic[key] = uvalue
        jstr = dumps(dic)
        print (jstr)