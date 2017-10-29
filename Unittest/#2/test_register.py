#import os, django
#os.environ.setdefault("DJANGO_SETTINGS_MODULE", "HelloWorld.settings")
#django.setup()
import unittest
from register import *

class TestRegisterFunc(unittest.TestCase):
    def test_insertuserdb(self):
        str=insertuserdb('test123','123456')
        print (str)

    def test_checkUsername(self):
        str=checkUsername('test123')
        print (str)

    def test_getNewAccountdb(self):
        str=insertuserdb('test123')
        print (str)

if __name__ == '__main__':
    unittest.main()