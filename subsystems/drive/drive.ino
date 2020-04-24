#include <Wire.h>
#include <FlexyStepper.h>

FlexyStepper motorLeft;
FlexyStepper motorRight;

#define SLAVE_ADDRESS 0x10
#define STATUS_PIN 13

#define MOTOR_LEFT_ENABLE_PIN 8
#define MOTOR_LEFT_STEP_PIN 7
#define MOTOR_LEFT_DIR_PIN 6

#define MOTOR_RIGHT_ENABLE_PIN 3
#define MOTOR_RIGHT_STEP_PIN 5
#define MOTOR_RIGHT_DIR_PIN 4

union floatToBytes {
    char buffer[4];
    float value;
} converter;

void setup()
{
    Serial.begin(115200);

    // initialize i2c at slave address
    Wire.begin(SLAVE_ADDRESS);
    Wire.onReceive(receive);
    Wire.onRequest(send);

    // setup left servo motor
    motorLeft.connectToPins(MOTOR_LEFT_STEP_PIN, MOTOR_LEFT_DIR_PIN);
    motorLeft.setStepsPerRevolution(200);

    // setup right servo motor
    motorRight.connectToPins(MOTOR_RIGHT_STEP_PIN, MOTOR_RIGHT_DIR_PIN);
    motorRight.setStepsPerRevolution(200);

    enableMotors(false);

    pinMode(STATUS_PIN, OUTPUT);
    pinMode(MOTOR_LEFT_ENABLE_PIN, OUTPUT);
    pinMode(MOTOR_RIGHT_ENABLE_PIN, OUTPUT);

    Serial.println("Drive subsystem ready");
}

void loop()
{
    while (!motorLeft.motionComplete() || (!motorRight.motionComplete()))
    {
        motorLeft.processMovement();
        motorRight.processMovement();
    }

    enableMotors(false);
    delay(10);
}

void receive(int byteCount)
{
    Serial.println("data received");

    if (Wire.available())
    {
        int8_t data[byteCount];
        uint8_t index = 0;

        // read all the data from the master,
        // we're expecting 13 bytes
        while (Wire.available())
            data[index++] = Wire.read();

        uint8_t dataIdx;
        uint8_t bufferIdx = 0;
        uint8_t valuesIdx = 0;
        float values[3] = {};

        // loop through the last 12 bytes from the master
        // (the first byte is the motor selection)
        for (dataIdx = 1; dataIdx < 13; dataIdx++)
        {
            // fill the converter with bytes 1 - 4, 5 - 8 and 8 - 12
            converter.buffer[bufferIdx] = data[dataIdx];

            // when the converter buffer has four bytes,
            // convert it to a float and store it in the values array
            // then restart it all over for the next four bytes
            if (bufferIdx == 3)
            {
                values[valuesIdx] = converter.value;
                valuesIdx++;
                bufferIdx = 0;
            }
            else
            {
                bufferIdx++;
            }
        }

        // Serial.println("------------------");
        // Serial.print("speed: ");
        // Serial.println(values[0]);
        // Serial.print("accel: ");
        // Serial.println(values[1]);
        // Serial.print("revs: ");
        // Serial.println(values[2]);

        enableMotors(true);

        switch (data[0])
        {
        case 0x00: // emergency stop
            stop();
            break;
        case 0x01: // motor left
            motorLeft.setSpeedInRevolutionsPerSecond(values[0]);
            motorLeft.setAccelerationInRevolutionsPerSecondPerSecond(values[1]);
            motorLeft.setTargetPositionRelativeInRevolutions(values[2]);
            break;
        case 0x02: // motor right
            motorRight.setSpeedInRevolutionsPerSecond(values[0]);
            motorRight.setAccelerationInRevolutionsPerSecondPerSecond(values[1]);
            motorRight.setTargetPositionRelativeInRevolutions(values[2]);
            break;
        default: // bad command, e-stop
            stop();
        }
    }
}

void send()
{
    if (motorLeft.motionComplete() && motorRight.motionComplete())
    {
        Wire.write(0xff);
    }
    else
    {
        Wire.write(0x00);
    }
}

void stop()
{
    enableMotors(false);
    motorLeft.setTargetPositionToStop();
    motorRight.setTargetPositionToStop();
}

void enableMotors(bool enabled)
{
    digitalWrite(MOTOR_LEFT_ENABLE_PIN, enabled);
    digitalWrite(MOTOR_RIGHT_ENABLE_PIN, enabled);
    digitalWrite(STATUS_PIN, enabled);
}
