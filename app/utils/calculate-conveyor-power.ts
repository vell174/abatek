import type { ConveyorCalculatorInput } from '~/data/conveyor-calculator';
import { beltWidths } from '~/data/conveyor-calculator';

const lengthPoints = [
  6, 8, 10, 12, 14, 16, 18, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 250, 300, 350, 400, 450,
  500, 550, 600, 650, 700, 750, 800, 850, 900, 1000, 1100, 1200, 1300,
];
const dragValues = [
  6, 5.1, 4.5, 4.2, 3.9, 3.7, 3.4, 3.2, 2.9, 2.6, 2.4, 2.35, 2.2, 2.1, 2, 1.9, 1.75, 1.7, 1.6, 1.55, 1.5, 1.45, 1.38,
  1.32, 1.28, 1.24, 1.21, 1.19, 1.17, 1.15, 1.13, 1.12, 1.114, 1.104, 1.097, 1.095, 1.09, 1.087, 1.079, 1.072,
];
const inclineLengths = [100, 150, 200, 300, 400, 500, 600, 800];
const inclineValues = [1.04, 1.13, 1.15, 1.31, 1.35, 1.42, 1.47, 1.53];
const nominalPowers = [3, 4, 5.5, 7.5, 11, 15, 18.5, 22, 30, 37, 45, 55, 75, 90, 110, 132, 160, 200, 250, 315];
const upperSpacing = [
  [1.6, 1.5, 1.5, 1.5, 1.2, 1.2],
  [1.6, 1.5, 1.4, 1.2, 1.2, 1],
  [1.5, 1.4, 1.4, 1.2, 1, 1],
  [1.5, 1.4, 1.4, 1.4, 1.2, 1],
  [1.4, 1.4, 1.2, 1, 1, 0.9],
  [1.4, 1.2, 1.2, 1, 1, 0.9],
  [1.3, 1.2, 1.2, 1, 1, 0.9],
  [1.3, 1.2, 1.2, 1, 1, 0.9],
  [1.3, 1.2, 1.2, 1, 1, 0.9],
];
const friction = [
  [0.35, 0.3, 0.2, 0.1],
  [0.5, 0.4, 0.25, 0.15],
  [0.45, 0.35, 0.25, 0.1],
];
const beltLoads = [3.6, 4.6, 5.9, 8, 14, 16.8, 19.6, 26.7, 33.4];
const upperRollerLoads = [7.8, 8.2, 9.6, 19.2, 22.2, 26.2, 32, 33.5, 62.5];
const lowerRollerLoads = [2.2, 2.7, 4, 7, 8.5, 12.2, 17, 18, 28.5];
const resistanceShort = [
  [0.02, 0.02],
  [0.025, 0.025],
  [0.035, 0.045],
  [0.04, 0.055],
];
const resistanceLong = [
  [0.018, 0.018],
  [0.022, 0.022],
  [0.032, 0.042],
  [0.036, 0.05],
];

function interpolate(value: number, points: number[], results: number[]): number {
  if (value <= points[0]!) return results[0]!;
  for (let index = 1; index < points.length; index += 1) {
    if (value <= points[index]!) {
      const portion = (value - points[index - 1]!) / (points[index]! - points[index - 1]!);
      return results[index - 1]! + portion * (results[index]! - results[index - 1]!);
    }
  }
  return results.at(-1)!;
}

function densityBand(density: number): number {
  if (density <= 0.5) return 0;
  if (density <= 0.8) return 1;
  if (density <= 1.2) return 2;
  if (density <= 1.6) return 3;
  if (density <= 2) return 4;
  return 5;
}

function rollerDiameter(widthIndex: number, density: number): number {
  if (widthIndex <= 2) return density > 1.6 ? 108 : 89;
  if (widthIndex <= 5) return density <= 1.6 ? 108 : density > 2 ? 159 : 127;
  return 159;
}

export function calculateConveyorPower(input: ConveyorCalculatorInput) {
  const widthIndex = beltWidths.indexOf(input.beltWidth as (typeof beltWidths)[number]);
  const hasHorizontal = input.geometry !== 'inclined';
  const hasIncline = input.geometry !== 'horizontal';
  const horizontalLength = hasHorizontal ? input.horizontalLength : 0;
  const inclinedLength = hasIncline ? input.inclinedLength : 0;
  const angleRadians = ((hasIncline ? input.inclineAngle : 0) * Math.PI) / 180;
  const totalLength = horizontalLength + inclinedLength;
  const liftHeight = inclinedLength * Math.sin(angleRadians);
  const designThroughput = (input.throughput * input.unevenness) / (input.utilization * input.availability);
  const load = designThroughput / (3.6 * input.beltSpeed);
  const beltLoad = beltLoads[widthIndex]!;
  const upperRollerLoad = upperRollerLoads[widthIndex]!;
  const lowerRollerLoad = lowerRollerLoads[widthIndex]!;
  const dragCoefficient = interpolate(totalLength, lengthPoints, dragValues);
  const inclineCoefficient = totalLength < 100 ? 1 : interpolate(totalLength, inclineLengths, inclineValues);
  const resistanceCoefficient = (totalLength <= 100 ? resistanceShort : resistanceLong)[input.operatingConditions]![
    input.winter
  ]!;
  const force =
    dragCoefficient *
      inclineCoefficient *
      totalLength *
      resistanceCoefficient *
      (load + upperRollerLoad + lowerRollerLoad + 2 * beltLoad) +
    load * liftHeight;
  const requiredPower = (force * input.beltSpeed * input.lossFactor) / (100 * input.efficiency);
  const selectedPower = nominalPowers.find((power) => power >= requiredPower) ?? null;
  const tractionFactor = Math.exp(
    (friction[input.drumSurface]![input.operatingConditions]! * input.wrapAngle * Math.PI) / 180,
  );
  const tightTension = (force * tractionFactor) / (tractionFactor - 1);
  const slackTension = tightTension - force;
  const upperRollerSpacing = upperSpacing[widthIndex]![densityBand(input.density)]!;

  return {
    requiredPower,
    selectedPower,
    force,
    tightTension,
    slackTension,
    rollerDiameter: rollerDiameter(widthIndex, input.density),
    upperRollerSpacing,
    lowerRollerSpacing: Math.min(2 * upperRollerSpacing, 3),
    designThroughput,
    load,
    beltLoad,
    upperRollerLoad,
    lowerRollerLoad,
    dragCoefficient,
    inclineCoefficient,
    resistanceCoefficient,
    tractionFactor,
    totalLength,
    liftHeight,
  };
}

export type ConveyorCalculatorResult = ReturnType<typeof calculateConveyorPower>;
