import * as React from "react";

import { formatDemandJSON, formatPriceJSON, formatNumberJSON } from "./helpers";
import { getHexagonsInBb } from "./helpers/getHexagonsInBb";
import { getCirclesInBb } from "./helpers/getCirclesInBb";
import {
  initMouseenterListener,
  initClickListener,
  initBBoxChangeListener,
} from "./events";

import hexo_demand from "./hexo_demand.json";
import hexo_price from "./hexo_price.json";
import hexo_number from "./hexo_number.json";

import "./App.css";

const CENTER = [55.7583, 37.620677];
const ZOOM = 14;

const formattedPrice = formatPriceJSON(hexo_price);
const formattedDemand = formatDemandJSON(hexo_demand);
const formattedNumber = formatNumberJSON(hexo_number);

function init() {
  const { ymaps } = window;
  const myMap = new ymaps.Map("map-container", {
    center: CENTER,
    zoom: ZOOM,
  });

  // Инициализируем менеджер
  const objectManager = new ymaps.ObjectManager({
    clusterize: false,
    gridSize: 32,
    clusterDisableClickZoom: true,
    geoObjectHasBalloon: true,
    geoObjectOpenBalloonOnClick: true,
    geoObjectCursor: "pointer",
    geoObjectOutline: false,
  });

  // Привязываем менеджер к карте
  myMap.geoObjects.add(objectManager);

  const initialBounds = myMap.getBounds();

  // Добавляем наборы объектов
  objectManager.add(getHexagonsInBb(initialBounds, formattedPrice));
  objectManager.add(getHexagonsInBb(initialBounds, formattedDemand));
  objectManager.add(getCirclesInBb(initialBounds, formattedNumber));

  // Пересчет и добавление объектов в менеджер при изменении bounding box
  const setUpdatedHeatLayersData = (bounds) => {
    objectManager.removeAll();
    objectManager.add(getHexagonsInBb(bounds, formattedPrice));
    objectManager.add(getHexagonsInBb(bounds, formattedDemand));
    objectManager.add(getCirclesInBb(bounds, formattedNumber));
  };

  // Ивент листенеры
  // Для ховера
  initMouseenterListener(objectManager);
  // Для балуна
  initClickListener(objectManager);
  // Для пересчета наборов геобъектов при изменении bounding box
  initBBoxChangeListener(myMap, setUpdatedHeatLayersData);
}

function App() {
  React.useEffect(() => {
    window.ymaps.ready(init);
  }, []);

  return <div id="map-container"></div>;
}

export default App;
