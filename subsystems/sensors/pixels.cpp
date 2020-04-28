#include "pixels.h"

// // CRGB pixels[NUM_PIXELS];

// void forwardMotion()
// {
// }

// void testPixels()
// {
//     pixels[0] = CRGB::Red;
//     FastLED.show();
//     delay(500);

//     pixels[0] = CRGB::Black;
//     FastLED.show();
//     delay(500);
// }

void initStrip()
{
    FastLED.addLeds<NEOPIXEL, DATA_PIN>(pixels, NUM_PIXELS);
}

void FadeInOut(byte red, byte green, byte blue)
{
    float r, g, b;

    for (int k = 10; k < 80; k = k + 1)
    {
        r = (k / 256.0) * red;
        g = (k / 256.0) * green;
        b = (k / 256.0) * blue;
        setAll(r, g, b);
        showStrip();
        delay(10);
    }

    for (int k = 80; k >= 10; k = k - 1)
    {
        r = (k / 256.0) * red;
        g = (k / 256.0) * green;
        b = (k / 256.0) * blue;
        setAll(r, g, b);
        showStrip();
        delay(10);
    }
}

void showStrip()
{
    FastLED.show();
}

void setPixel(int Pixel, byte red, byte green, byte blue)
{
    pixels[Pixel].r = red;
    pixels[Pixel].g = green;
    pixels[Pixel].b = blue;
}

void setAll(byte red, byte green, byte blue)
{
    for (int i = 0; i < NUM_PIXELS; i++)
    {
        setPixel(i, red, green, blue);
    }
    showStrip();
}