from django.conf.urls import *
from . import view,testdb
 
urlpatterns = [
    url(r'^hello$', view.hello),
    url(r'^calendar$', view.calendar),
    url(r'^testdb$', testdb.testdb),
]