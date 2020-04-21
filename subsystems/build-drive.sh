# arduino-cli core install arduino:avr
# arduino-cli lib install FlexyStepper
# arduino-cli sketch new ~/Projects/robot/subsystems/drive

arduino-cli compile -v -b arduino:avr:nano:cpu=atmega328 ~/Projects/robot/subsystems/drive/ -u -p /dev/ttyUSB0

