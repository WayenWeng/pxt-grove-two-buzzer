{
    let buzzer = Grove_Two_Buzzer.create(GROVE_TWO_BUZZER.DEF_I2C_ADDR);
    
    buzzer.turnOnLedFlash();
    basic.pause(3000);
    buzzer.turnOffLedFlash();
    
    while(true)
    {
        for(let i = 0; i < 22; i ++)
        {
            buzzer.playTone(i, BEAT_TYPE.BEAT_1_2);
            basic.pause(500);
        }
        
        // for(let i = 0; i < 22; i ++)
        // {
            // buzzer.ringTone(i, 1000);
            // basic.pause(1000);
        // }
    }
}