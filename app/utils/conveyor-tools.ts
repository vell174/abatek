export type WidthInput = {
  throughput: number;
  pieceSize: number;
  density: number;
  speed: number;
  inclineRange: number;
  sideRollAngle: number;
  reposeRange: number;
  cargoType: number;
  unevenness: number;
  utilization: number;
  availability: number;
};

export type OperatingInput = {
  pieceSize: number;
  abrasiveness: number;
  densityFactor: number;
  dropFactor: number;
  loadingFactor: number;
  temperature: number;
  moisture: number;
  service: number;
};

export type SpeedInput = { rpm: number; drumDiameter: number };

const carryingFactors = [
  [
    [257, 277, 294, 313],
    [296, 319, 338, 358],
  ],
  [
    [245, 262, 279, 295],
    [282, 302, 320, 340],
  ],
  [
    [232, 250, 264, 280],
    [267, 288, 304, 322],
  ],
  [
    [225, 240, 250, 265],
    [259, 276, 288, 305],
  ],
];
const standardWidths = [300, 400, 500, 650, 800, 1000, 1200, 1400, 1600, 2000, 2500, 3000];

export function calculateBeltWidth(input: WidthInput) {
  const designThroughput = (input.throughput * input.unevenness) / (input.utilization * input.availability);
  const carryingFactor = carryingFactors[input.inclineRange]![input.sideRollAngle]![input.reposeRange]!;
  const throughputWidth = Math.sqrt(designThroughput / (carryingFactor * input.speed * input.density)) * 1000;
  const pieceWidth = (input.cargoType === 0 ? 2 : 3.3) * input.pieceSize + 200;
  const requiredWidth = Math.max(throughputWidth, pieceWidth);
  const standardWidth = standardWidths.find((width) => width >= requiredWidth) ?? null;
  return { designThroughput, carryingFactor, throughputWidth, pieceWidth, requiredWidth, standardWidth };
}

export function calculateOperatingConditions(input: OperatingInput) {
  const densityPoints = input.pieceSize * input.densityFactor;
  const dropPoints = input.pieceSize * input.dropFactor;
  const loadingPoints = input.abrasiveness * input.loadingFactor;
  const totalPoints =
    input.pieceSize +
    input.abrasiveness +
    densityPoints +
    dropPoints +
    loadingPoints +
    input.temperature +
    input.moisture +
    input.service;
  const category = totalPoints <= 20 ? 0 : totalPoints <= 50 ? 1 : totalPoints <= 75 ? 2 : totalPoints <= 100 ? 3 : 4;
  return { totalPoints, category, densityPoints, dropPoints, loadingPoints };
}

export function calculateConveyorSpeed(input: SpeedInput) {
  const angularVelocity = (2 * Math.PI * input.rpm) / 60;
  const linearSpeed = (angularVelocity * input.drumDiameter) / 2000;
  return { angularVelocity, linearSpeed };
}
