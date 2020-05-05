// arduino-cli compile -v -b arduino:avr:nano:cpu=atmega328old ./sen/ -u -p /dev/ttyUSB0

// pixel protocol = 0x50 (P) [command][r][g][b][brightness]
//    [0x00] - turn pixels off
//    [0x01] - test pixels
//    [0x02] - solid pixels
//    [0x03] - forward pixels
//    [0x04] - reverse pixels
//    [0x05] - spin left pixels
//    [0x06] - spin right pixels
//    [0x07] - strobe pixels
//    [0x08] - breathe pixels
// voltage protocol = 0x56 (V)
//    read and return battery voltage
// motor temps protocol [0x54]
//    read and return the motor temps

#include <Thread.h>
#include <ThreadController.h>
#include <Wire.h>
#include "Pixels.h"
#include "Voltage.h"
#include "Temp.h"

#define SLAVE_ADDRESS 0x11
#define STATUS_PIN 13

ThreadController threadControl = ThreadController();
Thread *pixelThread = new Thread();
Thread *voltageThread = new Thread();
Thread *tempuratreThread = new Thread();

Pixels pixels;
Voltage voltage;
Temp motorTemp;

uint8_t currentCommand;

uint8_t pixelCommand = 0x01;
uint8_t pixelColorRed = 0x00;
uint8_t pixelColorGreen = 0xff;
uint8_t pixelColorBlue = 0x00;
uint8_t pixelBrightness = 0x10;

float currentVoltage = 0.00;
float currentLeftMotorTemp = 0.00;
float currentRightMotorTemp = 0.00;

union floatToBytes 
{
  char buffer[4];
  float value;
} converter;

void setup() 
{
  Serial.begin(115200);
  
  pinMode(STATUS_PIN, OUTPUT);
  pixels.off();

  Wire.begin(SLAVE_ADDRESS);
  Wire.onReceive(receive);
  Wire.onRequest(send);

  pixelThread->onRun(sendPixelCommand);
  pixelThread->setInterval(25);
  threadControl.add(pixelThread);

  voltageThread->onRun(readVoltage);
  voltageThread->setInterval(5100);
  threadControl.add(voltageThread);

  tempuratreThread->onRun(readTemp);
  tempuratreThread->setInterval(5200);
  threadControl.add(tempuratreThread);

  Serial.println("Sensor subsystem ready");
}

void loop() 
{
  threadControl.run(); 
}

void sendPixelCommand() 
{
  pixels.command(pixelCommand, pixelColorRed, pixelColorGreen,
    pixelColorBlue, pixelBrightness);
}

void readVoltage() 
{ 
  currentVoltage = voltage.read();
}

void readTemp() 
{ 
  currentLeftMotorTemp = motorTemp.read(1);
  currentRightMotorTemp = motorTemp.read(2);
}

void receive(uint8_t byteCount) 
{
  Serial.print("bytes:   ");
  Serial.println(byteCount);

  if (Wire.available()) 
  {
    int8_t data[byteCount];
    uint8_t index = 0;

    while (Wire.available())
      data[index++] = Wire.read();

    currentCommand = data[0];
    
    Serial.print("command: ");
    Serial.println(currentCommand);
    Serial.println("-----------------");

    switch (currentCommand) 
    {
      case 0x50:
        pixelCommand = data[1];
        pixelColorRed = data[2];
        pixelColorGreen = data[3];
        pixelColorBlue = data[4];
        pixelBrightness = data[5];
        break;
      }
  }
}

void send() 
{
  switch(currentCommand)
  {
    case 0x56: // voltage
      converter.value = currentVoltage;
      Wire.write(converter.buffer, 4);
      break;
    case 0x54: // motor temps
      converter.value = currentLeftMotorTemp;
      Wire.write(converter.buffer, 4);
      converter.value = currentRightMotorTemp;
      Wire.write(converter.buffer, 4);
  }
}
