export function initBBoxChangeListener(myMap, updateLayersCallback) {
  myMap.events.add("boundschange", (e) => {
    const bounds = e.get("newBounds");

    updateLayersCallback(bounds);
  });
}
