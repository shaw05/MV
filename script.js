function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.5074, lng: -0.1278 },
    zoom: 12,
  });

  fetch("data.js")
    .then((response) => response.json())
    .then((data) => {
      markers = data;
      addMarkers();
    });
}

function addMarkers() {
  markers.forEach((marker) => {
    const icon = {
      path: "M -2,-2 2,2 M 2,-2 -2,2",
      strokeColor: "red",
      strokeWeight: 4,
    };
    const markerObj = new google.maps.Marker({
      position: { lat: marker.lat, lng: marker.lng },
      map,
      title: marker.name,
      icon,
    });

    const content = `
      <div>
        <div>${marker.text}</div>
        <div>
          <div id="slider${marker.name}" class="slider">
            <img src="${marker.image1}" class="image1">
            <img src="${marker.image2}" class="image2">
          </div>
        </div>
      </div>
    `;

    const infowindow = new google.maps.InfoWindow({
      content,
    });

    markerObj.addListener("click", () => {
      infowindow.open(map, markerObj);
      initSlider(`#slider${marker.name}`);
    });

    markerObj.addListener("mouseover", () => {
      const angle = marker.angle;
      const arrowIcon = {
        path: `M 0,0 12,0 6,12 z`,
        fillColor: "red",
        fillOpacity: 1,
        strokeWeight: 0,
        rotation: angle,
        scale: 1.5,
        anchor: new google.maps.Point(6, 6),
      };
      markerObj.setIcon(arrowIcon);
    });

    markerObj.addListener("mouseout", () => {
      const icon = {
        path: "M -2,-2 2,2 M 2,-2 -2,2",
        strokeColor: "red",
        strokeWeight: 4,
      };
      markerObj.setIcon(icon);
    });
  });
}

function initSlider(sliderSelector) {
  const slider = document.querySelector(sliderSelector);
  const [img1, img2] = slider.querySelectorAll("img");
  const sliderWidth = slider.offsetWidth;

  img1.style.clip = `rect(0px, ${sliderWidth / 2}px, 400px, 0px)`;
  img2.style.clip = `rect(0px, ${sliderWidth}px, 400px, ${sliderWidth / 2}px)`;

  slider.addEventListener("mousemove", (event) => {
    const position = event.pageX - slider.offsetLeft;
    const percentage = (position / sliderWidth) * 100;
    img1.style.clip = `rect(0px, ${position}px, 400px, 0px)`;
    img2.style.clip = `rect(0px, ${sliderWidth}px, 400px, ${position}px)`;
  });
}
