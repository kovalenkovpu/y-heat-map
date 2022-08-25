// Для форматирование исходного json в формат окружностей

import { getCircleY, getCircleX } from "./formatHelpers";

const fs = require("fs");

fs.readFile("../hexo_price.json", (err, data) => {
  if (!err) {
    const dataJson = JSON.parse(data);

    const result = {
      ...dataJson,
      features: dataJson.features.map((feature) => ({
        ...feature,
        id: feature.id + 2000000000000,
        geometry: {
          type: "Circle",
          coordinates: [getCircleY(feature), getCircleX(feature)],
        },
      })),
    };

    fs.writeFile("../hexo_number.json", JSON.stringify(result), (err) => {
      console.log(err);
    });
  }
});
