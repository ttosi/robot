#include <Arduino.h>
#include "Temp.h"

OneWire oneWire(ONE_WIRE_PIN);
DallasTemperature sensors(&oneWire);

DeviceAddress leftMotorAdress = LEFT_MOTOR_ADDRESS;
DeviceAddress rightMotorAdress = RIGHT_MOTOR_ADDRESS;

Temp::Temp()
{
  sensors.setResolution(leftMotorAdress, 12);
  sensors.setResolution(rightMotorAdress, 12);
  sensors.begin();
}

float Temp::read(int motor)
{
  float temp;

  switch(motor)
  {
    case 1:
      temp = sensors.getTempC(leftMotorAdress);
      break;
    case 2:
      temp = sensors.getTempC(rightMotorAdress);
      break;
  }

  return temp;
}
