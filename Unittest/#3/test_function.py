#import os, django
#os.environ.setdefault("DJANGO_SETTINGS_MODULE", "HelloWorld.settings")
#django.setup()
import unittest
from function import *

class TestFunctionFunc(unittest.TestCase):
    def test_getExerciseData(self):
        str=getExerciseData()
        print (str)

    def test_getTrackerData(self):
        str=getTrackerData()
        print (str)

if __name__ == '__main__':
    unittest.main()