import seedrandom from 'seedrandom';
import { CURVE_PRESETS } from './presets';

/**
 * Given 3-4 points for a cubic bezier curve, figure out the X/Y values for
 * `t`, a number from 0-1 representing progress.
 */
type GetValuesForBezierCurve = (
  axes: {
    startPoint: [number, number];
    endPoint: [number, number];
    controlPoint1: [number, number];
    controlPoint2: [number, number];
  },
  t: number
) => [x: number, y: number];
const getValuesForBezierCurve: GetValuesForBezierCurve = (
  { startPoint, endPoint, controlPoint1, controlPoint2 },
  t
) => {
  let x, y;
  if (controlPoint2) {
    // Cubic Bezier curve
    x =
      (1 - t) ** 3 * startPoint[0] +
      3 * (1 - t) ** 2 * t * controlPoint1[0] +
      3 * (1 - t) * t ** 2 * controlPoint2[0] +
      t ** 3 * endPoint[0];

    y =
      (1 - t) ** 3 * startPoint[1] +
      3 * (1 - t) ** 2 * t * controlPoint1[1] +
      3 * (1 - t) * t ** 2 * controlPoint2[1] +
      t ** 3 * endPoint[1];
  } else {
    // Quadratic Bezier curve
    x =
      (1 - t) * (1 - t) * startPoint[0] +
      2 * (1 - t) * t * controlPoint1[0] +
      t * t * endPoint[0];
    y =
      (1 - t) * (1 - t) * startPoint[1] +
      2 * (1 - t) * t * controlPoint1[1] +
      t * t * endPoint[1];
  }

  return [x, y];
};

type GetYValueForBezier = (
  xtarget: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => number;
export const getYValueForBezier: GetYValueForBezier = function (
  xTarget,
  x1,
  y1,
  x2,
  y2
) {
  var xTolerance = 0.0001;
  var myBezier = function (t: number) {
    return getValuesForBezierCurve(
      {
        startPoint: [0, 0],
        controlPoint1: [x1, y1],
        controlPoint2: [x2, y2],
        endPoint: [1, 1],
      },
      t
    );
  };

  // Binary search to find an approximation for `X`

  //establish bounds
  var lower = 0;
  var upper = 1;
  var percent = (upper + lower) / 2;

  var x = myBezier(percent)[0];

  while (Math.abs(xTarget - x) > xTolerance) {
    if (xTarget > x) lower = percent;
    else upper = percent;

    percent = (upper + lower) / 2;
    x = myBezier(percent)[0];
  }

  return myBezier(percent)[1];
};

type Normalize = (
  number: number,
  currentScaleMin: number,
  currentScaleMax: number,
  newScaleMin: number,
  newScaleMax: number
) => number;
export const normalize: Normalize = (
  number,
  currentScaleMin,
  currentScaleMax,
  newScaleMin = 0,
  newScaleMax = 1
) => {
  // FIrst, normalize the value between 0 and 1.
  const standardNormalization =
    (number - currentScaleMin) / (currentScaleMax - currentScaleMin);

  // Next, transpose that value to our desired scale.
  return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin;
};

seedrandom('UNIQUE_SALT', { global: true });
type SeededRandom = (seed: string, range: [number, number]) => number;
export const seededRandom: SeededRandom = (seed, range = [0, 1]) => {
  return Math.floor(seedrandom(seed)() * (range[1] - range[0]) + range[0]);
};
export const seededPick = (seed: string, arr: any[]) => {
  const indx = seededRandom(seed, [0, arr.length - 1]);
  return arr[indx];
};

export function getRandomCurve(seed = '') {
  const presets = CURVE_PRESETS.map((preset) => preset.curve);

  return seededPick(seed, [...presets]);
}
