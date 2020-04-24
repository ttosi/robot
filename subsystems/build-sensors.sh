# arduino-cli compile -v -b arduino:avr:nano:cpu=atmega328old ~/Projects/ws2812b-test/
# arduino-cli upload -v -b arduino:avr:nano:cpu=atmega328old -p /dev/ttyUSB0 ws2812b-test/

#!/bin/bash
arduino-cli compile -v -b arduino:avr:nano:cpu=atmega328old ./sensors/ -u -p /dev/ttyUSB0
