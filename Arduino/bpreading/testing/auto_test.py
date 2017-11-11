import time
import getpass
import MySQLdb
from read_serial import read_serial
from write_file import write_file
from search import db_search
from exercise_monitor_db import db_execute_exer, read_file_exer, exercise_monitor_db
from daily_tracker_db import db_execute_dai, read_file_dai, daily_tracker_db

#all user needed test is built on a virtual user 1, whose password is also 1

#exercise_monitor_db testing

if(exercise_monitor_db('test_data_exer.txt')):
    print('data has been tranmiteed into database!')
    print('exercise_monitor_db successful!')
else:
    print('data transimission failed !')
    print('exercise_monitor_db failed !')


#daily_tracker_db testing

if(daily_tracker_db('test_data_dai.txt')):
    print('data has been tranmiteed into database!')
    print('daily_tracker_db successful!')
else:
    print('data transimission failed !')
    print('daily_tracker_db failed !')

#db_search registered user testing
if((db_search('1','1')==('1','1'))):
    print('db_search registered user testing successful!')
else:
    print('db_search registered user testing failed !')

#db_search registered user with wrong password testing
if(db_search('1','2')==('0','0')):
    print('db_search wrong password testing successful!')
else:
    print('db_search wrong password testing failed !')

#db_search none registered user testing
if(db_search('test_none','1')==('0','0')):
    print('db_search none registered user testing successful!')
else:
    print('db_search none registered user testing failed !')

#write_file testing function_type = 1
write_file('test_data_wirte_1.txt', '1', '1', '1 2 3', 0)
with file('test_data_wirte_1.txt', 'r') as f:
    data = f.readlines()
    if(data=='1 1 1 2 3'):
        print('write_file testing function_type = 1 testing successful!')
    else:
        print('write_file testing function_type = 1 testing failed!')

#write_file testing function_type = 2
write_file('test_data_wirte_2.txt', '1', '2', '4 5 6', 0)
with file('test_data_wirte_2.txt', 'r') as f:
    data = f.readlines()
    if(data=='1 2 4 5 6'):
        print('write_file testing function_type = 2 testing successful!')
    else:
        print('write_file testing function_type = 2 testing failed!')

#write_file testing function_type = 0
date = time.strftime('%Y-%m-%d', time.localtime())
write_file('test_data_wirte_0.txt', '1', 0, '7 8 9', date)
with file('test_data_wirte_2.txt', 'r') as f:
    data = f.readlines()
    if(data==('1', str(date), '4 5 6')):
        if (data == ('1', str(date), '4 5 6')):
            print('write_file testing function_type = 0 testing successful!')
        else:
            print('write_file testing function_type = 0 testing failed!')


#read_serial testing(partly manual)
data_to_write_test = read_serial()
if data_to_write_test:
    print data_to_write_test
    print('read_serial() testing successful!')
else:
    print('read_serial() testing failed!')

#main function testing is totally manual