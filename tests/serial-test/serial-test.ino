// picocom -b 115200 /dev/ttyUSB0
#define STATUS_PIN 13

void setup()
{
    Serial.begin(115200);
    pinMode(STATUS_PIN, OUTPUT);

    Serial.println("ready...");
}

void loop()
{
    Serial.println("on");
    digitalWrite(STATUS_PIN, HIGH);
    delay(1000);

    Serial.println("off");
    digitalWrite(STATUS_PIN, LOW);
    delay(1000);
}
