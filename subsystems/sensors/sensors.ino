
// // Include the libraries we need
// #include <OneWire.h>
// #include <DallasTemperature.h>

// // Data wire is plugged into port 2 on the Arduino
// #define ONE_WIRE_BUS 11

// // Setup a oneWire instance to communicate with any OneWire devices (not just Maxim/Dallas temperature ICs)
// OneWire oneWire(ONE_WIRE_BUS);

// // Pass our oneWire reference to Dallas Temperature. 
// DallasTemperature sensors(&oneWire);

// // arrays to hold device address
// DeviceAddress insideThermometer;
// DeviceAddress out;

// /*
//  * Setup function. Here we do the basics
//  */
// void setup(void)
// {
//   // start serial port
//   Serial.begin(115200);
//   Serial.println("Dallas Temperature IC Control Library Demo");

//   // locate devices on the bus
//   Serial.print("Locating devices...");
//   sensors.begin();
//   Serial.print("Found ");
//   Serial.print(sensors.getDeviceCount(), DEC);
//   Serial.println(" devices.");

//   // report parasite power requirements
//   Serial.print("Parasite power is: "); 
//   if (sensors.isParasitePowerMode()) Serial.println("ON");
//   else Serial.println("OFF");
  
//   // Assign address manually. The addresses below will beed to be changed
//   // to valid device addresses on your bus. Device address can be retrieved
//   // by using either oneWire.search(deviceAddress) or individually via
//   // sensors.getAddress(deviceAddress, index)
//   // Note that you will need to use your specific address here
//   //insideThermometer = { 0x28, 0x1D, 0x39, 0x31, 0x2, 0x0, 0x0, 0xF0 };

//   // Method 1:
//   // Search for devices on the bus and assign based on an index. Ideally,
//   // you would do this to initially discover addresses on the bus and then 
//   // use those addresses and manually assign them (see above) once you know 
//   // the devices on your bus (and assuming they don't change).
//   if (!sensors.getAddress(insideThermometer, 0)) Serial.println("Unable to find address for Device 0"); 
//   if (!sensors.getAddress(out, 1)) Serial.println("Unable to find address for Device 1"); 
  
//   // method 2: search()
//   // search() looks for the next device. Returns 1 if a new address has been
//   // returned. A zero might mean that the bus is shorted, there are no devices, 
//   // or you have already retrieved all of them. It might be a good idea to 
//   // check the CRC to make sure you didn't get garbage. The order is 
//   // deterministic. You will always get the same devices in the same order
//   //
//   // Must be called before search()
//   //oneWire.reset_search();
//   // assigns the first address found to insideThermometer
//   //if (!oneWire.search(insideThermometer)) Serial.println("Unable to find address for insideThermometer");

//   // show the addresses we found on the bus
//   Serial.print("Device 0 Address: ");
//   printAddress(insideThermometer);
//   Serial.println();
//   printAddress(out);
//   Serial.println();

//   // set the resolution to 9 bit (Each Dallas/Maxim device is capable of several different resolutions)
//   sensors.setResolution(insideThermometer, 9);
//   sensors.setResolution(out, 9);
 
//   Serial.print("Device 0 Resolution: ");
//   Serial.print(sensors.getResolution(insideThermometer), DEC); 
//   Serial.print(sensors.getResolution(out), DEC); 
//   Serial.println();
// }

// // function to print the temperature for a device
// void printTemperature(DeviceAddress deviceAddress)
// {
//   // method 1 - slower
//   //Serial.print("Temp C: ");
//   //Serial.print(sensors.getTempC(deviceAddress));
//   //Serial.print(" Temp F: ");
//   //Serial.print(sensors.getTempF(deviceAddress)); // Makes a second call to getTempC and then converts to Fahrenheit

//   // method 2 - faster
//   float tempC = sensors.getTempC(deviceAddress);
//   if(tempC == DEVICE_DISCONNECTED_C) 
//   {
//     Serial.println("Error: Could not read temperature data");
//     return;
//   }
//   Serial.print("Temp C: ");
//   Serial.print(tempC);
//   Serial.print(" Temp F: ");
//   Serial.println(DallasTemperature::toFahrenheit(tempC)); // Converts tempC to Fahrenheit
// }
// /*
//  * Main function. It will request the tempC from the sensors and display on Serial.
//  */
// void loop(void)
// { 
//   // call sensors.requestTemperatures() to issue a global temperature 
//   // request to all devices on the bus
//   Serial.print("Requesting temperatures...");
//   sensors.requestTemperatures(); // Send the command to get temperatures
//   Serial.println("DONE");
  
//   // It responds almost immediately. Let's print out the data
//   printTemperature(insideThermometer); // Use a simple function to print out the data
//   printTemperature(out); // Use a simple function to print out the data
// }

// // function to print a device address
// void printAddress(DeviceAddress deviceAddress)
// {
//   for (uint8_t i = 0; i < 8; i++)
//   {
//     if (deviceAddress[i] < 16) Serial.print("0");
//     Serial.print(deviceAddress[i], HEX);
//   }
// }
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
#include <DallasTemperature.h>
#include <OneWire.h>

#define SLAVE_ADDRESS 0x11
#define ONE_WIRE_PIN 11
#define STATUS_PIN 13

ThreadController threadControl = ThreadController();
Thread *pixelThread = new Thread();
Thread *voltageThread = new Thread();
Thread *tempuratreThread = new Thread();

Pixels pixels;
Voltage voltage;

OneWire oneWire(ONE_WIRE_PIN);
DallasTemperature sensors(&oneWire);

DeviceAddress leftMotorAdress = { 0x10, 0xAA, 0x03, 0xDB, 0x01, 0x08, 0x00, 0x6E };
DeviceAddress rightMotorAdress = { 0x10, 0x53, 0xB3, 0x33, 0x02, 0x08, 0x00, 0x74 };

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
  sensors.begin();

  sensors.setResolution(leftMotorAdress, 9);
  sensors.setResolution(rightMotorAdress, 9);

  pinMode(STATUS_PIN, OUTPUT);
  pixels.off();

  Wire.begin(SLAVE_ADDRESS);
  Wire.onReceive(receive);
  Wire.onRequest(send);

  pixelThread->onRun(sendPixelCommand);
  pixelThread->setInterval(25);
  threadControl.add(pixelThread);

  voltageThread->onRun(readVoltage);
  voltageThread->setInterval(5000);
  threadControl.add(voltageThread);

  tempuratreThread->onRun(readTemp);
  tempuratreThread->setInterval(4000);
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
  sensors.requestTemperatures();
  currentLeftMotorTemp = sensors.getTempC(leftMotorAdress);
  currentRightMotorTemp = sensors.getTempC(rightMotorAdress);
  
  // Serial.print("lm ");
  // Serial.println(currentLeftMotorTemp);
  // Serial.print("rm ");
  // Serial.println(currentRightMotorTemp);
}

void receive(uint8_t byteCount) 
{
  if (Wire.available()) 
  {
    int8_t data[byteCount];
    uint8_t index = 0;

    while (Wire.available())
      data[index++] = Wire.read();

    currentCommand = data[0];
    
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
      // left motor
      converter.value = currentLeftMotorTemp;
      Wire.write(converter.buffer, 4);
      // right motor
      converter.value = currentRightMotorTemp;
      Wire.write(converter.buffer, 4);
  }
}
