#!/bin/bash

set -eo pipefail

export RUSTFLAGS=-Dwarnings
export DEFMT_LOG=trace,embassy_hal_internal=debug,embassy_net_esp_hosted=debug,cyw43=info,cyw43_pio=info,smoltcp=info
if [[ -z "${CARGO_TARGET_DIR}" ]]; then
    export CARGO_TARGET_DIR=target_ci
fi

cargo +nightly build -Zunstable-options --release --manifest-path tests/nrf52840/Cargo.toml --target thumbv7em-none-eabi --out-dir out/tests/nrf52840-dk 

if [[ -z "${TELEPROBE_TOKEN-}" ]]; then
    echo No teleprobe token found, skipping running HIL tests
    exit
fi

teleprobe client run -r out/tests
