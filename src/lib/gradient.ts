import { seededRandom, getRandomCurve } from './utils';
import chroma from 'chroma-js';
import { adjustHue, lighten } from 'polished';
import { genStops, getStopsArray } from './helpers';

type GenGradient = (string: string) => string;
export const genGradient: GenGradient = (string) => {
  const colorGenConfig = {
    minHue: 0,
    maxHue: 360,
    minChroma: 50,
    maxChroma: 100,
    minLightness: 55,
    maxLightness: 75,
    minStops: 5,
    maxStops: 20,
  };
  const numOfStops = seededRandom(string, [3, 7]);

  const _lightness = seededRandom(string, [
    colorGenConfig.minLightness,
    colorGenConfig.maxLightness,
  ]);
  const _chroma = seededRandom(string, [
    colorGenConfig.minChroma,
    colorGenConfig.maxChroma,
  ]);
  const _hue = seededRandom(string, [
    colorGenConfig.minHue,
    colorGenConfig.maxHue,
  ]);

  const color1 = chroma.lch(_lightness, _chroma, _hue);

  const hueAdjustment = seededRandom(string, [35, 155]);
  const h2 = adjustHue(hueAdjustment, color1.hex());
  const l2 = lighten(0.1, h2);
  const color2 = chroma(l2);

  const _stops = genStops({ color1, color2, numOfStops });

  const easingCurve = getRandomCurve(string);
  const stops = getStopsArray(_stops, easingCurve);

  const angle = seededRandom(string, [0, 360]);

  return `linear-gradient(
    ${angle}deg,
    ${stops.join(',\n  ')}
  )`;
};
