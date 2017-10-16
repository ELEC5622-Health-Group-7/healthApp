from django.conf.urls import *
from . import view,testdb
 
urlpatterns = [
    url(r'^hello$', view.hello),
    url(r'^calendar$', view.calendar),
    url(r'^login$', view.login),
    url(r'^register$', view.register),
    url(r'^chooseFunction$', view.chooseFunction),
    url(r'^testdb$', testdb.testdb),
    #url(r'^trydb$', trydb.trydb),
    url(r'^userdb$', testdb.userdb),
    url(r'^getuserdb$', testdb.getuserdb),
    url(r'^insertuserdb$', testdb.insertuserdb),
    url(r'^getNewAccountdb$', testdb.getNewAccountdb),
    url(r'^checkUsername$', testdb.checkUsername)
]