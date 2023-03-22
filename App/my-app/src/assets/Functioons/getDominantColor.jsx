async function getDominantColor(image) {
  function distance(a, b) {
    const [r1, g1, b1] = a;
    const [r2, g2, b2] = b;
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const colors = [];
  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    const a = imageData[i + 3];
    if (a >= 125) {
      colors.push([r, g, b]);
    }
  }
  const k = 5;
  let centroids = [];
  for (let i = 0; i < k; i++) {
    centroids.push(colors[Math.floor(Math.random() * colors.length)]);
  }
  const maxIterations = 100;
  let iteration = 0;
  while (iteration < maxIterations) {
    const groups = {};
    for (let i = 0; i < colors.length; i++) {
      let minDist = Infinity;
      let closestCentroid = null;
      for (let j = 0; j < centroids.length; j++) {
        const dist = distance(colors[i], centroids[j]);
        if (dist < minDist) {
          minDist = dist;
          closestCentroid = centroids[j];
        }
      }
      if (!groups[closestCentroid]) {
        groups[closestCentroid] = [];
      }
      groups[closestCentroid].push(colors[i]);
    }
    let newCentroids = [];
    for (let centroid in groups) {
      const group = groups[centroid];
      const sum = group.reduce(
        (acc, curr) => [acc[0] + curr[0], acc[1] + curr[1], acc[2] + curr[2]],
        [0, 0, 0]
      );
      newCentroids.push([
        Math.round(sum[0] / group.length),
        Math.round(sum[1] / group.length),
        Math.round(sum[2] / group.length),
      ]);
    }
    if (centroids.toString() === newCentroids.toString()) {
      break;
    } else {
      centroids = newCentroids;
    }
    iteration++;
  }
  const sortedCentroids = centroids.sort((a, b) => {
    const sumA = a.reduce((acc, val) => acc + val);
    const sumB = b.reduce((acc, val) => acc + val);
    return sumB - sumA;
  });
  const dominantColor = sortedCentroids[0];
  return `rgb(${dominantColor.join(", ")})`;
}

export default getDominantColor;
