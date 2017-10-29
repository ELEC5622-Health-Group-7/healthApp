import os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "HelloWorld.settings")
django.setup()
import unittest
from login import login

class TestLoginFunc(unittest.TestCase):
    def test_login(self):
        d=login()
        str=d.getuserdb()
        print (str)

if __name__ == '__main__':
    unittest.main()