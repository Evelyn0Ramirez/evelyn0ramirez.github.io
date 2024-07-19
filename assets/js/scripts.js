  // Navigation bar
  function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
  }

//Enlarge image
// document.querySelectorAll('.gallery-container img').forEach(image => {
//     image.addEventListener('click', () => {
//       image.classList.toggle('enlarged');
//     });
//   });

//Open image in new tab; checks screen size so only on desktop
  document.querySelectorAll('.image-wrapper img').forEach(image => {
    image.addEventListener('click', () => {
        if (window.innerWidth > 768) {  
            window.open(image.src, '_blank');
        }
    });
});

window.addEventListener('resize', () => {
    document.querySelectorAll('.image-wrapper img').forEach(image => {
        image.removeEventListener('click', openImageInNewTab);
        if (window.innerWidth > 768) {
            image.addEventListener('click', openImageInNewTab);
        }
    });
});

function openImageInNewTab(event) {
    window.open(event.target.src, '_blank');
}

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

//View resume using PDF.js
const url = 'assets/docs/EvelynRamirez_Resume.pdf';

let pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 1.5,
    canvas = document.getElementById('pdf-canvas'),
    ctx = canvas.getContext('2d');

pdfjsLib.getDocument(url).promise
  .then(function(pdfDoc_) {
    pdfDoc = pdfDoc_;
    document.getElementById('page-count').textContent = pdfDoc.numPages;
    renderPage(pageNum);
  })
  .catch(function(error) {
    console.error('Error loading PDF:', error);
  });

function renderPage(num) {
  pageRendering = true;

  pdfDoc.getPage(num).then(function(page) {
    const viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    const renderTask = page.render(renderContext);

    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    }).catch(function(error) {
      console.error('Error rendering page:', error);
    });
  }).catch(function(error) {
    console.error('Error getting page:', error);
  });

  document.getElementById('page-num').textContent = num;
}

function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

document.getElementById('prev-page').addEventListener('click', function() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
});

document.getElementById('next-page').addEventListener('click', function() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
});


