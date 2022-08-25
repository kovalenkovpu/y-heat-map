export function initMouseenterListener(objectManager) {
  let originalOptions = {};

  objectManager.events.add(["mouseenter", "mouseleave"], (e) => {
    const eventType = e.get("type");
    const objectId = e.get("objectId");
    const object = objectManager.objects.getById(objectId);

    if (object.geometry.type === "Circle") {
      return;
    }

    if (eventType === "mouseenter") {
      originalOptions = { ...object.options };

      objectManager.objects.setObjectOptions(objectId, {
        fillColor: "#000",
        opacity: 0.5,
        fill: true,
      });
    } else {
      objectManager.objects.setObjectOptions(objectId, originalOptions);
    }
  });
}
