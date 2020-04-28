// arduino-cli compile -v -b arduino:avr:nano:cpu=atmega328old ~/Projects/ws2812b-test/
// arduino-cli upload -v -b arduino:avr:nano:cpu=atmega328old -p /dev/ttyUSB0 ws2812b-test/

#include <Wire.h>
#include <FastLED.h>
#include "pixels.h"

// #define NUM_PIXELS 10
// #define DATA_PIN 6

// CRGB pixels[NUM_PIXELS];

void setup()
{
    // FastLED.addLeds<NEOPIXEL, DATA_PIN>(pixels, NUM_PIXELS);
    initStrip();
}

void loop()
{
    // FadeInOut(0x00, 0x00, 0xff);

    // Strobe(0xff, 0x77, 0x00, 10, 100, 1000);
    // Strobe(0xff, 0x00, 0x00, 10, 50, 100);

    // RunningLights(0x00, 0xff, 0x00, 50);

    // colorWipe(0x00, 0xff, 0x00, 100);
}

// void FadeInOut(byte red, byte green, byte blue)
// {
//     float r, g, b;

//     for (int k = 10; k < 80; k = k + 1)
//     {
//         r = (k / 256.0) * red;
//         g = (k / 256.0) * green;
//         b = (k / 256.0) * blue;
//         setAll(r, g, b);
//         showStrip();
//         delay(10);
//     }

//     for (int k = 80; k >= 10; k = k - 1)
//     {
//         r = (k / 256.0) * red;
//         g = (k / 256.0) * green;
//         b = (k / 256.0) * blue;
//         setAll(r, g, b);
//         showStrip();
//         delay(10);
//     }
// }

// void Strobe(byte red, byte green, byte blue, int StrobeCount, int FlashDelay, int EndPause)
// {
//     for (int j = 0; j < StrobeCount; j++)
//     {
//         setAll(red, green, blue);
//         showStrip();
//         delay(FlashDelay);
//         setAll(0, 0, 0);
//         showStrip();
//         delay(FlashDelay);
//     }

//     delay(EndPause);
// }

// void RunningLights(byte red, byte green, byte blue, int WaveDelay)
// {
//     int Position = 0;

//     for (int j = 0; j < NUM_PIXELS * 2; j++)
//     {
//         Position++; // = 0; //Position + Rate;
//         for (int i = 0; i < NUM_PIXELS; i++)
//         {
//             // sine wave, 3 offset waves make a rainbow!
//             //float level = sin(i+Position) * 127 + 128;
//             //setPixel(i,level,0,0);
//             //float level = sin(i+Position) * 127 + 128;
//             setPixel(i, ((sin(i + Position) * 127 + 128) / 255) * red,
//                      ((sin(i + Position) * 127 + 128) / 255) * green,
//                      ((sin(i + Position) * 127 + 128) / 255) * blue);
//         }

//         showStrip();
//         delay(WaveDelay);
//     }
// }

// void colorWipe(byte red, byte green, byte blue, int SpeedDelay)
// {
//     for (uint16_t i = 0; i < NUM_PIXELS; i++)
//     {
//         setPixel(i, red, green, blue);
//         showStrip();
//         delay(SpeedDelay);
//     }
// }

// void showStrip()
// {
//     FastLED.show();
// }

// void setPixel(int Pixel, byte red, byte green, byte blue)
// {
//     pixels[Pixel].r = red;
//     pixels[Pixel].g = green;
//     pixels[Pixel].b = blue;
// }

// void setAll(byte red, byte green, byte blue)
// {
//     for (int i = 0; i < NUM_PIXELS; i++)
//     {
//         setPixel(i, red, green, blue);
//     }
//     showStrip();
// }

// #include <Adafruit_NeoPixel.h>

// #define SLAVE_ADDRESS 0x11
// #define STATUS_PIN 13

// #define PIXELS_PIN 6
// #define PIXELS_NUM 10

// Adafruit_NeoPixel strip(PIXELS_NUM, PIXELS_PIN, NEO_GRB + NEO_KHZ800);

// void setup()
// {
//     Serial.begin(115200);

//     Wire.begin(SLAVE_ADDRESS);
//     Wire.onReceive(receive);
//     Wire.onRequest(send);

//     strip.begin();
//     strip.show();
//     strip.setBrightness(50);

//     Serial.println("Sensor subsystem ready");

//     strip.clear();

//     testprint("wazzzz up");
// }

// void loop()
// {
//     // pixels.clear();

//     // for (int i = 0; i < PIXELS_NUM; i++)
//     // {
//     //     pixels.setPixelColor(i, pixels.Color(0, 0, 75));
//     //     pixels.show();

//     //     delay(75);
//     // }

//     // colorWipe(strip.Color(255, 0, 0), 50);
//     // colorWipe(strip.Color(0, 255, 0), 50);
//     // colorWipe(strip.Color(0, 0, 255), 50);

//     // theaterChase(strip.Color(127, 127, 127), 50);
//     // theaterChase(strip.Color(127, 0, 0), 50);
//     // theaterChase(strip.Color(0, 0, 127), 50);

//     // rainbow(10);
//     // theaterChaseRainbow(50);
// }

// void receive(int byteCount)
// {
// }

// void send()
// {
// }

// void colorWipe(uint32_t color, int wait)
// {
//     for (int i = 0; i < strip.numPixels(); i++)
//     {
//         strip.setPixelColor(i, color);
//         strip.show();
//         delay(wait);
//     }
// }

// void theaterChase(uint32_t color, int wait)
// {
//     for (int a = 0; a < 10; a++)
//     {
//         for (int b = 0; b < 3; b++)
//         {
//             strip.clear();
//             for (int c = b; c < strip.numPixels(); c += 3)
//             {
//                 strip.setPixelColor(c, color);
//             }
//             strip.show();
//             delay(wait);
//         }
//     }
// }

// void rainbow(int wait)
// {
//     for (long firstPixelHue = 0; firstPixelHue < 5 * 65536; firstPixelHue += 256)
//     {
//         for (int i = 0; i < strip.numPixels(); i++)
//         {
//             int pixelHue = firstPixelHue + (i * 65536L / strip.numPixels());
//             strip.setPixelColor(i, strip.gamma32(strip.ColorHSV(pixelHue)));
//         }
//         strip.show();
//         delay(wait);
//     }
// }

// void theaterChaseRainbow(int wait)
// {
//     int firstPixelHue = 0;
//     for (int a = 0; a < 30; a++)
//     {
//         for (int b = 0; b < 3; b++)
//         {
//             strip.clear();
//             for (int c = b; c < strip.numPixels(); c += 3)
//             {
//                 int hue = firstPixelHue + c * 65536L / strip.numPixels();
//                 uint32_t color = strip.gamma32(strip.ColorHSV(hue));
//                 strip.setPixelColor(c, color);
//             }
//             strip.show();
//             delay(wait);
//             firstPixelHue += 65536 / 90;
//         }
//     }
// }
