function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
  }

  document.addEventListener("DOMContentLoaded", function() {
    var overlayCard = document.getElementById("overlay-card");
    overlayCard.style.display = "flex";

    var closeButton = document.getElementById("close-btn");
    closeButton.addEventListener("click", function() {
        overlayCard.style.display = "none";
    });
});
