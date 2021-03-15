const dToCardinalDir = (deg) => {
  let d = deg;
  // eslint-disable-next-line
  if (!(d && d !== '' && !Array.isArray(d) && +d === +d)) return '';
  const dirs = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  d = (d * 16) / 360;
  d = Math.round(d, 0);
  d = (d + 16) % 16;
  return dirs[d];
};

export default dToCardinalDir;
