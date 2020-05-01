#include <Arduino.h>
#include "Pixels.h"

CRGB leds[NUM_PIXELS];

Pixels::Pixels()
{
  FastLED.addLeds<WS2811, DATA_PIN, RGB>(leds, NUM_PIXELS);
}

void Pixels::command(uint8_t command, uint8_t red, uint8_t green, uint8_t blue, uint8_t brightness)
{
  CRGB color = CRGB(green, red, blue);
  FastLED.setBrightness(brightness);

  switch(command)
  {
    case 0x02:
      Pixels::solid(color);
      break;
    case 0x08:
      Pixels::breathe(color);
      break;
  }
}

void Pixels::solid(CRGB color)
{
  fill_solid(leds, NUM_PIXELS, color);
  FastLED.show();
}

void Pixels::off()
{
  fill_solid(leds, NUM_PIXELS, CRGB::Black);
  FastLED.show();
}

void Pixels::breathe(CRGB color)
{
    fill_solid(leds, NUM_PIXELS, color);

    for(int brightness = 10; brightness < 80; brightness++)
    {
      FastLED.setBrightness(brightness);
      FastLED.show();
      delay(20);
    }

    for(int brightness = 80; brightness > 10; brightness--)
    {
      FastLED.setBrightness(brightness);
      FastLED.show();
      delay(20);
    }
}
