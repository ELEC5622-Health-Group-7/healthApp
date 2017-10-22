import time
import serial
import time


try:
    ser = serial.Serial(
        port='COM3',
        # for bpm & SPO
        #baudrate = 115200,

        # baudrate for blood presure
        baudrate=19200,

        #parity=serial.PARITY_ODD,
        stopbits=serial.STOPBITS_TWO,
        bytesize=serial.EIGHTBITS
    )

except:
    print("No Connection Detected")
    raw_input('Press Enter to exit...')

else:
    data = ''
    MeasureState = 0

    #ReadyToMeasure = 0
    #Measuring = 0
    #MeasureCompleted = 0

    while(1):

        data = ''
        #print(ser.inWaiting())
        while ser.inWaiting() > 0:
            # n = ser.inWaiting
            data += ser.read(1)

            # make sure the buffer is not read empty before next bytes come in
            time.sleep(0.01)

        if (data == 'a') and (MeasureState == 0):
            print('Ready to measure. Please turn on the sensor')
            MeasureState = 1
        elif (data == 'e') and (MeasureState == 1):
            print('Measuring')
            MeasureState = 2
        elif (data == 'i') and (MeasureState == 2):
            print('Measurement Completed')
            MeasureState = 3
        elif (data != 'a') and (data !='') and (MeasureState == 3):
            print (data)
            f = file("data.txt","w")
            f.write(data)
            #f.write("\n")
            f.close()
            MeasureState = 0





