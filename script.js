const tilesContainer = document.querySelector(".tiles");
const images = [
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/51.jpg",
  "img/6.jpg",
  "img/7.jpg",
  "img/81.jpg"
];
const imagesPicklist = [...images, ...images];
const tileCount = imagesPicklist.length;

let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(image) {
  const element = document.createElement("div");

  element.classList.add("tile");
  element.setAttribute("data-image", image);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");

    if (
      awaitingEndOfMove ||
      revealed === "true" ||
      element == activeTile
    ) {
      return;
    }

    element.style.backgroundImage = `url(${image})`;

    if (!activeTile) {
      activeTile = element;
      return;
    }

    const imageToMatch = activeTile.getAttribute("data-image");

    if (imageToMatch === image) {
      element.setAttribute("data-revealed", "true");
      activeTile.setAttribute("data-revealed", "true");

      activeTile = null;
      awaitingEndOfMove = false;
      revealedCount += 2;

      if (revealedCount === tileCount) {
        alert("Vyhrál jsi, refreshni stránku!");
      }

      return;
    }

    awaitingEndOfMove = true;

    setTimeout(() => {
      activeTile.style.backgroundImage = null;
      element.style.backgroundImage = null;

      awaitingEndOfMove = false;
      activeTile = null;
    }, 1000);
  });

  return element;
}

for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * imagesPicklist.length);
  const image = imagesPicklist[randomIndex];
  const tile = buildTile(image);

  imagesPicklist.splice(randomIndex, 1);
  tilesContainer.appendChild(tile);
}
