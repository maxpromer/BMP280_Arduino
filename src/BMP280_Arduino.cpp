#ifndef __BMP280_Arduino_CPP__
#define __BMP280_Arduino_CPP__

#include "BMP280_Arduino.h"

BMP280::BMP280(uint8_t addr, TwoWire *bus) {
	address = addr;
	_bmp280_wire = bus;
}

bool BMP280::begin() {
	/* Map the delay function pointer with the function responsible for implementing the delay */
    bmp.delay_ms = delay;

    /* Assign device I2C address based on the status of SDO pin (GND for PRIMARY(0x76) & VDD for SECONDARY(0x77)) */
    bmp.dev_id = address;

    /* Select the interface mode as I2C */
    bmp.intf = BMP280_I2C_INTF;

    /* Map the I2C read & write function pointer with the functions responsible for I2C bus transfer */
    bmp.read = i2c_reg_read;
    bmp.write = i2c_reg_write;

    /* To enable SPI interface: comment the above 4 lines and uncomment the below 4 lines */

    /*
     * bmp.dev_id = 0;
     * bmp.read = spi_reg_read;
     * bmp.write = spi_reg_write;
     * bmp.intf = BMP280_SPI_INTF;
     */
    if (bmp280_init(&bmp) != BMP280_OK) return false;

    /* Always read the current settings before writing, especially when
     * all the configuration is not modified
     */
    if (bmp280_get_config(&conf, &bmp) != BMP280_OK) return false;

    /* configuring the temperature oversampling, filter coefficient and output data rate */
    /* Overwrite the desired settings */
    conf.filter = BMP280_FILTER_COEFF_2;

    /* Pressure oversampling set at 4x */
    conf.os_pres = BMP280_OS_4X;

    /* Setting the output data rate as 62.5ms */
    conf.odr = BMP280_ODR_62_5_MS;
    if (bmp280_set_config(&conf, &bmp) != BMP280_OK) return false;

    /* Always set the power mode after setting the configuration */
    if (bmp280_set_power_mode(BMP280_NORMAL_MODE, &bmp) != BMP280_OK) return false;
	
	return true;
}

double BMP280::readTemperature() {
	struct bmp280_uncomp_data ucomp_data;
    double temp;
	
	/* Reading the raw data from sensor */
    if (bmp280_get_uncomp_data(&ucomp_data, &bmp) != BMP280_OK) return 0;
	
	/* Getting the compensated temperature as floating point value */
	if (bmp280_get_comp_temp_double(&temp, ucomp_data.uncomp_temp, &bmp)) return 0;
	
	return temp;
}

double BMP280::readPressure() {
	struct bmp280_uncomp_data ucomp_data;
    double pres;
	
	/* Reading the raw data from sensor */
    if (bmp280_get_uncomp_data(&ucomp_data, &bmp) != BMP280_OK) return 0;
	
	/* Getting the compensated pressure as floating point value */
	if (bmp280_get_comp_pres_double(&pres, ucomp_data.uncomp_press, &bmp)) return 0;
	
	return pres;
}


/*!
 *  @brief Function for writing the sensor's registers through I2C bus.
 *
 *  @param[in] i2c_addr : sensor I2C address.
 *  @param[in] reg_addr : Register address.
 *  @param[in] reg_data : Pointer to the data buffer whose value is to be written.
 *  @param[in] length   : No of bytes to write.
 *
 *  @return Status of execution
 *  @retval 0 -> Success
 *  @retval >0 -> Failure Info
 *
 */
int8_t i2c_reg_write(uint8_t i2c_addr, uint8_t reg_addr, uint8_t *reg_data, uint16_t length)
{
	_bmp280_wire->beginTransmission(i2c_addr);
	_bmp280_wire->write(reg_addr);
	_bmp280_wire->write(reg_data, length);
	return _bmp280_wire->endTransmission();
}

/*!
 *  @brief Function for reading the sensor's registers through I2C bus.
 *
 *  @param[in] i2c_addr : Sensor I2C address.
 *  @param[in] reg_addr : Register address.
 *  @param[out] reg_data    : Pointer to the data buffer to store the read data.
 *  @param[in] length   : No of bytes to read.
 *
 *  @return Status of execution
 *  @retval 0 -> Success
 *  @retval >0 -> Failure Info
 *
 */
int8_t i2c_reg_read(uint8_t i2c_addr, uint8_t reg_addr, uint8_t *reg_data, uint16_t length)
{
	_bmp280_wire->beginTransmission(i2c_addr);
	_bmp280_wire->write(reg_addr);
	uint8_t code = _bmp280_wire->endTransmission(false);
	if (code != 0) {
		return code;
	}
	int count = _bmp280_wire->requestFrom(i2c_addr, length);
	for (int i=0;i<count;i++) {
		reg_data[i] = _bmp280_wire->read();
	}
	
	return 0;
}

#endif
