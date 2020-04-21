# arduino-cli core install arduino:avr
# arduino-cli sketch new ~/Projects/robot/i2c-test

arduino-cli compile -v -b arduino:avr:nano:cpu=atmega328 ~/Projects/robot/tests/i2c-test/ -u -p /dev/ttyUSB0
