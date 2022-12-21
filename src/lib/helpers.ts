import chroma from 'chroma-js';
import { getYValueForBezier, normalize } from './utils';

type GenStopsArgs = {
  color1: chroma.Color;
  color2: chroma.Color;
  numOfStops: number;
};
export const genStops = ({ color1, color2, numOfStops }: GenStopsArgs) => {
  return chroma.scale([color1, color2]).mode('lch').colors(numOfStops, 'hsl');
};

export const getStopsArray = (
  stops: [number, number, number][],
  easingCurve: any
) => {
  return stops.map((color, index) => {
    const xTarget = index / (stops.length - 1);
    let y = getYValueForBezier(
      xTarget,
      1 - easingCurve[0].y,
      easingCurve[0].x,
      1 - easingCurve[1].y,
      easingCurve[1].x
    );

    y = Math.round(normalize(y, 0, 1, 0, 100));

    // If this color is grayscale
    const hue = isNaN(color[0]) ? 0 : Math.round(color[0]);

    const hslString = `hsl(${hue}deg ${Math.round(
      color[1] * 100
    )}% ${Math.round(color[2] * 100)}%)`;

    return `${hslString} ${y}%`;
  });
};
