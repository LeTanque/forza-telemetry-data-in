// telemetry.ts

export interface ForzaTelemetry {
  // Header
  isRaceOn: boolean;
  timestampMS: number;

  // Engine
  engineMaxRpm: number;
  engineIdleRpm: number;
  currentEngineRpm: number;

  // Motion
  accelerationX: number;
  accelerationY: number;
  accelerationZ: number;

  velocityX: number;
  velocityY: number;
  velocityZ: number;

  angularVelocityX: number;
  angularVelocityY: number;
  angularVelocityZ: number;

  yaw: number;
  pitch: number;
  roll: number;

  // Suspension
  suspensionTravelMetersFL: number;
  suspensionTravelMetersFR: number;
  suspensionTravelMetersRL: number;
  suspensionTravelMetersRR: number;

  // Tire Slip
  tireSlipRatioFL: number;
  tireSlipRatioFR: number;
  tireSlipRatioRL: number;
  tireSlipRatioRR: number;

  tireSlipAngleFL: number;
  tireSlipAngleFR: number;
  tireSlipAngleRL: number;
  tireSlipAngleRR: number;

  combinedSlipFL: number;
  combinedSlipFR: number;
  combinedSlipRL: number;
  combinedSlipRR: number;

  // Wheel Speed
  wheelRotationSpeedFL: number;
  wheelRotationSpeedFR: number;
  wheelRotationSpeedRL: number;
  wheelRotationSpeedRR: number;

  // Suspension Velocity
  suspensionVelocityFL: number;
  suspensionVelocityFR: number;
  suspensionVelocityRL: number;
  suspensionVelocityRR: number;

  // Car
  speed: number;
  power: number;
  torque: number;

  // Tire Temps
  tireTempFL: number;
  tireTempFR: number;
  tireTempRL: number;
  tireTempRR: number;

  // Boost / Fuel / Distance
  boost: number;
  fuel: number;
  distanceTraveled: number;
  bestLap: number;
  lastLap: number;
  currentLap: number;
  currentRaceTime: number;

  lapNumber: number;
  racePosition: number;

  // Controls
  accelerator: number;
  brake: number;
  clutch: number;
  handbrake: number;

  gear: number;
  steer: number;

  drivingLine: number;
  aiBrakeDifference: number;
}

export function decodeTelemetry(msg: Buffer): ForzaTelemetry {
  let o = 0;

  const i32 = () => {
    const v = msg.readInt32LE(o);
    o += 4;
    return v;
  };

  const u32 = () => {
    const v = msg.readUInt32LE(o);
    o += 4;
    return v;
  };

  const f32 = () => {
    const v = msg.readFloatLE(o);
    o += 4;
    return v;
  };

  const u16 = () => {
    const v = msg.readUInt16LE(o);
    o += 2;
    return v;
  };

  const u8 = () => {
    const v = msg.readUInt8(o);
    o += 1;
    return v;
  };

  const i8 = () => {
    const v = msg.readInt8(o);
    o += 1;
    return v;
  };

  return {
    // Header

    isRaceOn: i32() !== 0,
    timestampMS: u32(),

    // Engine

    engineMaxRpm: f32(),
    engineIdleRpm: f32(),
    currentEngineRpm: f32(),

    // Acceleration

    accelerationX: f32(),
    accelerationY: f32(),
    accelerationZ: f32(),

    // Velocity

    velocityX: f32(),
    velocityY: f32(),
    velocityZ: f32(),

    // Angular Velocity

    angularVelocityX: f32(),
    angularVelocityY: f32(),
    angularVelocityZ: f32(),

    // Orientation

    yaw: f32(),
    pitch: f32(),
    roll: f32(),

    // Suspension Travel

    suspensionTravelMetersFL: f32(),
    suspensionTravelMetersFR: f32(),
    suspensionTravelMetersRL: f32(),
    suspensionTravelMetersRR: f32(),

    // Tire Slip Ratio

    tireSlipRatioFL: f32(),
    tireSlipRatioFR: f32(),
    tireSlipRatioRL: f32(),
    tireSlipRatioRR: f32(),

    // Tire Slip Angle

    tireSlipAngleFL: f32(),
    tireSlipAngleFR: f32(),
    tireSlipAngleRL: f32(),
    tireSlipAngleRR: f32(),

    // Combined Slip

    combinedSlipFL: f32(),
    combinedSlipFR: f32(),
    combinedSlipRL: f32(),
    combinedSlipRR: f32(),

    // Wheel Rotation Speed

    wheelRotationSpeedFL: f32(),
    wheelRotationSpeedFR: f32(),
    wheelRotationSpeedRL: f32(),
    wheelRotationSpeedRR: f32(),

    // Suspension Velocity

    suspensionVelocityFL: f32(),
    suspensionVelocityFR: f32(),
    suspensionVelocityRL: f32(),
    suspensionVelocityRR: f32(),

    // Car

    speed: f32(),
    power: f32(),
    torque: f32(),

    // Tire Temps

    tireTempFL: f32(),
    tireTempFR: f32(),
    tireTempRL: f32(),
    tireTempRR: f32(),

    // Misc

    boost: f32(),
    fuel: f32(),
    distanceTraveled: f32(),

    bestLap: f32(),
    lastLap: f32(),
    currentLap: f32(),
    currentRaceTime: f32(),

    lapNumber: u16(),
    racePosition: u8(),

    accelerator: u8(),
    brake: u8(),
    clutch: u8(),
    handbrake: u8(),

    gear: u8(),
    steer: i8(),

    drivingLine: u8(),
    aiBrakeDifference: i8(),
  };
}
