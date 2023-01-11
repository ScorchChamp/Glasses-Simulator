// Get the image and the glasses element
const image = document.getElementById("image");
const glasses = document.getElementById("glasses");

let isDragging = false; // Keep track of whether the glasses are being dragged
let currentX; // The current X coordinate of the glasses
let currentY; // The current Y coordinate of the glasses
let initialX; // The initial X coordinate of the glasses
let initialY; // The initial Y coordinate of the glasses
let xOffset = 0; // The amount the glasses have been moved horizontally
let yOffset = 0; // The amount the glasses have been moved vertically

// Add event listeners to the glasses element
glasses.addEventListener("mousedown", dragStart);
glasses.addEventListener("mouseup", dragEnd);
glasses.addEventListener("mousemove", drag);

// The dragStart function is called when the user starts dragging the glasses
function dragStart(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;

  if (e.target === glasses) {
    isDragging = true;
  }
}

// The dragEnd function is called when the user stops dragging the glasses
function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  isDragging = false;
}

// The drag function is called while the user is dragging the glasses
function drag(e) {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, glasses);
  }
}

// The setTranslate function moves the glasses to the specified coordinates
function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

// Add a scroll event listener to the image
image.addEventListener("wheel", zoom);

// The zoom function is called when the user scrolls the image
function zoom(e) {
  e.preventDefault();

  // Calculate the new scale based on the scroll amount
  let scale = 1 + e.deltaY * -0.01;
  image.style.transform = `scale(${scale})`;
}
