export interface ScrewFlightInput {
  outerDiameter: number;
  innerDiameter: number;
  pitch: number;
  thickness: number;
  density: number;
}

export interface ScrewFlightResult {
  outerHelixLength: number;
  innerHelixLength: number;
  flightHeight: number;
  sectorAngleRad: number;
  sectorAngleDeg: number;
  cutoutAngleRad: number;
  cutoutAngleDeg: number;
  blankOuterDiameter: number;
  blankInnerDiameter: number;
  outerCutoutWidth: number;
  innerCutoutWidth: number;
  blankMassGrams: number;
}

// Формулы ячеек D9:D20 пользовательской книги расчёта развертки витка шнека.
export function calculateScrewFlight(input: ScrewFlightInput): ScrewFlightResult | null {
  const { outerDiameter: D, innerDiameter: d, pitch: t, thickness: s, density: rho } = input;
  if (![D, d, t, s, rho].every((value) => Number.isFinite(value) && value > 0) || D <= d) return null;

  const outerHelixLength = Math.hypot(Math.PI * D, t);
  const innerHelixLength = Math.hypot(Math.PI * d, t);
  const flightHeight = (D - d) / 2;
  const sectorAngleRad = (outerHelixLength - innerHelixLength) / flightHeight;
  if (!Number.isFinite(sectorAngleRad) || sectorAngleRad <= 0 || sectorAngleRad > 2 * Math.PI) return null;
  const cutoutAngleRad = 2 * Math.PI - sectorAngleRad;
  const blankOuterDiameter = (2 * outerHelixLength) / sectorAngleRad;
  const blankInnerDiameter = (2 * innerHelixLength) / sectorAngleRad;
  const outerCutoutWidth = blankOuterDiameter * Math.sin(cutoutAngleRad / 2);
  const innerCutoutWidth = blankInnerDiameter * Math.sin(cutoutAngleRad / 2);
  const blankMassGrams =
    (s * Math.PI * (blankOuterDiameter ** 2 - blankInnerDiameter ** 2) * sectorAngleRad * rho) / (4 * 2 * Math.PI);

  if (
    ![blankOuterDiameter, blankInnerDiameter, outerCutoutWidth, innerCutoutWidth, blankMassGrams].every(Number.isFinite)
  )
    return null;

  return {
    outerHelixLength,
    innerHelixLength,
    flightHeight,
    sectorAngleRad,
    sectorAngleDeg: (sectorAngleRad * 180) / Math.PI,
    cutoutAngleRad,
    cutoutAngleDeg: (cutoutAngleRad * 180) / Math.PI,
    blankOuterDiameter,
    blankInnerDiameter,
    outerCutoutWidth,
    innerCutoutWidth,
    blankMassGrams,
  };
}
