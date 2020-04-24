// arduino-cli compile -v -b arduino:avr:nano:cpu=atmega328old ~/Projects/ws2812b-test/
// arduino-cli upload -v -b arduino:avr:nano:cpu=atmega328old -p /dev/ttyUSB0 ws2812b-test/

#include <Wire.h>
#include <Adafruit_NeoPixel.h>
#include "leds.h"

#define SLAVE_ADDRESS 0x11
#define STATUS_PIN 13

#define PIXELS_PIN 6
#define PIXELS_NUM 10

Adafruit_NeoPixel strip(PIXELS_NUM, PIXELS_PIN, NEO_GRB + NEO_KHZ800);

void setup()
{
    Serial.begin(115200);

    Wire.begin(SLAVE_ADDRESS);
    Wire.onReceive(receive);
    Wire.onRequest(send);

    strip.begin();
    strip.show();
    strip.setBrightness(50);

    Serial.println("Sensor subsystem ready");

    strip.clear();
}

void loop()
{
    // pixels.clear();

    // for (int i = 0; i < PIXELS_NUM; i++)
    // {
    //     pixels.setPixelColor(i, pixels.Color(0, 0, 75));
    //     pixels.show();

    //     delay(75);
    // }

    // colorWipe(strip.Color(255, 0, 0), 50);
    // colorWipe(strip.Color(0, 255, 0), 50);
    // colorWipe(strip.Color(0, 0, 255), 50);

    // theaterChase(strip.Color(127, 127, 127), 50);
    // theaterChase(strip.Color(127, 0, 0), 50);
    // theaterChase(strip.Color(0, 0, 127), 50);

    // rainbow(10);
    // theaterChaseRainbow(50);
}

void receive(int byteCount)
{
}

void send()
{
}

void colorWipe(uint32_t color, int wait)
{
    for (int i = 0; i < strip.numPixels(); i++)
    {
        strip.setPixelColor(i, color);
        strip.show();
        delay(wait);
    }
}

void theaterChase(uint32_t color, int wait)
{
    for (int a = 0; a < 10; a++)
    {
        for (int b = 0; b < 3; b++)
        {
            strip.clear();
            for (int c = b; c < strip.numPixels(); c += 3)
            {
                strip.setPixelColor(c, color);
            }
            strip.show();
            delay(wait);
        }
    }
}

void rainbow(int wait)
{
    for (long firstPixelHue = 0; firstPixelHue < 5 * 65536; firstPixelHue += 256)
    {
        for (int i = 0; i < strip.numPixels(); i++)
        {
            int pixelHue = firstPixelHue + (i * 65536L / strip.numPixels());
            strip.setPixelColor(i, strip.gamma32(strip.ColorHSV(pixelHue)));
        }
        strip.show();
        delay(wait);
    }
}

void theaterChaseRainbow(int wait)
{
    int firstPixelHue = 0;
    for (int a = 0; a < 30; a++)
    {
        for (int b = 0; b < 3; b++)
        {
            strip.clear();
            for (int c = b; c < strip.numPixels(); c += 3)
            {
                int hue = firstPixelHue + c * 65536L / strip.numPixels();
                uint32_t color = strip.gamma32(strip.ColorHSV(hue));
                strip.setPixelColor(c, color);
            }
            strip.show();
            delay(wait);
            firstPixelHue += 65536 / 90;
        }
    }
}
