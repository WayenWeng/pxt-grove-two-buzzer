# Grove Two Buzzer

A PXT packet for Seeed Studio Grove Two Buzzer

## Basic usage

```blocks
// Create a module driver, specify the i2c address
let buzzer = Grove_Two_Buzzer.create(DEVICE_ID_TYPE.GROVE_TWO_BUFFER_DEF_I2C_ADDR);

// Play tone by beats
for(let i = 0; i < 22; i ++)
{
    buzzer.playTone(i, BEAT_TYPE.BEAT_1_2);
    basic.pause(500);
}
```
More operation

Use ``getDeviceVID()`` to get vendor ID of device.

Use ``getDevicePID()`` to get product ID of device.

Use ``changeDeviceAddress()`` to change i2c address of device.

Use ``defaultDeviceAddress()`` to restore the i2c address of device to default.

Use ``turnOnLedFlash()`` to trun on the indicator LED flash mode.

Use ``turnOffLedFlash()`` to trun off the indicator LED flash mode.

Use ``enableAutoSleep()`` to enable device auto sleep mode.

Use ``disableAutoSleep()`` to disable device auto sleep mode.

Use ``ringTone()`` to play a tone for a given time duration.

Use ``stopPlay()`` to stop playing anything.

Use ``setTempoTo()`` to set tempo to a given beats per minute.

Use ``changeTempoBy()`` to change tempo by a given beats per minute.

Use ``getTempoTo()`` to get the current tempo as beats per minute.

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

