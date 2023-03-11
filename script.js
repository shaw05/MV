// Initialize and add the map
function initMap() {
  // The location of center
  const center = { lat: 51.5074, lng: -0.1278 };
  // The map, centered at center
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: center,
  });

  // Add markers to the map
  fetch('data.js')
    .then(response => response.json())
    .then(data => {
      data.forEach(marker => {
        const markerPos = { lat: marker.lat, lng: marker.lng };
        const markerIcon = {
          url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
          size: new google.maps.Size(20, 32),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 32),
        };
        const newMarker = new google.maps.Marker({
          position: markerPos,
          map: map,
          icon: markerIcon,
          title: marker.text,
        });
        // Add listener for marker click
        newMarker.addListener("click", () => {
          const contentString =
            "<div id='overlay'>" +
            "<img class='overlay-image' src='images/" +
            marker.image1 +
            "'/><img class='overlay-image' src='images/" +
            marker.image2 +
            "'/></div>";
          const infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 400,
          });
          infowindow.open(map, newMarker);
          const slider = document.querySelector("#overlay");
          let isDown = false;
          let startX;
          let scrollLeft;
          let cursor = "default";
          slider.addEventListener("mousedown", (e) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            cursor = "grabbing";
            slider.style.cursor = cursor;
          });
          slider.addEventListener("mouseleave", () => {
            isDown = false;
            cursor = "default";
            slider.style.cursor = cursor;
          });
          slider.addEventListener("mouseup", () => {
            isDown = false;
            cursor = "default";
            slider.style.cursor = cursor;
          });
          slider.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
          });
        });
        // Add listener for marker mouseover
        newMarker.addListener("mouseover", () => {
          const arrow = document.createElement("div");
          arrow.classList.add("arrow");
          arrow.style.transform = "rotate(" + marker.angle + "deg)";
          const label = document.createElement("div");
          label.classList.add("label");
          label.innerText = marker.text;
          const container = document.createElement("div");
          container.classList.add("marker-container");
          container.appendChild(arrow);
          container.appendChild(label);
          newMarker.setLabel({ content: container });
        });
        // Add listener for marker mouseout
        newMarker.addListener("mouseout", () => {
          newMarker.setLabel(null);
        });
      });
    });
}
