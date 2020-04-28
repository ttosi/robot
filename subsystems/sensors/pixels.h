#include <Arduino.h>
#include <FastLED.h>

#define NUM_PIXELS 10
#define DATA_PIN 6

CRGB pixels[NUM_PIXELS];

void initStrip();

void FadeInOut(byte red, byte green, byte blue);

void setPixel(int Pixel, byte red, byte green, byte blue);

void setAll(byte red, byte green, byte blue);

void showStrip();
