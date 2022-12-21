export const CURVE_PRESETS = [
  {
    id: 'linear',
    label: 'Linear',
    curve: [
      { x: 0.25, y: 0.75 },
      { x: 0.75, y: 0.25 },
    ],
  },
  {
    id: 'ease',
    label: 'Ease',
    curve: [
      { x: 0.333, y: 1 },
      { x: 0.666, y: 0 },
    ],
  },
  {
    id: 'fun',
    label: 'Fun',
    curve: [
      { x: 1.1, y: 1 },
      { x: -0.1, y: 0 },
    ],
  },
];
