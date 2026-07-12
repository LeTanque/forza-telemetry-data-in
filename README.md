# Forza UDP Telemetry Parser 

Forza Motorsport 2023 is a simulation-like racing game for Xbox and PC.

Forza Horizon 6 is an arcade-like racing game for Xbox and PC.

## Goals

## Notes
The driver is part of the control loop:

  ```
  Driver
    ↓
  Steering / Brake / Throttle
    ↓
  Vehicle
    ↓
  Telemetry
    ↓
  Driver perception
    ↺
  ```

Questions I ask when consulting on tunes and tuning myself:

“What characteristics produce the fastest, most repeatable laps for this driver under these conditions, and how can telemetry help us identify them?”