import serial
import time
from read_serial import read_serial
# from data_transfer import ex_transfer, daily_transfer

# variable for user authentication
user_name = ""
user_id = ""
user_psw = ""
# variable store chosen function by user
function_type = ""
monitor_type = ""
# for exercise monitor, 2 variables to store the data respectively
data_ex_pre = ""
data_ex_post = ""



try:
    print("\nWelcome to use our HEM system!")
    while(1):
        while(1):
            print("Please enter your user name: ")
            user_name = raw_input()
            print("Please enter your password: ")
            user_psw = raw_input()

            # Authentication
            # if ( user_auth() ):
            if (1):
                print("\nUser " + user_name + ", welcome!")
                break
            else:
                print("Wrong account or password! Please enter again!\n")
        # after authentication
        while(1):
            print("Enter \"0\" to change user account.")
            print("Enter \"1\" for Exercise Comparison.")
            print("Enter \"2\" for Daily Tracking.")
            print("Please choose a function: ")
            function_type = raw_input()
            if (function_type == "0"):
                print("\nYou chose to switch to another account.")
                break
            elif (function_type == "1"):
                print("\nYou chose the Exercise Comparison.")
                while(1):
                    print("Enter \"0\" to go back.")
                    print("Enter \"1\" to measure before the exercise.")
                    print("Enter \"2\" to measure after the exercise.")
                    monitor_type = raw_input("Please enter: \n")
                    if (monitor_type =="0"):
                        print("\nYou chose to go back.")
                        break
                    elif (monitor_type == "1"):
                        data_ex_pre = read_serial()

                        # write the data before measurement into file
                        f = file("data.txt", "w")
                        f.write(user_id + " 1 " + data_ex_pre)
                        f.close()
                        ex_transfer()


                    elif (monitor_type == "2"):
                        data_ex_post = read_serial()

                        # write the data after measurement into file
                        f = file("data.txt", "w")
                        f.write(user_id + " ")
                        f.write(time.strftime("%Y-%m-%d", time.localtime()))
                        f.write(" " + data)
                        f.close()
                        ex_transfer()

                    else:
                        print("Command unrecognized, please enter again.\n")
            elif (function_type == "2"):
                print("\nYou chose the Daily Tracking.")
                data = read_serial()

                # write daily tracking data into file
                f = file("data.txt", "w")
                f.write(user_id + " ")
                f.write(time.strftime("%Y-%m-%d", time.localtime()))
                f.write(" " + data)
                f.close()
                daily_transfer()
            else:
                print("Command Unrecognized, please try again.\n")

except:
    print("There is an error, please run the HEM app again")
    raw_input('Press Enter to exit...')