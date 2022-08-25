export function initClickListener(objectManager) {
  function loadBalloonData(requestId) {
    console.log("Request is fired");

    return new Promise((res) => {
      window.setTimeout(() => {
        res(`Данные балуна для id = ${requestId}`);
      }, 1000);
    });
  }

  function hasBalloonData(objectId) {
    return objectManager.objects.getById(objectId).properties.balloonContent;
  }

  objectManager.objects.events.add("click", (e) => {
    const objectId = e.get("objectId");
    const object = objectManager.objects.getById(objectId);
    const { id: requestId } = object;

    if (object.geometry.type === "Circle") {
      return;
    }

    if (hasBalloonData(objectId)) {
      objectManager.objects.balloon.open(objectId);
    } else {
      object.properties.balloonContent = "Идет загрузка данных...";
      objectManager.objects.balloon.open(objectId);

      loadBalloonData(requestId).then((data) => {
        object.properties.balloonContent = data;
        objectManager.objects.balloon.setData(object);
      });
    }
  });
}
