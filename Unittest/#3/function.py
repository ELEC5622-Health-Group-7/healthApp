from django.http import HttpResponse
from json import loads, dumps
from TestModel.models import User,Exercise_monitor,Daily_tracker

#exercise
def getExerciseData():

        user_id = 16
        monitor_type=1
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
        print (jstr)

#daily tracker
def getTrackerData():

        user_id = 16
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
        print (jstr)