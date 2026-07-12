// @ts-check
// server.js (Node.js)
import express from "express";
import http from "http";
import socketIo from "socket.io";
import * as dgram from "dgram";
import path from "path";
import { ForzaTelemetry } from "./telemetry";
import { decodeTelemetry } from "./telemetry";

const app = express();

app.use(express.static(path.join(__dirname, "../react-app/build")));

const udpMessage = dgram.createSocket("udp4");

const PORT = 5300; // Choose a port to listen on

udpMessage.bind(PORT);

udpMessage.on("error", (err: any) => {
  console.error(`Server ERROR >>> \n${err.stack}`);
  udpMessage.close();
});

const debug = true;

// server.on("listening", () => {
//   const address = server.address();
//   console.log(`UDP LISTENING >>> ${address.address}:${address.port}`);
// });

// S Signed Integer
// U Unsigned Integer
// F Floating Point

udpMessage.on("message", (msg: Buffer, rinfo: dgram.RemoteInfo) => {
  // console.log(msg);
  const telemetry = decodeTelemetry(msg);
  console.log("--------------------------------");
  console.log(
    "\nStatus: ",
    telemetry.isRaceOn ? "Fucking send it" : "Idle"
    // telemetry.timestampMS
  );

  if (telemetry.isRaceOn && !!debug) {
    console.log("\nSpeed", telemetry.speed.toFixed(1));
    console.log("RPM  ", telemetry.currentEngineRpm.toFixed(1));
    console.log(
      "Gear ",
      telemetry.gear === 0 ? "R" : telemetry.gear,
      telemetry.clutch === 0 ? "clutch out" : "clutch IN"
    );
    console.log(
      "\nCar Class",
      telemetry.carClass === 0
        ? `D${telemetry.carPI}`
        : telemetry.carClass === 1
        ? `C${telemetry.carPI}`
        : telemetry.carClass === 2
        ? `B${telemetry.carPI}`
        : telemetry.carClass === 3
        ? `A${telemetry.carPI}`
        : telemetry.carClass === 4
        ? `S1${telemetry.carPI}`
        : telemetry.carClass === 5
        ? `S2${telemetry.carPI}`
        : telemetry.carClass === 6
        ? `R${telemetry.carPI}`
        : telemetry.carClass === 7
        ? `X${telemetry.carPI}`
        : undefined,
      telemetry.drivetrainType === 0
        ? "FWD"
        : telemetry.drivetrainType === 1
        ? "RWD"
        : telemetry.drivetrainType === 2
        ? "AWD"
        : undefined,
      telemetry.carOrdinal
    );

    console.log("\nBoost", telemetry.boost.toFixed(2));
    console.log("Fuel", telemetry.fuel.toFixed(2));
    console.log("Accelerator", telemetry.accelerator);
    console.log("Brake", telemetry.brake);
    console.log("Distance Traveled", telemetry.distanceTraveled.toFixed(1));

    console.log("\nPower", telemetry.power.toFixed(3));
    console.log("Torque", telemetry.torque.toFixed(3));
    console.log("Max RPM", telemetry.engineMaxRpm.toFixed(1));

    console.log("\nYaw", telemetry.yaw.toFixed(2));
    console.log("Pitch", telemetry.pitch.toFixed(2));
    console.log("Roll", telemetry.roll.toFixed(2));

    console.log("\nAcceleration X", telemetry.accelerationX.toFixed(8));
    console.log("Acceleration Y", telemetry.accelerationY.toFixed(8));
    console.log("Acceleration Z", telemetry.accelerationZ.toFixed(8));

    console.log("\nVelocity X", telemetry.velocityX.toFixed(4));
    console.log("Velocity Y", telemetry.velocityY.toFixed(4));
    console.log("Velocity Z", telemetry.velocityZ.toFixed(4));

    console.log("Angular Velocity X", telemetry.angularVelocityX.toFixed(4));
    console.log("Angular Velocity Y", telemetry.angularVelocityY.toFixed(4));
    console.log("Angular Velocity Z", telemetry.angularVelocityZ.toFixed(4));

    console.log(
      "\nSuspension Travel Meters FL",
      telemetry.suspensionTravelMetersFL.toFixed(8)
    );
    console.log(
      "Suspension Travel Meters FR",
      telemetry.suspensionTravelMetersFR.toFixed(8)
    );
    console.log(
      "Suspension Travel Meters RL",
      telemetry.suspensionTravelMetersRL.toFixed(8)
    );
    console.log(
      "Suspension Travel Meters RR",
      telemetry.suspensionTravelMetersRR.toFixed(8)
    );

    console.log("\nTire Slip Ratio FL", telemetry.tireSlipRatioFL.toFixed(8));
    console.log("Tire Slip Ratio FR", telemetry.tireSlipRatioFR.toFixed(8));
    console.log("Tire Slip Ratio RL", telemetry.tireSlipRatioRL.toFixed(8));
    console.log("Tire Slip Ratio RR", telemetry.tireSlipRatioRR.toFixed(8));

    console.log("\nTire Slip Angle FL", telemetry.tireSlipAngleFL.toFixed(2));
    console.log("Tire Slip Angle FR", telemetry.tireSlipAngleFR.toFixed(2));
    console.log("Tire Slip Angle RL", telemetry.tireSlipAngleRL.toFixed(2));
    console.log("Tire Slip Angle RR", telemetry.tireSlipAngleRR.toFixed(2));

    console.log("\nCombined Slip FL", telemetry.combinedSlipFL.toFixed(2));
    console.log("Combined Slip FR", telemetry.combinedSlipFR.toFixed(2));
    console.log("Combined Slip RL", telemetry.combinedSlipRL.toFixed(2));
    console.log("Combined Slip RR", telemetry.combinedSlipRR.toFixed(2));

    console.log("\nWheel Rotation Speed FL", telemetry.wheelRotationSpeedFL);
    console.log("Wheel Rotation Speed FR", telemetry.wheelRotationSpeedFR);
    console.log("Wheel Rotation Speed RL", telemetry.wheelRotationSpeedRL);
    console.log("Wheel Rotation Speed RR", telemetry.wheelRotationSpeedRR);

    console.log("\nSuspension Velocity FL", telemetry.suspensionVelocityFL);
    console.log("Suspension Velocity FR", telemetry.suspensionVelocityFR);
    console.log("Suspension Velocity RL", telemetry.suspensionVelocityRL);
    console.log("Suspension Velocity RR", telemetry.suspensionVelocityRR);

    console.log("\nTire Temp FL", telemetry.tireTempFL.toFixed(2));
    console.log("Tire Temp FR", telemetry.tireTempFR.toFixed(2));
    console.log("Tire Temp RL", telemetry.tireTempRL.toFixed(2));
    console.log("Tire Temp RR", telemetry.tireTempRR.toFixed(2));
  }
});
