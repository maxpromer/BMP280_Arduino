#ifndef __BMP280_Arduino_H__
#define __BMP280_Arduino_H__

#include <Arduino.h>
#include <Wire.h>
#include "bmp280.h"

static TwoWire *_bmp280_wire;

static int8_t i2c_reg_write(uint8_t i2c_addr, uint8_t reg_addr, uint8_t *reg_data, uint16_t length);
static int8_t i2c_reg_read(uint8_t i2c_addr, uint8_t reg_addr, uint8_t *reg_data, uint16_t length);

class BMP280 {
	private:
		uint8_t address = 0x26;
		
		struct bmp280_dev bmp;
		struct bmp280_config conf;
		struct bmp280_uncomp_data ucomp_data;
		
	public:
		BMP280(uint8_t addr = 0x26, TwoWire *bus = &Wire) ;
		
		bool begin() ;
		
		double readTemperature() ;
		double readPressure() ;
		
}
;

#endif