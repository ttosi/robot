// #include <Arduino.h>
// #include "Temp.h"

// OneWire oneWire(ONE_WIRE_PIN);
// DallasTemperature sensors(&oneWire);

// DeviceAddress leftMotorAdress = LEFT_MOTOR_ADDRESS;
// DeviceAddress rightMotorAdress = RIGHT_MOTOR_ADDRESS;

// float currentTemp;

// Temp::Temp()
// {
//   sensors.begin();
  
//   if (!sensors.getAddress(leftMotorAdress, 0))  
//     Serial.println("Unable to find address for Device 0"); 

//   if (!sensors.getAddress(rightMotorAdress, 1))
//     Serial.println("Unable to find address for Device 1"); 
  
//   sensors.setResolution(leftMotorAdress, 9);
//   sensors.setResolution(rightMotorAdress, 9);
// }

// float Temp::read(int motor)
// {
//   sensors.requestTemperatures();
//   Serial.print("lm ");
//   Serial.println(sensors.getTempC(leftMotorAdress));
//   Serial.print("rm ");
//   Serial.println(sensors.getTempC(rightMotorAdress));
//   // delay(250);
//   // switch(motor)
//   // {
//     // case 1:
//     //   float lcurrentTemp = sensors.getTempC(leftMotorAdress);
//     //   Serial.print("read left");
//     //   Serial.println(lcurrentTemp);
//     //   break;
//     // case 2:
//     //   float rcurrentTemp = sensors.getTempC(rightMotorAdress);
//     //   Serial.print("read right");
//     //   Serial.println(rcurrentTemp);
//     //   break;
//     // } 

//   return 1.23;
// }
