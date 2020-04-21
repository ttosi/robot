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
    motorLeft.setSpeedInRevolutionsPerSecond(1);
    motorLeft.setAccelerationInRevolutionsPerSecondPerSecond(1);

    // setup right servo motor
    motorRight.connectToPins(MOTOR_RIGHT_STEP_PIN, MOTOR_RIGHT_DIR_PIN);
    motorRight.setStepsPerRevolution(200);
    motorRight.setSpeedInRevolutionsPerSecond(1);
    motorRight.setAccelerationInRevolutionsPerSecondPerSecond(1);

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
    if (Wire.available())
    {
        int8_t data[byteCount];
        uint8_t index = 0;

        // data[0] motor selection
        //  0x00 = both motors stop (emergency stop!)
        //  0x01 = left motor
        //  0x02 = right motor
        //  0x03 = both motors
        // data[1] left motor number of revolutions (-128 - 127)
        // data[2] right motor number of revolutions (-128 - 127)
        // data[3] speed (0 - 255)
        // data[4] acceleration (0 - 255)
        while (Wire.available())
            data[index++] = Wire.read();

        if (data[0] > 0)
            enableMotors(true);
        
        switch (data[0])
        {
            case 0x00:
                motorLeft.setTargetPositionToStop();
                motorRight.setTargetPositionToStop();
                break;
            case 0x01:
                motorLeft.setSpeedInRevolutionsPerSecond(data[3]);
                motorLeft.setAccelerationInRevolutionsPerSecondPerSecond(data[4]);
                motorLeft.setTargetPositionRelativeInRevolutions(data[1]);
                break;
            case 0x02:
                motorRight.setSpeedInRevolutionsPerSecond(data[3]);
                motorLeft.setAccelerationInRevolutionsPerSecondPerSecond(data[4]);
                motorRight.setTargetPositionRelativeInRevolutions(data[2]);
                break;
            case 0x03:
                motorLeft.setSpeedInRevolutionsPerSecond(data[3]);
                motorRight.setSpeedInRevolutionsPerSecond(data[3]);
                motorLeft.setAccelerationInRevolutionsPerSecondPerSecond(data[4]);
                motorRight.setAccelerationInRevolutionsPerSecondPerSecond(data[4]);

                motorLeft.setTargetPositionRelativeInRevolutions(data[1]);
                motorRight.setTargetPositionRelativeInRevolutions(data[2]);
                break;
            default:
                motorLeft.setTargetPositionToStop();
                motorRight.setTargetPositionToStop();
        }
    }
}

void send()
{
    if(motorLeft.motionComplete() && motorRight.motionComplete())
    {
        Wire.write(0xff);
    }
    else
    {
        Wire.write(0x00);
    }
}

void setMotors()
{
}

void move(int revolutions)
{
}

void stop()
{
    enableMotors(false);
}

void enableMotors(bool enabled)
{
    digitalWrite(MOTOR_LEFT_ENABLE_PIN, enabled);
    digitalWrite(MOTOR_RIGHT_ENABLE_PIN, enabled);
    digitalWrite(STATUS_PIN, enabled);
}
