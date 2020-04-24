# arduino-cli core install arduino:avr
# arduino-cli lib install FlexyStepper
# arduino-cli sketch new ~/Projects/robot/subsystems/drive

#!/bin/bash
arduino-cli compile -v -b arduino:avr:nano:cpu=atmega328 ./drive/ -u -p /dev/ttyUSB1

