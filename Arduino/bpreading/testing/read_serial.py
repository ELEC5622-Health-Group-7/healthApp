import serial
import time

def read_serial():
    data = ''
    try:
        ser = serial.Serial(
            port='COM3',
            # baudrate for bpm & SPO
            # baudrate = 115200,
            # baudrate for blood presure
            baudrate=19200,
            #parity=serial.PARITY_ODD,
            stopbits=serial.STOPBITS_TWO,
            bytesize=serial.EIGHTBITS)
    except:
        print('\nNo Connection Detected!')
        print('Please connect the device to computer and try again.')
        raw_input('Press Enter after connection. \n')
    else:
        # measure_state is the measuring flag
        measure_state = 0
        while True:
            data = ''
            while ser.inWaiting() > 0:
                # n = ser.inWaiting
                data += ser.read(1)
                # make sure the buffer is not read empty before next bytes come in
                time.sleep(0.01)
            if (data == 'a') and (measure_state == 0):
                print('\nReady to measure... \nPlease keep your arm still and turn on the sensor. ')
                measure_state = 1
            elif (data == 'e') and (measure_state == 1):
                print('\nMeasuring... \nPlease keep the sensor on until completed. ')
                measure_state = 2
            elif (data == 'i') and (measure_state == 2):
                print('\nMeasurement Completed... ')
                measure_state = 3
            elif (data == 'a') and ((measure_state == 2) or (measure_state == 3)):
                print('Unsuccessful measurement... ')
                measure_state = 0
                raw_input('Please keep your arm still and press Enter to measure again. \n')
                print('Initializing... ')
            elif (data != 'a') and (data !='') and (measure_state == 3):
                print('Successful measurement... ')
                print('Your diastolic, systolic and pulse readings are: ')
                print(data)
                measure_state = 0
                while True:
                    print('Enter \"0\" to discard the readings and measure again. ')
                    print('Enter \"1\" to upload the readings to the server. ')
                    measure_again = raw_input('Please enter: \n')
                    if (measure_again == '0'):
                        print('\nYou chose to discard the readings and measure again. ')
                        print('Initializing...')
                        break
                    elif (measure_again == '1'):
                        print('\nYou chose to upload readings to the server. ')
                        return data
                    else:
                        print('\nUnrecognized command... \nPlease enter again. ')
            # to ease the computing pressure
            time.sleep(0.01)
