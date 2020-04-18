Blockly.JavaScript['bmp280_begin'] = function(block) {
	var dropdown_address = block.getFieldValue('addr');
	var WIRE_OBJ = 'Wire';
	var SDA_PIN = 21, SCL_PIN = 22; 

	var board_name = Vue.prototype.$global.board.board_info.name;
	if (board_name == 'kidbright-arduino' || board_name == 'openkb') {
		WIRE_OBJ = 'Wire1';
		SDA_PIN = 4;
		SCL_PIN = 5;
	} else if (board_name == 'ipst-wifi') {

	}

	var code = '';
	code += '#EXTINC#include <Adafruit_BMP280.h>#END\n';
	code += '#EXTINC#include <Wire.h>#END\n';
	code += '#VARIABLE Adafruit_BMP280 bmp' + dropdown_address + '(&' + WIRE_OBJ + ');#END\n';
	code += '\n';
	code += '#SETUP ' + WIRE_OBJ + '.begin(' + SDA_PIN + ', ' + SCL_PIN + '); #END\n';
	code += '#SETUP bmp' + dropdown_address + '.begin(' + dropdown_address + '); #END\n';
	code += '#SETUP bmp' + dropdown_address + '.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Operating Mode. */\n';
    code += '      Adafruit_BMP280::SAMPLING_X2,     /* Temp. oversampling */\n';
    code += '      Adafruit_BMP280::SAMPLING_X16,    /* Pressure oversampling */\n';
    code += '      Adafruit_BMP280::FILTER_X16,      /* Filtering. */\n';
    code += '      Adafruit_BMP280::STANDBY_MS_500); /* Standby time. */\n #END\n';
	return code;
};

Blockly.JavaScript['bmp280_read_temperature'] = function(block) {
	var dropdown_address = block.getFieldValue('addr');
	var code = Blockly.JavaScript['bmp280_begin'](block) + 'bmp' + dropdown_address + '.readTemperature()';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['bmp280_read_pressure'] = function(block) {
	var dropdown_address = block.getFieldValue('addr');
	var code = Blockly.JavaScript['bmp280_begin'](block) + 'bmp' + dropdown_address + '.readPressure()';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

