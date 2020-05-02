#!/bin/bash
arduino-cli compile -v -b arduino:avr:nano:cpu=atmega328old ./sensors/ -u -p /dev/ttyUSB0
