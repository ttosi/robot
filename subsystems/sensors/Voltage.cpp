#include <Arduino.h>
#include "Voltage.h"

int sum = 0;                    
unsigned char sample_count = 0;
float volts = 0.00;

Voltage::Voltage()
{
  pinMode(VOLTAGE_PIN, INPUT);
}

float Voltage::read()
{
    while (sample_count < NUM_SAMPLES)
    {
      sum += analogRead(VOLTAGE_PIN);
      sample_count++;
      delay(10);
    }

    volts = (((float)sum / (float)NUM_SAMPLES * 5.015) / 1024.0) * 103.07;
    sample_count = 0;
    sum = 0;
    
    return volts;
}