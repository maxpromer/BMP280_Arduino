Blockly.Blocks['bmp280_begin'] = {
	init: function() {
		this.appendDummyInput()
			.appendField("BMP280 begin at")
			.appendField(new Blockly.FieldDropdown([["0x76","0x76"], ["0x77","0x77"]]), "address");
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(135);
		this.setTooltip("Config BMP280 to ready for read data from I2C");
		this.setHelpUrl("https://github.com/maxpromer/BMP280_Arduino");
	}
};


Blockly.Blocks['bmp280_read_temperature'] = {
	init: function() {
		this.jsonInit({
			"type": "bmp280_read_temperature",
			"message0": "BMP280 read temperature (*C)",
			"output": "Number",
			"colour": 135,
			"tooltip": "Read Temperature from BMP280",
			"helpUrl": "https://github.com/maxpromer/BMP280_Arduino"
		});
	}
};

Blockly.Blocks['bmp280_read_pressure'] = {
	init: function() {
		this.jsonInit({
			"type": "bmp280_read_pressure",
			"message0": "BMP280 read pressure (Pa)",
			"output": "Number",
			"colour": 135,
			"tooltip": "Read Pressure from BMP280",
			"helpUrl": "https://github.com/maxpromer/BMP280_Arduino"
		});
	}
};
