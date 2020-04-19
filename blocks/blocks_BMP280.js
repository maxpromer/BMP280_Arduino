Blockly.Blocks['bmp280_read_temperature'] = {
	init: function() {
		this.jsonInit({
			"type": "bmp280_read_temperature",
			"message0": "BMP280 at %1 read temperature (*C)",
			"args0": [{
				"type": "field_dropdown",
				"name": "addr",
				"options": [
					[ "0x76", "0x76" ],
					[ "0x77", "0x77" ]
				]
			}],
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
			"message0": "BMP280 at %1 read pressure (Pa)",
			"args0": [{
				"type": "field_dropdown",
				"name": "addr",
				"options": [
					[ "0x76", "0x76" ],
					[ "0x77", "0x77" ]
				]
			}],
			"output": "Number",
			"colour": 135,
			"tooltip": "Read Pressure from BMP280",
			"helpUrl": "https://github.com/maxpromer/BMP280_Arduino"
		});
	}
};

Blockly.Blocks['bmp280_read_altitude'] = {
	init: function() {
		this.jsonInit({
			"type": "bmp280_read_altitude",
			"message0": "BMP280 at %1 read altitude (sea level=  %2 hPa)",
			"args0": [{
				"type": "field_dropdown",
				"name": "addr",
				"options": [
					[ "0x76", "0x76" ],
					[ "0x77", "0x77" ]
				]
			}, {
				"type": "field_number",
				"name": "seaLevelhPa",
				"value": 1013.25,
				"min": 0
			}],
			"inputsInline": true,
			"output": "Number",
			"colour": 135,
			"tooltip": "",
			"helpUrl": "https://github.com/maxpromer/BMP280_Arduino"
		});
	}
};
