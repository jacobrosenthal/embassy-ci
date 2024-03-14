#![no_std]
#![no_main]

use defmt::*;
use embassy_executor::Spawner;
use embassy_nrf::gpio::{Level, Output, OutputDrive};
use embassy_time::Timer;
use {defmt_rtt as _, panic_probe as _};

#[embassy_executor::main]
async fn main(_spawner: Spawner) {
    let p = embassy_nrf::init(Default::default());
    let mut led = Output::new(p.P0_13, Level::Low, OutputDrive::Standard);

    info!("led initilized!");
    info!("led initilized2!");
    info!("led initilized3!");
    info!("led initilized4!");
    info!("led initilized5!");
    info!("led initilized6!");
    info!("led initilized7!");
    info!("led initilized8!");
    info!("led initilized9!");

    loop {
        led.set_high();
        Timer::after_millis(300).await;
        led.set_low();
        Timer::after_millis(300).await;
    }
}
