import time
from read_serial import read_serial
# from data_transfer import ex_transfer, daily_transfer

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


print('\nWelcome to use our HEM system!')
while True:
    while True:
        user_name = raw_input('Please enter your user name: \n')
        user_psw = raw_input('Please enter your password: \n')
        print('Authentication ongoing. \nPlease wait. ')

        # Authentication
        # if ( user_auth() ):
        if (1):
            print('\nUser ' + user_name + ', welcome!')
            break
        else:
            print('Wrong account or password! Please enter again!\n')
    # after authentication
    while True:
        print('Enter \"0\" to change user account. ')
        print('Enter \"1\" for Exercise Comparison. ')
        print('Enter \"2\" for Daily Tracking.')
        function_type = raw_input('Please choose a function: \n')
        if (function_type == '0'):
            print('\nYou chose to switch to another account. ')
            break
        elif (function_type == '1'):
            print('\nYou chose the Exercise Comparison. ')
            while True:
                print('Enter \"0\" to go back. ')
                print('Enter \"1\" to measure before the exercise. ')
                print('Enter \"2\" to measure after the exercise. ')
                monitor_type = raw_input('Please enter: \n')
                if (monitor_type =='0'):
                    print('\nYou chose to go back. ')
                    break
                elif (monitor_type == "1"):
                    print('\nYou chose to measure before the exercise. ')
                    print('Initialising... ')
                    data_ex_pre = read_serial()
                    # write the data before exercise into file
                    f = file('data.txt', 'w')
                    f.write(user_id + ',' + monitor_type + ',' + data_ex_pre)
                    f.close()
                    print('Uploading... \n')
                    # ex_transfer()
                    if (1):
                        print('Upload successful... ')
                    else:
                        raw_input('Upload failed. Press Enter to try again')




                elif (monitor_type == '2'):
                    print('\nYou chose to measure after the exercise. ')
                    print('Initialising... ')
                    data_ex_post = read_serial()

                    # write the data after exercise into file
                    f = file('data.txt', 'w')
                    f.write(user_id + "," + monitor_type + "," + data_ex_post)
                    f.close()
                    # ex_transfer()
                else:
                    print('\nUnrecognized command, please enter again. ')
        elif (function_type == '2'):
            print('\nYou chose the Daily Tracking.')
            data_daily = read_serial()

            # write daily tracking data into file
            f = file('data.txt', 'w')
            f.write(user_id + ',')
            f.write(time.strftime('%Y-%m-%d', time.localtime()))
            f.write(',' + data_daily)
            f.close()
            # daily_transfer()
        else:
            print('\nUnrecognized command... \nPlease try again.')
#except:
#    print("There is an error, please run the HEM app again")
#    raw_input('Press Enter to exit...')
