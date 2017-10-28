from django.http import HttpResponse
from json import loads, dumps
from TestModel.models import User,Exercise_monitor,Daily_tracker
#login
class login():

  def getuserdb(self):
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
       return jstr