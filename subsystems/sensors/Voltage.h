#include <Arduino.h>

#define VOLTAGE_PIN A2
#define NUM_SAMPLES 100

class Voltage
{
  public:
    Voltage();
    float read();
};