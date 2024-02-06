import { finalScreen } from "./finalScreen.js";
import { dogPosition, dogPositionMobile } from "./dogPositions.js";
let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  autoResize: true,
});
let mobileScreen = window.innerWidth < window.innerHeight;

document.body.appendChild(app.view);

let foundDogsCount = 0;

const dogs = [];

const backgroundTexture = PIXI.Texture.from("/src/assets/back_five_dogs.jpg");
const background = new PIXI.Sprite(backgroundTexture);

function resizeBackground(mobile) {
  if (mobile) {
    background.x = -380;
  } else {
    background.x = 0;
    background.y = 0;
    background.width = app.screen.width;
    background.height = app.screen.height;
  }
  app.stage.addChild(background);
}

function resizeDogs(mobile) {
  for (let i = 0; i < 5; i++) {
    const dogTexture = PIXI.Texture.from("/src/assets/doggy.png");
    const dog = new PIXI.Sprite(dogTexture);
    if (mobile) {
      dog.scale.set(0.7);
    } else {
      dog.scale.set(0.6);
    }
    dog.interactive = true;
    dog.buttonMode = true;

    if (mobile) {
      dog.x = dogPositionMobile[i].x;
      dog.y = dogPositionMobile[i].y;
    } else {
      dog.x = dogPosition[i].x;
      dog.y = dogPosition[i].y;
    }

    dogs.push({ sprite: dog, circle: null });

    dog.on("click", () => {
      animateSelection(dogs[i]);
    });

    dog.on("touchend", () => {
      animateSelection(dogs[i]);
    });

    app.stage.addChild(dog);
  }
}

const previewOverlay = new PIXI.Graphics();
previewOverlay.beginFill(0x000000, 0.9);
previewOverlay.drawRect(0, 0, app.screen.width, app.screen.height);
previewOverlay.endFill();

const previewText = new PIXI.Text("5 Hidden Dogs", {
  fontFamily: "Arial",
  fontSize: 44,
  fill: 0xffffff,
  fontWeight: "bold",
});
previewText.anchor.set(0.5);

const previewTextQ = new PIXI.Text("Can you solve them?", {
  fontFamily: "Arial",
  fill: 0xffffff,
  fontWeight: "bold",
});
previewTextQ.anchor.set(0.5);

const dogTexturePreview = PIXI.Texture.from("/src/assets/doggy.png");
const dogImagePreview = new PIXI.Sprite(dogTexturePreview);
dogImagePreview.anchor.set(0.5);

dogImagePreview.width = 88;
dogImagePreview.height = 120;
dogImagePreview.scale.x = -1;

function resizePreview(mobile) {
  if (mobile) {
    dogImagePreview.position.set(
      app.screen.width / 2 + 150,
      app.screen.height / 2
    );
    previewTextQ.style.fontSize = 40;
    previewTextQ.position.set(
      app.screen.width / 2,
      app.screen.height / 2 + 100
    );
    previewText.position.set(app.screen.width / 2 - 30, app.screen.height / 2);
  } else {
    dogImagePreview.position.set(app.screen.width / 2 + 170, 150);
    previewTextQ.style.fontSize = 48;
    previewTextQ.position.set(app.screen.width / 2, app.screen.height / 2 + 50);
    previewText.position.set(app.screen.width / 2 - 30, 150);
  }
  app.stage.addChild(previewOverlay);
  app.stage.addChild(previewText);

  app.stage.addChild(previewTextQ);

  app.stage.addChild(dogImagePreview);
}

const btnPreviewTexture = PIXI.Texture.from("/src/assets/btn.png");
const btnPreview = new PIXI.Sprite(btnPreviewTexture);
btnPreview.anchor.set(0.5);
btnPreview.position.set(app.screen.width / 2, app.screen.height - 50);

const buttonPreviewText = new PIXI.Text("Play Now", {
  fontFamily: "Arial",
  fontWeight: 700,
  fill: 0xffffff,
  align: "center",
});

if (mobileScreen) {
  buttonPreviewText.style.fontSize = 46;
} else {
  buttonPreviewText.style.fontSize = 32;
}

buttonPreviewText.anchor.set(0.5);
btnPreview.addChild(buttonPreviewText);

btnPreview.interactive = true;
btnPreview.buttonMode = true;

let scalingUp = true;

function updateScale() {
  const scaleFactor = scalingUp ? 1.002 : 0.998;
  btnPreview.scale.x *= scaleFactor;
  btnPreview.scale.y *= scaleFactor;

  if (btnPreview.scale.x > 1.05 || btnPreview.scale.x < 0.95) {
    scalingUp = !scalingUp;
  }
}

btnPreview.on("click", () => {
  window.open("https://www.g5.com", "_blank");
});

btnPreview.on("touchend", () => {
  window.open("https://www.g5.com", "_blank");
});

function showCompletionWindow() {
  finalScreen(app, mobileScreen);
  app.stage.addChild(btnPreview);
  app.ticker.add(updateScale);
}

setTimeout(() => {
  app.stage.removeChild(previewOverlay);
  app.stage.removeChild(previewText);
  app.stage.removeChild(previewTextQ);
  app.stage.removeChild(dogImagePreview);
}, 3000);

window.addEventListener("load", function () {
  handleResize();
});
window.addEventListener("orientationchange", function () {
  handleResize();
});

function handleResize() {
  if (window.innerWidth > window.innerHeight) {
    mobileScreen = false;
    resizeBackground(mobileScreen);
    resizeDogs(mobileScreen);
    resizePreview(mobileScreen);
    app.stage.addChild(btnPreview);
  } else {
    mobileScreen = true;
    resizeBackground(mobileScreen);
    resizeDogs(mobileScreen);
    resizePreview(mobileScreen);
    app.stage.addChild(btnPreview);
  }
}
function animateSelection(dogData) {
  const selectedDog = dogData.sprite;

  if (dogData.circle && dogData.circle.visible && dogData.circle.isPlaying) {
    return;
  }

  const circleTextures = [];
  for (let i = 1; i <= 8; i++) {
    circleTextures.push(PIXI.Texture.from(`/src/assets/circle_${i}.png`));
  }

  if (dogData.circle) {
    dogData.circle.stop();
    dogData.circle.visible = false;
  } else {
    const circle = new PIXI.AnimatedSprite(circleTextures);
    circle.anchor.set(0.5);

    circle.animationSpeed = 0.2;
    circle.loop = false;

    circle.position.set(
      selectedDog.x + selectedDog.width / 2,
      selectedDog.y + selectedDog.height / 2
    );

    app.stage.addChild(circle);

    dogData.circle = circle;
  }

  dogData.circle.visible = true;
  dogData.circle.play();

  foundDogsCount++;

  if (foundDogsCount === 5) {
    showCompletionWindow();
  }
}
