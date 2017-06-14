
/**
 * 
 */
enum GROVE_TWO_BUZZER {
    DEF_I2C_ADDR = 0x08,  // The device i2c address in default
    VID = 0x2886,         // Vender ID of the device
    PID = 0x8003          // Product ID of the device
}

/**
 * 
 */
enum GROVE_TWO_BUZZER_CMD_TYPE {
    I2C_CMD_GET_DEV_ID = 0x00,      // This command gets device ID information
    I2C_CMD_PLAY_TONE = 0x01,       // This command plays a tone for a given beat
    I2C_CMD_RING_TONE = 0x02,       // This command plays a tone for a given duration
    I2C_CMD_PLAY_MELODY = 0x03,     // This command plays a melody
    I2C_CMD_PLAY_STOP = 0x04,       // This command stops playing anything 
    I2C_CMD_SET_BPM = 0x05,         // This command sets BPM
    I2C_CMD_CHG_BPM = 0x06,         // This command changes BPM 
    I2C_CMD_GET_BPM = 0x07,         // This command gets BPM
    I2C_CMD_LED_ON = 0xb0,          // This command turns on the indicator LED flash mode
    I2C_CMD_LED_OFF = 0xb1,         // This command turns off the indicator LED flash mode
    I2C_CMD_AUTO_SLEEP_ON = 0xb2,   // This command enable device auto sleep mode
    I2C_CMD_AUTO_SLEEP_OFF = 0xb3,  // This command disable device auto sleep mode (default mode)
    I2C_CMD_SET_ADDR = 0xc0,        // This command sets device i2c address
    I2C_CMD_RST_ADDR = 0xc1,        // This command resets device i2c address
}


/**
 * 
 */
enum GAMUT_TYPE {
    //% block=O
    NOTE_R0 = 0, // Null
    //% block=C4
	NOTE_C4 = 1, // Do
    //% block=D4
	NOTE_D4 = 2, // Re
    //% block=E4
	NOTE_E4 = 3, // Mi
    //% block=F4
	NOTE_F4 = 4, // Fa
    //% block=G4
	NOTE_G4 = 5, // So
    //% block=A4
	NOTE_A4 = 6, // La
    //% block=B4
	NOTE_B4 = 7, // Si
    //% block=C5
	NOTE_C5 = 8, // Do
    //% block=D5
	NOTE_D5 = 9, // Re
    //% block=E5
	NOTE_E5 = 10, // Mi
    //% block=F5
	NOTE_F5 = 11, // Fa
    //% block=G5
	NOTE_G5 = 12, // So
    //% block=A5
	NOTE_A5 = 13, // La
    //% block=B5
	NOTE_B5 = 14, // Si
    //% block=C6
	NOTE_C6 = 15, // Do
    //% block=D6
	NOTE_D6 = 16, // Re
    //% block=E6
	NOTE_E6 = 17, // Mi
    //% block=F6
	NOTE_F6 = 18, // Fa
    //% block=G6
	NOTE_G6 = 19, // So
    //% block=A6
	NOTE_A6 = 20, // La
    //% block=B6
	NOTE_B6 = 21, // Si
}

/**
 * 
 */
enum BEAT_TYPE
{
    //% block=1 beat
	BEAT_1 = 0,		// 1 beat, 60 * 1000 / BPM = 500 ms(BPM = 120)
    //% block=2 beat
	BEAT_2 = 1, 	// 2 beat, 1000 ms
    //% block=4 beat
	BEAT_4 = 2, 	// 4 beat, 2000 ms
    //% block=8 beat
	BEAT_8 = 3, 	// 8 beat, 4000 ms
    //% block=1/2 beat
	BEAT_1_2 = 4,	// 1/2 beat, 250 ms
    //% block=1/4 beat
	BEAT_1_4 = 5,	// 1/4 beat, 125 ms
    //% block=1/8 beat
	BEAT_1_8 = 6,	// 1/8 beat, 62.5 ms
    //% block=1/16 beat
	BEAT_1_16 = 7,	// 1/16 beat, 31.25 ms
};

/**
 * Functions to operate Grove Two Buzzer module.
 */
//% weight=10 color=#9F79EE icon="\uf108"
namespace Grove_Two_Buzzer
{
    let wakePin: DigitalPin = DigitalPin.P8;
    // let wakePin: DigitalPin = DigitalPin.P12;
    
    export function wakeupDevice()
    {
        pins.digitalWritePin(wakePin, 0);
        control.waitMicros(25);
        pins.digitalWritePin(wakePin, 1);
        control.waitMicros(25);
    }
    
    export function i2cSendByte(address: number, data: number)
    {
        let buf: Buffer = pins.createBuffer(1);
        buf[0] = data;
        wakeupDevice();
        pins.i2cWriteBuffer(address, buf, false);
    }
    
    export function i2cSendBytes(address: number, data: Buffer)
    {
        wakeupDevice();
        pins.i2cWriteBuffer(address, data, false);
    }
    
    export function i2cReceiveByte(address: number): number
    {
        let buf: Buffer = pins.createBuffer(1);
        wakeupDevice();
        buf = pins.i2cReadBuffer(address, 1, false);
        return buf[0];
    }
    
    export function i2cReceiveBytes(address: number, len: number): Buffer
    {
        let buf: Buffer = pins.createBuffer(len);
        wakeupDevice();
        buf = pins.i2cReadBuffer(address, len, false);
        return buf;
    }
    
    export class Buzzer
    {
        currentDeviceAddress: number;
        
                /**
         * Get vendor ID of device.
         */
        //% blockId=get_buzzer_vid block="%strip|get device vid"
        //% parts="Grove_Two_Buzzer" advanced=true
        getDeviceVID(): number
        {
            let data: Buffer = pins.createBuffer(4);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_BUZZER_CMD_TYPE.I2C_CMD_GET_DEV_ID);
            data = i2cReceiveBytes(this.currentDeviceAddress, 4);
            return (data[0] + data[1] * 256);
        }
        
        /**
         * Get product ID of device.
         */
        //% blockId=get_buzzer_pid block="%strip|get device pid"
        //% parts="Grove_Two_Buzzer" advanced=true
        getDevicePID(): number
        {
            let data: Buffer = pins.createBuffer(4);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_BUZZER_CMD_TYPE.I2C_CMD_GET_DEV_ID);
            data = i2cReceiveBytes(this.currentDeviceAddress, 4);
            return (data[2] + data[3] * 256);
        }
        
        /**
         * Change i2c address of device.
         * @param newAddress the new i2c address of device, eg: 8
         */
        //% blockId=change_buzzer_address block="%strip|change device address to|%newAddress"
        //% parts="Grove_Two_Buzzer" advanced=true
        changeDeviceAddress(newAddress: number = 8)
        {
            let data: Buffer = pins.createBuffer(2);
            data[0] = GROVE_TWO_BUZZER_CMD_TYPE.I2C_CMD_SET_ADDR;
            data[1] = newAddress;
            i2cSendBytes(this.currentDeviceAddress, data);
            this.currentDeviceAddress = newAddress;
        }
        
        /**
         * Restore the i2c address of device to default.
         */
        //% blockId=default_buzzer_address block="%strip|default device address"
        //% parts="Grove_Two_Buzzer" advanced=true
        defaultDeviceAddress()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_BUZZER_CMD_TYPE.I2C_CMD_RST_ADDR);
        }
        
        /**
         * Trun on the indicator LED flash mode.
         */
        //% blockId=turn_on_buzzer_led_flash block="%strip|turn on led flash"
        //% parts="Grove_Two_Buzzer" advanced=true
        turnOnLedFlash()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_BUZZER_CMD_TYPE.I2C_CMD_LED_ON);
        }
        
        /**
         * Trun off the indicator LED flash mode.
         */
        //% blockId=turn_off_buzzer_led_flash block="%strip|turn off led flash"
        //% parts="Grove_Two_Buzzer" advanced=true
        turnOffLedFlash()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_BUZZER_CMD_TYPE.I2C_CMD_LED_OFF);
        }
        
        /**
         * Enable device auto sleep mode.
         */
        //% blockId=enable_buzzer_auto_sleep block="%strip|enable auto sleep"
        //% parts="Grove_Two_Buzzer" advanced=true
        enableAutoSleep()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_BUZZER_CMD_TYPE.I2C_CMD_AUTO_SLEEP_ON);
        }
        
        /**
         * Disable device auto sleep mode.
         */
        //% blockId=disable_buzzer_auto_sleep block="%strip|disable auto sleep"
        //% parts="Grove_Two_Buzzer" advanced=true
        disableAutoSleep()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_BUZZER_CMD_TYPE.I2C_CMD_AUTO_SLEEP_OFF);
        }
        
        /**
         * Play a tone for a given beat.
         * @param gamut the tone needed to play.
         * @param beat set the beat as 1, 2, 4, 8, 1/2, 1/4, 1/8 or 1/16.
         */
        //% blockId=buzzer_play_tone block="%strip|play tone|%gamut|in|%beat|beats"
        playTone(gamut: GAMUT_TYPE, beat: BEAT_TYPE)
        {
            let data: Buffer = pins.createBuffer(3);
            data[0] = GROVE_TWO_BUZZER_CMD_TYPE.I2C_CMD_PLAY_TONE;
            data[1] = gamut;
            data[2] = beat;
            i2cSendBytes(this.currentDeviceAddress, data);
        }
        
        /**
         * Play a tone for a given time duration.
         * @param gamut the tone needed to play.
         * @param time set the time duration, unit ms.
         */
        //% blockId=buzzer_ring_tone block="%strip|ring tone|%gamut|in|%time|ms"
        ringTone(gamut: GAMUT_TYPE, time: number)
        {
            let data: Buffer = pins.createBuffer(4);
            data[0] = GROVE_TWO_BUZZER_CMD_TYPE.I2C_CMD_RING_TONE;
            data[1] = gamut;
            data[2] = time & 0xff;
            data[3] = (time >> 8) & 0xff;
            i2cSendBytes(this.currentDeviceAddress, data);
        }
        
        /**
         * Stop playing anything.
         */
        //% blockId=buzzer_stop_play block="%strip|stop play"
        //% parts="Grove_Two_Buzzer" advanced=true
        stopPlay()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_BUZZER_CMD_TYPE.I2C_CMD_PLAY_STOP);
        }
        
        /**
         * Set tempo to a given beats per minute.
         * @param bpm beats Per Minute, eg: 120
         */
        //% blockId=buzzer_set_tempo_to block="%strip|set tempo to|%bpm|bpm"
        //% parts="Grove_Two_Buzzer" advanced=true
        setTempoTo(bpm: number = 120)
        {
            let data: Buffer = pins.createBuffer(3);
            data[0] = GROVE_TWO_BUZZER_CMD_TYPE.I2C_CMD_SET_BPM;
            data[1] = bpm & 0xff;
            data[2] = (bpm >> 8) & 0xff;
            i2cSendBytes(this.currentDeviceAddress, data);
        }
        
        /**
         * Change tempo by a given beats per minute.
         * @param bpm increase tempo by +bpm, or decrease tempo by -bpm.
         */
        //% blockId=buzzer_change_tempo_by block="%strip|change tempo by|%bpm|bpm"
        //% parts="Grove_Two_Buzzer" advanced=true
        changeTempoBy(bpm: number)
        {
            let data: Buffer = pins.createBuffer(4);
            data[0] = GROVE_TWO_BUZZER_CMD_TYPE.I2C_CMD_CHG_BPM;
            if(bpm >= 0)data[1] = 1;
            else 
            {
                data[1] = 0;
                bpm = bpm * (-1);
            }
            data[2] = bpm & 0xff;
            data[3] = (bpm >> 8) & 0xff;
            i2cSendBytes(this.currentDeviceAddress, data);
        }
        
        /**
         * Get the current tempo as beats per minute.
         */
        //% blockId=get_buzzer_tempo_to block="%strip|get tempo"
        //% parts="Grove_Two_Buzzer" advanced=true
        getTempoTo(): number
        {
            let data: Buffer = pins.createBuffer(2);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_BUZZER_CMD_TYPE.I2C_CMD_GET_BPM);
            data = i2cReceiveBytes(this.currentDeviceAddress, 2);
            return (data[0] + data[1] * 256);
        }
    }
    
    /**
     * Create a new driver for buzzer
     * @param address the address of device, eg: 8
     */
    //% blockId=create_buzzer block="create module and set address|%address"
    export function create(address: number = 8): Buzzer
    {
        let buzzer = new Buzzer();
        buzzer.currentDeviceAddress = address;
        return buzzer;
    }
}
