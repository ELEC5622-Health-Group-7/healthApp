import serial
import time

def read_serial():
    while(1):
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
            print("\nNo Connection Detected!")
            print("Please connect the device to computer and try again.")
            raw_input('Press Enter after connection.')
        else:
            # measure_state is the measuring flag
            measure_state = 0
            while(1):
                data = ''
                #print(ser.inWaiting())
                while ser.inWaiting() > 0:
                    # n = ser.inWaiting
                    data += ser.read(1)
                    # make sure the buffer is not read empty before next bytes come in
                    time.sleep(0.01)
                if (data == 'a') and (measure_state == 0):
                    print('Ready to measure. Please turn on the sensor')
                    measure_state = 1
                elif (data == 'e') and (measure_state == 1):
                    print('Measuring')
                    measure_state = 2
                elif (data == 'i') and (measure_state == 2):
                    print('Measurement Completed')
                    measure_state = 3
                elif (data != 'a') and (data !='') and (measure_state == 3):
                    print("Measurement Completed: ")
                    print(data)
                    measure_state = 0
                    break
    return data