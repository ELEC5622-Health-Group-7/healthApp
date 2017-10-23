


#include <MySignals.h>
#include "Wire.h"
#include "SPI.h"



void setup()
{

  Serial.begin(19200);
  MySignals.begin();

  MySignals.initSensorUART();
  MySignals.enableSensorUART(BLOODPRESSURE);
}

void loop()
{
  if (MySignals.getStatusBP())
  {
    delay(1000);

    if (MySignals.getBloodPressure() == 1)
    {
      MySignals.disableMuxUART();
      delay(20);
      // The following is to transmit to pc
      Serial.print(MySignals.bloodPressureData.diastolic);
      Serial.print(" ");
      Serial.print(MySignals.bloodPressureData.systolic);
      Serial.print(" ");
      Serial.print(MySignals.bloodPressureData.pulse);
      Serial.print(" \n");
      

      
      
      /*
      // The following is to show in the serial monitor
      Serial.println();
      Serial.print("Diastolic: ");
      Serial.println(MySignals.bloodPressureData.diastolic);
      Serial.print("Systolic: ");
      Serial.println(MySignals.bloodPressureData.systolic);
      Serial.print("Pulse/min: ");
      Serial.println(MySignals.bloodPressureData.pulse);
      */
      MySignals.enableMuxUART();
    }
    
  }
  delay(1000);
}
