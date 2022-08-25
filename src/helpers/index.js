export function getImagePath() {
  const value = Math.random(1) * 10;

  if (value < 3) {
    return "./1.png";
  }

  if (value > 7) {
    return "./3.png";
  }

  return "./2.png";
}

export function getImageData() {
  const value = Math.random(1) * 10;

  if (value > 2) {
    return {
      fillImageHref: getImagePath(),
      fillMethod: "stretch",
      stroke: false,
    };
  }

  return {
    opacity: 0,
  };
}

export function getColorData() {
  const value = Math.random(1) * 10;

  if (value < 1.5) {
    return "rgba(256, 256, 256, 0)";
  }

  if (value > 1.5 && value < 3) {
    return "rgba(90, 202, 0, 0.2)";
  }

  if (value > 3 && value < 4.5) {
    return "rgba(62, 138, 0, 0.3)";
  }

  if (value > 4.5 && value < 6) {
    return "rgba(255, 205, 3, 0.25)";
  }

  if (value > 6.5 && value < 8) {
    return "rgba(255, 122, 0, 0.25)";
  }

  if (value > 8 && value < 9.5) {
    return "rgba(255, 0, 0, 0.25)";
  }

  return "rgba(193, 0, 0, 0.35)";
}

export function getStrokeStyles() {
  const value = Math.random(1) * 10;

  // Тонкий
  if (value < 4) {
    return {
      strokeWidth: 3,
      strokeOpacity: 0.45,
      strokeStyle: "solid",
    };
  }

  // Большой
  if (value > 8) {
    return {
      strokeWidth: 6,
      strokeOpacity: 0.6,
      strokeStyle: "dot",
    };
  }

  // Средний
  return {
    strokeWidth: 4,
    strokeOpacity: 0.5,
    strokeStyle: "shortdash",
  };
}

export function getCircleData() {
  const value = Math.random(1) * 10;

  if (value < 2) {
    return {
      radius: 0,
      opacity: 0,
    };
  }

  // Тонкий
  if (value >= 2 && value < 4) {
    return {
      radius: 20,
      opacity: 0.5,
    };
  }

  // Большой
  if (value > 8) {
    return {
      radius: 40,
      opacity: 1,
    };
  }

  // Средний
  return {
    radius: 30,
    opacity: 0.7,
  };
}

export function formatDemandJSON(json) {
  return {
    ...json,
    features: json.features.map((feature, ind) => ({
      ...feature,
      options: {
        ...feature.options,
        // ...getImageData(),
        fill: false,
        strokeColor: "#0468FF",
        ...getStrokeStyles(),
        outline: Math.random(1) * 10 > 7,
      },
      properties: {
        id: ind,
      },
    })),
  };
}

export function formatPriceJSON(json) {
  return {
    ...json,
    features: json.features.map((feature, ind) => ({
      ...feature,
      options: {
        ...feature.options,
        fillColor: getColorData(),
      },
      properties: {
        layerType: "price",
        id: ind,
      },
    })),
  };
}

export function formatNumberJSON(json) {
  return {
    ...json,
    features: json.features.map((feature) => {
      const circleData = getCircleData();

      return {
        ...feature,
        geometry: {
          ...feature.geometry,
          radius: circleData.radius,
        },
        options: {
          ...feature.options,
          fillColor: "#818181",
          opacity: circleData.opacity,
        },
      };
    }),
  };
}
