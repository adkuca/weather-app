import degToCardinalDir from './degToCardinalDirection';

test.each([
  [348.75, 'N'],
  [11.24, 'N'],
  [11.25, 'NNE'],
  [33.74, 'NNE'],
  [33.75, 'NE'],
  [56.24, 'NE'],
  // ...
  [303.75, 'NW'],
  [326.24, 'NW'],
  [326.25, 'NNW'],
  [348.74, 'NNW'],
])('%f gets converted to returned %s', (deg, expected) => {
  expect(degToCardinalDir(deg)).toBe(expected);
});
