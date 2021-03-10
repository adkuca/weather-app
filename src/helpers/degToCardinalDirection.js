const degToCardinalDir = (deg) => {
    if (!(deg && deg !== '' && !Array.isArray(deg) && +deg === +deg)) return '';
    const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];  
    deg = deg * 16 / 360;
    deg = Math.round(deg, 0);
    deg = (deg + 16) % 16
    return dirs[deg];
}

export default degToCardinalDir;