export const getCircleY = (feature) =>
  feature.geometry.coordinates[0][0][0] +
  (feature.geometry.coordinates[0][3][0] -
    feature.geometry.coordinates[0][0][0]) /
    2;
export const getCircleX = (feature) => feature.geometry.coordinates[0][0][1];
