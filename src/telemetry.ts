// telemetry.ts

export interface ForzaTelemetry {
  // Header
  isRaceOn: boolean;
  timestampMS: number;

  // Engine
  engineMaxRpm: number;
  engineIdleRpm: number;
  currentEngineRpm: number;

  // In the car's local space; X = right, Y = up, Z = forward
  accelerationX: number;
  accelerationY: number;
  accelerationZ: number;

  // In the car's local space; X = right, Y = up, Z = forward
  velocityX: number;
  velocityY: number;
  velocityZ: number;

  // Angular velocity in the car's local space (rad/s); X = pitch, Y = yaw, Z = roll
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

  // Wheel On Rumble
  wheelOnRumbleStripSpeedFL: number;
  wheelOnRumbleStripSpeedFR: number;
  wheelOnRumbleStripSpeedRL: number;
  wheelOnRumbleStripSpeedRR: number;

  // Wheel In Puddle
  wheelInPuddleFL: number;
  wheelInPuddleFR: number;
  wheelInPuddleRL: number;
  wheelInPuddleRR: number;

  // Surface Rumble
  surfaceRumbleFL: number;
  surfaceRumbleFR: number;
  surfaceRumbleRL: number;
  surfaceRumbleRR: number;

  // Suspension Velocity
  suspensionVelocityFL: number;
  suspensionVelocityFR: number;
  suspensionVelocityRL: number;
  suspensionVelocityRR: number;

  // Unique ID of car make/model
  carOrdinal: number;

  // Car class (0-7)
  carClass: number;

  // Car Performance Index
  carPI: number;

  // Drivetrain Type
  drivetrainType: number;

  // Number of Cyliners
  numCylinders: number;

  // Car group ID
  carGroup: number;

  // Velocity loss from smashable object collision (m/s)
  smashableVelocityVelDelta: number;

  //  Mass of recently hit smashable object (kg)
  smashableMass: number;

  // Position in world space (meters)
  positionX: number;
  positionY: number;
  positionZ: number;

  // Speed in meters per second
  speed: number;
  // Power in Watts
  power: number;
  // Torque in newton-meters
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

    // Wheel Rotation Speed

    wheelRotationSpeedFL: f32(),
    wheelRotationSpeedFR: f32(),
    wheelRotationSpeedRL: f32(),
    wheelRotationSpeedRR: f32(),

    // Wheel Rotation Speed

    wheelOnRumbleStripSpeedFL: i32(),
    wheelOnRumbleStripSpeedFR: i32(),
    wheelOnRumbleStripSpeedRL: i32(),
    wheelOnRumbleStripSpeedRR: i32(),

    // Wheel Rotation Speed

    wheelInPuddleFL: i32(),
    wheelInPuddleFR: i32(),
    wheelInPuddleRL: i32(),
    wheelInPuddleRR: i32(),

    // Surface Rumble

    surfaceRumbleFL: f32(),
    surfaceRumbleFR: f32(),
    surfaceRumbleRL: f32(),
    surfaceRumbleRR: f32(),

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

    // Suspension Velocity

    suspensionVelocityFL: f32(),
    suspensionVelocityFR: f32(),
    suspensionVelocityRL: f32(),
    suspensionVelocityRR: f32(),

    // Car UID

    carOrdinal: i32(),

    // Car Class

    carClass: i32(),

    // Car PI

    carPI: i32(),

    // Drivetrain type

    drivetrainType: i32(),

    // Number of Cylinders

    numCylinders: i32(),
    // ! -- BEGIN THESE VALUES ARE NOT PRESENT IN FORZA MS 2023
    // Car group

    carGroup: u32(),

    // Velocity loss from smashable object collision (m/s)

    smashableVelocityVelDelta: f32(),

    // Mass of recently hit smashable object (kg)

    smashableMass: f32(),
    // ! -- END THESE VALUES ARE NOT PRESENT IN FORZA MS 2023

    // Position in world space (meters)

    positionX: f32(),
    positionY: f32(),
    positionZ: f32(),

    // Speed in meters per second

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

    drivingLine: i8(),
    aiBrakeDifference: i8(),
  };
}
