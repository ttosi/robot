// arduino-cli compile -v -b arduino:avr:nano:cpu=atmega328old ~/Projects/ws2812b-test/
// arduino-cli upload -v -b arduino:avr:nano:cpu=atmega328old -p /dev/ttyUSB0 ws2812b-test/

// pixel protocol = 0x50 [command][r][g][b][brightness]
//    [0x00] - turn pixels off
//    [0x01] - test pixels
//    [0x02] - solid pixels
//    [0x03] - forward pixels
//    [0x04] - reverse pixels
//    [0x05] - spin left pixels
//    [0x06] - spin right pixels
//    [0x07] - strobe pixels
//    [0x08] - breathe pixels
// voltage protocol = 0x56
//    reads and return current battery voltage

#include <Wire.h>
#include <Thread.h>
#include <ThreadController.h>
#include "Pixels.h"
#include "Voltage.h"

#define SLAVE_ADDRESS 0x11
#define STATUS_PIN 13

ThreadController threadControl = ThreadController();
Thread* pixelThread = new Thread();
Thread* voltageThread = new Thread();

Pixels pixels;
Voltage voltage;
uint8_t currentCommand;

uint8_t pixelCommand = 0x01;
uint8_t pixelColorRed = 0x00; 
uint8_t pixelColorGreen = 0xff; 
uint8_t pixelColorBlue = 0x00;
uint8_t pixelBrightness = 0x10;

float currentVoltage = 0.00;
float lastVoltage = 0.00;

union floatToBytes {
    char buffer[4];
    float value;
} converter;

void setup()
{
  Serial.begin(115200);
  
  Wire.begin(SLAVE_ADDRESS);
  Wire.onReceive(receive);
  Wire.onRequest(send);

  pixels.off();

  pixelThread->onRun(sendPixelCommand);
  pixelThread->setInterval(25);
  threadControl.add(pixelThread);

  voltageThread->onRun(readVoltage);
  voltageThread->setInterval(5000);
  threadControl.add(voltageThread);

  pinMode(STATUS_PIN, OUTPUT);
  
  Serial.println("Sensor subsystem ready");
}

void loop()
{
  threadControl.run();
}

void sendPixelCommand()
{
  pixels.command(
    pixelCommand,
    pixelColorRed,
    pixelColorGreen,
    pixelColorBlue,
    pixelBrightness
  );
}

void readVoltage()
{
  currentVoltage = voltage.read();
}

void receive(uint8_t byteCount)
{
  Serial.print("bytes received: ");
  Serial.println(byteCount);

  if (Wire.available())
  {
    int8_t data[byteCount];
    uint8_t index = 0;

    while (Wire.available())
      data[index++] = Wire.read();
    
    currentCommand = data[0];
    Serial.print("cmd received: ");
    Serial.println(currentCommand);

    switch(currentCommand)
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
  if(currentCommand == 0x56)
  {
    lastVoltage = currentVoltage;
    converter.value = currentVoltage;
    Wire.write(converter.buffer, 4);
  }
}
