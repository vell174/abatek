import { metalShapes, standardChannelSizes } from '~/data/metal-calculator';
import type { MetalField, MetalShape } from '~/data/metal-calculator';

export type MetalDimensions = Record<MetalField, number>;

export interface MetalWeightInput {
  shape: MetalShape;
  dimensions: MetalDimensions;
  density: number;
  quantity: number;
  channelSize?: (typeof standardChannelSizes)[number]['id'];
}

export interface MetalWeightResult {
  totalKg: number;
  pieceKg: number;
  kgPerMeter: number | null;
  totalLiters: number;
}

export interface MetalLengthResult {
  totalMeters: number;
  pieceMeters: number;
  kgPerMeter: number;
}

export function calculateMetalLength({
  shape,
  dimensions,
  density,
  quantity,
  targetKg,
  channelSize,
}: MetalWeightInput & { targetKg: number }): MetalLengthResult | null {
  if (
    shape === 'flange' ||
    shape === 'elbow' ||
    !Number.isFinite(targetKg) ||
    targetKg <= 0 ||
    !Number.isInteger(quantity) ||
    quantity < 1
  )
    return null;

  const unitDimensions = { ...dimensions, length: 1, height: shape === 'sheet' ? 1000 : dimensions.height };
  const unitWeight = calculateMetalWeight({ shape, dimensions: unitDimensions, density, quantity: 1, channelSize });
  if (!unitWeight || !Number.isFinite(unitWeight.pieceKg) || unitWeight.pieceKg <= 0) return null;

  const totalMeters = targetKg / unitWeight.pieceKg;
  if (!Number.isFinite(totalMeters) || totalMeters <= 0) return null;
  return { totalMeters, pieceMeters: totalMeters / quantity, kgPerMeter: unitWeight.pieceKg };
}

export function calculateMetalWeight({
  shape,
  dimensions: d,
  density,
  quantity,
  channelSize,
}: MetalWeightInput): MetalWeightResult | null {
  if (!Number.isFinite(density) || density <= 0 || !Number.isInteger(quantity) || quantity < 1) return null;
  const selectedShape = metalShapes.find((item) => item.id === shape);
  if (!selectedShape || selectedShape.fields.some((field) => !Number.isFinite(d[field]) || d[field] <= 0)) return null;

  const circle = (diameter: number) => (Math.PI * diameter ** 2) / 4;
  const ring = (outer: number, inner: number) => circle(outer) - circle(inner);
  let areaMm2 = 0;
  let lengthMm: number | null = null;
  let volumeMm3 = 0;

  if (shape === 'channel') {
    const profile = standardChannelSizes.find((item) => item.id === channelSize);
    if (!profile) return null;
    const kgPerMeter = (profile.kgPerMeter * density) / 7850;
    const pieceKg = kgPerMeter * d.length;
    return {
      totalKg: pieceKg * quantity,
      pieceKg,
      kgPerMeter,
      totalLiters: (pieceKg * quantity * 1000) / density,
    };
  }

  switch (shape) {
    case 'sheet':
      if (d.width <= 0 || d.height <= 0 || d.thickness <= 0) return null;
      volumeMm3 = d.width * d.height * d.thickness;
      break;
    case 'strip':
      areaMm2 = d.width * d.thickness;
      lengthMm = d.length * 1000;
      break;
    case 'round':
    case 'rebar':
      areaMm2 = circle(d.diameter);
      lengthMm = d.length * 1000;
      break;
    case 'square':
      areaMm2 = d.width ** 2;
      lengthMm = d.length * 1000;
      break;
    case 'hexagon':
      areaMm2 = (Math.sqrt(3) / 2) * d.width ** 2;
      lengthMm = d.length * 1000;
      break;
    case 'round-pipe':
      if (d.wall * 2 >= d.diameter) return null;
      areaMm2 = ring(d.diameter, d.diameter - 2 * d.wall);
      lengthMm = d.length * 1000;
      break;
    case 'profile-pipe':
      if (d.wall * 2 >= Math.min(d.width, d.height)) return null;
      areaMm2 = d.width * d.height - (d.width - 2 * d.wall) * (d.height - 2 * d.wall);
      lengthMm = d.length * 1000;
      break;
    case 'angle':
      if (d.thickness >= Math.min(d.width, d.height)) return null;
      areaMm2 = d.thickness * (d.width + d.height - d.thickness);
      lengthMm = d.length * 1000;
      break;
    case 'beam':
      if (d.flangeThickness * 2 >= d.height || d.webThickness >= d.flangeWidth) return null;
      areaMm2 = 2 * d.flangeWidth * d.flangeThickness + (d.height - 2 * d.flangeThickness) * d.webThickness;
      lengthMm = d.length * 1000;
      break;
    case 'bent-channel':
      if (d.thickness * 2 >= Math.min(d.height, d.flangeWidth)) return null;
      areaMm2 = d.thickness * (d.height + 2 * d.flangeWidth - 2 * d.thickness);
      lengthMm = d.length * 1000;
      break;
    case 'flange':
      if (d.innerDiameter >= d.diameter) return null;
      volumeMm3 = ring(d.diameter, d.innerDiameter) * d.thickness;
      break;
    case 'elbow':
      if (d.wall * 2 >= d.diameter || d.bendAngle > 360 || d.bendRadius <= d.diameter / 2) return null;
      areaMm2 = ring(d.diameter, d.diameter - 2 * d.wall);
      lengthMm = (Math.PI * d.bendAngle * d.bendRadius) / 180;
      break;
  }

  if (lengthMm !== null) volumeMm3 = areaMm2 * lengthMm;
  if (!Number.isFinite(volumeMm3) || volumeMm3 <= 0) return null;

  const pieceKg = (volumeMm3 / 1_000_000_000) * density;
  return {
    totalKg: pieceKg * quantity,
    pieceKg,
    kgPerMeter: shape === 'elbow' || lengthMm === null ? null : (areaMm2 / 1_000_000) * density,
    totalLiters: (volumeMm3 * quantity) / 1_000_000,
  };
}
