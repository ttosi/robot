#include <Arduino.h>
#include <FastLED.h>

#define NUM_PIXELS 10
#define DATA_PIN 6

#define STROBE_COUNT 10
#define STROBE_FLASH_DELAY 50
#define STROBE_END_PAUSE 250

class Pixels {
  public:
    Pixels();
    void command(uint8_t command, uint8_t red, uint8_t green, uint8_t blue,
                uint8_t brightness);
    void Pixels::off();

  private:
    void solid(CRGB color);
    void breathe(CRGB color);
    void strobe(CRGB color);
};