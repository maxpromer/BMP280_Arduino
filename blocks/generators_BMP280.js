Blockly.JavaScript['bmp280_begin'] = function(block) {
	var dropdown_address = block.getFieldValue('address');
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
	code += '#EXTINC#include <BMP280_Arduino.h>#END\n';
	code += '#EXTINC#include <Wire.h>#END\n';
	code += '#VARIABLE BMP280 bmp(' + dropdown_address + ', &' + WIRE_OBJ + ');#END\n';
	code += '\n';
	code += WIRE_OBJ + '.begin(' + SDA_PIN + ', ' + SCL_PIN + ');\n';
	code += 'bmp.begin();\n';
	return code;
};

Blockly.JavaScript['bmp280_read_temperature'] = function(block) {
	var code = 'bmp.readTemperature()';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['bmp280_read_pressure'] = function(block) {
	var code = 'bmp.readPressure()';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

