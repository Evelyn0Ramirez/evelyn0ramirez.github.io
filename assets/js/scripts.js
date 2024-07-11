  // Navigation bar
  function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
  }

//Image open image in new tab
document.querySelectorAll('.gallery-container img').forEach(image => {
    image.addEventListener('click', () => {
    //   image.classList.toggle('enlarged');
      window.open(image.src, '_blank');
    });
  });

  // Overlay notice
  document.addEventListener("DOMContentLoaded", function() {
    var overlayCard = document.getElementById("overlay-card");
    var closeButton = document.getElementById("close-btn");

    if (overlayCard) {
        overlayCard.style.display = "flex";

        if (closeButton) {
            closeButton.addEventListener("click", function() {
                overlayCard.style.display = "none";
            });
        } else {
            console.log("Close button only appears in project page, as intended.");
        }
    } else {
        console.log("Overlay card only appears in project page, as intended.");
    }
});

