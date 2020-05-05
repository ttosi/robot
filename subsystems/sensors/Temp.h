#include <Arduino.h>
#include <DallasTemperature.h>
#include <OneWire.h>

// left motor addres = 10AA03DB0108006E ()
// pin 11 = 1053B33302080074
#define ONE_WIRE_PIN 11

#define LEFT_MOTOR_ADDRESS { 0x10, 0xAA, 0x03, 0xDB, 0x01, 0x08, 0x00, 0x6E };
#define RIGHT_MOTOR_ADDRESS { 0x10, 0x53, 0xB3, 0x33, 0x02, 0x08, 0x00, 0x74 };
// #define LEFT_SENSOR 0
// #define RIGHT_SENSOR 1

// #define TEMP_SESOR_COUNT 2
// #define LEFT_MOTOR_TEMP_PIN 10
// #define RIGHT_MOTOR_TEMP_PIN 11

class Temp 
{
  public:
    Temp();
    float read(int motor);
  // private:
  //   float getTemp(DeviceAddress deviceAddress);
};


