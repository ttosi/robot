# arduino-cli core install arduino:avr
# arduino-cli sketch new ~/Projects/robot/serial-test

arduino-cli compile -v -b arduino:avr:nano:cpu=atmega328 ~/Projects/robot/serial-test/ -u -p /dev/ttyUSB0
