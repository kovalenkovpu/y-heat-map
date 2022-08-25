export function getCirclesInBb(bB, json) {
  const [bottomLeft, topRight] = bB;

  return {
    ...json,
    features: json.features.filter((feature) => {
      const [y, x] = feature.geometry.coordinates;

      if (
        y > bottomLeft[0] &&
        y < topRight[0] &&
        x > bottomLeft[1] &&
        x < topRight[1]
      ) {
        return true;
      }

      return false;
    }),
  };
}
