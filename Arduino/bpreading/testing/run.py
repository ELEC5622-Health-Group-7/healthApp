import time
import getpass
import MySQLdb
from read_serial import read_serial
from write_file import write_file
from search import db_search
from exercise_monitor_db import db_execute_exer, read_file_exer, exercise_monitor_db
from daily_tracker_db import db_execute_dai, read_file_dai, daily_tracker_db

# variable for user authentication
user_name = ''
user_id = ''
user_psw = ''
# variable store chosen function by user
function_type = ''
monitor_type = ''
# for exercise monitor, 2 variables to store the data respectively
data_ex_pre = ''
data_ex_post = ''
# for daily monitor, 1 variable to store the data as "user_id,date,
data_daily = ''
# file path for pre and post exercise and daily tracking
file_path = 'data.txt'


print('\nWelcome to use our HEM system!')
while True:
    while True:
        auth_state =str(1)
       # user_id = 0
        status = 0
        user_name = raw_input('Please enter your user name: \n')
        #user_psw = raw_input('Please enter your password: \n')
        user_psw = getpass.getpass('Please enter your password: \n')
        print('Authentication ongoing... \nPlease wait. ')

        # Authentication
        user_name , user_id = db_search(user_name, str(user_psw))
        if (auth_state == '1'):
            print('\nUser ' + str(user_name) + ', welcome! \nYour user ID is: ' + str(user_id))
            break
        elif (auth_state == '0'):
            print('\nWrong account or password! \nPlease enter again. ')
        else:
            print('\nCannot connect to server. \nPlease try again. ')
    # after authentication
    while True:
        print('Enter \"0\" to switch to another user account. ')
        print('Enter \"1\" for Exercise Monitoring. ')
        print('Enter \"2\" for Daily Tracking. ')
        function_type = raw_input('Please choose a function: \n')
        if (function_type == '0'):
            print('\nYou chose to switch to another account. ')
            break
        elif (function_type == '1'):
            print('\nYou chose the Exercise Monitoring. ')
            while True:
                print('Enter \"0\" to go back. ')
                print('Enter \"1\" to measure before the exercise. ')
                print('Enter \"2\" to measure after the exercise. ')
                monitor_type = raw_input('Please enter: \n')
                if (monitor_type == '0'):
                    print('\nYou chose to go back. ')
                    break
                elif (monitor_type == '1'):
                    print('\nYou chose to measure before the exercise. \nInitialising... ')
                    # read the data from serial port
                    data_to_write = read_serial()
                    # write the data before exercise into file, set date to 0
                    write_file(file_path, user_id, monitor_type, data_to_write, 0)
                    print('Uploading... \n')
                    status = exercise_monitor_db(file_path)
                    if (status):
                        print('Upload is successful. \nPlease remember to measure again after exercise. ')
                    else:
                        raw_input('Upload failed. Press Enter to try again. \n')
                elif (monitor_type == '2'):
                    print('\nYou chose to measure after the exercise. \nInitialising... ')
                    # read the data from serial port
                    data_to_write = read_serial()
                    # write the data after exercise into file, set date to 0
                    write_file(file_path, user_id, monitor_type, data_to_write, 0)
                    print('Uploading... \n')
                    status = exercise_monitor_db(file_path)
                    if (status):
                        print('Upload is successful. Exercise monitoring is done. ')
                        print('You could login the website and check the results. ')
                        print('Or you could go back to track daily readings. ')
                    else:
                        raw_input('Upload failed. Press Enter to try again. \n')
                else:
                    print('\nUnrecognized command, please enter again. ')
        elif (function_type == '2'):
            print('\nYou chose the Daily Tracking. \nInitialising... ')
            # read the data from serial port
            data_to_write = read_serial()
            # write the daily tracking data exercise into file, set function_type to 0
            date = time.strftime('%Y-%m-%d', time.localtime())
            write_file(file_path, user_id, 0, data_to_write, date)
            print('Uploading... \n')
            status = daily_tracker_db(file_path)
            if (status):
                print('Upload is successful. Daily tracking is done.  ')
                print('You could login the website and check the results. ')
                print('Or you could measure between exercise. ')
            else:
                raw_input('Upload failed. Press Enter to try again. \n')
        else:
            print('\nUnrecognized command... \nPlease try again.')
#except:
#    print("There is an error, please run the HEM app again")
#    raw_input('Press Enter to exit...')
