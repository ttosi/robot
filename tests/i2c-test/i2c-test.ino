#include <Wire.h>

#define SLAVE_ADDRESS 0x11
#define STATUS_PIN 13

void setup()
{
    pinMode(STATUS_PIN, OUTPUT);

    Wire.begin(SLAVE_ADDRESS);
    Wire.onReceive(receive);
    Wire.onRequest(send);

    Serial.begin(115200);
    Serial.print("\nDevice at address ");
    Serial.print(SLAVE_ADDRESS, HEX);
    Serial.println(" ready");
}

void loop()
{
    digitalWrite(STATUS_PIN, HIGH);
    delay(50);

    digitalWrite(STATUS_PIN, LOW);
    delay(200);
}

void receive(int byteCount)
{
    Serial.print("Receiving ");
    Serial.print(byteCount);
    Serial.println(" byte(s)...");

    while (Wire.available())
    {
        Serial.println(Wire.read(), HEX);
    }

    Serial.println("Done");
}

void send()
{
    Wire.write(SLAVE_ADDRESS);
}