import { getCircleY, getCircleX } from "../helpers/formatHelpers";

export function getHexagonsInBb(bB, json) {
  const [bottomLeft, topRight] = bB;

  return {
    ...json,
    features: json.features.filter((feature) => {
      const y = getCircleY(feature);
      const x = getCircleX(feature);

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
