import { dogPosition, dogPositionMobile } from "./dogPositions.js";
import { finalScreen } from "./finalScreen.js";
export const initGame = () => {
  let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    autoResize: true,
  });

  document.body.appendChild(app.view);

  let mobileScreen = true;

  const dogs = [];
  let foundDogsCount = 0;

  const finalScreen = new PIXI.Container();

  const finalOverlay = new PIXI.Graphics();
  finalOverlay.beginFill(0x000000, 0.92);
  finalOverlay.drawRect(0, 0, app.screen.width, app.screen.height);
  finalOverlay.endFill();
  finalScreen.addChild(finalOverlay);

  const logoTexture = PIXI.Texture.from("/src/assets/logo.png");
  const logo = new PIXI.Sprite(logoTexture);
  logo.anchor.set(0.5);
  logo.width = 300;
  logo.height = 165;
  logo.position.set(app.screen.width / 2, 100);

  finalScreen.addChild(logo);

  const charTexture = PIXI.Texture.from("/src/assets/char.png");
  const char = new PIXI.Sprite(charTexture);
  char.anchor.set(0.5);

  if (mobileScreen) {
    char.scale.x = -1;
    char.width = 180;
    char.height = 318;
    char.position.set(app.screen.width / 2, app.screen.height / 2 + 40);
  } else {
    char.width = 226;
    char.height = 400;
    char.position.set(85, app.screen.height / 2);
  }

  finalScreen.addChild(char);

  const text = new PIXI.Text("Great Job", {
    fontFamily: "Arial",
    fontWeight: 700,
    fill: 0xeabe53,
    stroke: 0x000000,
    strokeThickness: 1,
    align: "center",
  });

  if (mobileScreen) {
    text.style.fontSize = 76;
    text.position.set(app.screen.width / 2 - text.width / 2, 320);
  } else {
    text.style.fontSize = 60;
    text.position.set(app.screen.width / 2 - text.width / 2, 150);
  }
  finalScreen.addChild(text);

  const textSolve = new PIXI.Text("Can you solve\nevery mystery?", {
    fontFamily: "Arial",
    fontWeight: 700,
    fill: 0xffffff,
    align: "center",
  });
  if (mobileScreen) {
    textSolve.style.fontSize = 48;
    textSolve.position.set(app.screen.width / 2, 460);
  } else {
    textSolve.style.fontSize = 32;
    textSolve.position.set(app.screen.width / 2, 250);
  }
  textSolve.anchor.set(0.5);
  finalScreen.addChild(textSolve);

  const backgroundTexture = PIXI.Texture.from("/src/assets/back_five_dogs.jpg");
  const background = new PIXI.Sprite(backgroundTexture);

  if (mobileScreen) {
    background.x = -380;
  } else {
    background.x = 0;
    background.y = 0;
    background.width = app.screen.width;
    background.height = app.screen.height;
  }
  console.log(mobileScreen);

  app.stage.addChild(background);

  for (let i = 0; i < 5; i++) {
    const dogTexture = PIXI.Texture.from("/src/assets/doggy.png");
    const dog = new PIXI.Sprite(dogTexture);
    if (mobileScreen) {
      dog.scale.set(0.5);
    } else {
      dog.scale.set(0.8);
    }
    dog.interactive = true;
    dog.buttonMode = true;

    if (mobileScreen) {
      dog.x = dogPositionMobile[i].x;
      dog.y = dogPositionMobile[i].y;
    } else {
      dog.x = dogPosition[i].x;
      dog.y = dogPosition[i].y;
    }

    dogs.push({ sprite: dog, circle: null });

    dog.on("click", () => {
      animateSelection(dogs[i], i);
    });

    dog.on("touchend", () => {
      animateSelection(dogs[i], i);
    });

    app.stage.addChild(dog);
  }

  const previewOverlay = new PIXI.Graphics();
  previewOverlay.beginFill(0x000000, 0.9);
  previewOverlay.drawRect(0, 0, app.screen.width, app.screen.height);
  previewOverlay.endFill();
  app.stage.addChild(previewOverlay);

  const previewText = new PIXI.Text("5 Hidden Dogs", {
    fontFamily: "Arial",
    fontSize: 44,
    fill: 0xffffff,
    fontWeight: "bold",
  });
  previewText.anchor.set(0.5);

  if (mobileScreen) {
    previewText.position.set(app.screen.width / 2 - 30, app.screen.height / 2);
  } else {
    previewText.position.set(app.screen.width / 2 - 30, 150);
  }

  app.stage.addChild(previewText);

  const previewTextQ = new PIXI.Text("Can you solve them?", {
    fontFamily: "Arial",
    fill: 0xffffff,
    fontWeight: "bold",
  });
  previewTextQ.anchor.set(0.5);
  if (mobileScreen) {
    previewTextQ.style.fontSize = 40;
    previewTextQ.position.set(
      app.screen.width / 2,
      app.screen.height / 2 + 100
    );
  } else {
    previewTextQ.style.fontSize = 48;
    previewTextQ.position.set(app.screen.width / 2, app.screen.height / 2 + 50);
  }

  app.stage.addChild(previewTextQ);

  const dogTexturePreview = PIXI.Texture.from("/src/assets/doggy.png");
  const dogImagePreview = new PIXI.Sprite(dogTexturePreview);
  dogImagePreview.anchor.set(0.5);
  if (mobileScreen) {
    dogImagePreview.position.set(
      app.screen.width / 2 + 150,
      app.screen.height / 2
    );
  } else {
    dogImagePreview.position.set(app.screen.width / 2 + 170, 150);
  }

  dogImagePreview.width = 88;
  dogImagePreview.height = 120;
  dogImagePreview.scale.x = -1;
  app.stage.addChild(dogImagePreview);

  function animateSelection(dogData, index) {
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

  // BUTTON PLAY NOW

  const btnPreviewTexture = PIXI.Texture.from("/src/assets/btn.png");
  const btnPreview = new PIXI.Sprite(btnPreviewTexture);
  btnPreview.anchor.set(0.5);
  btnPreview.position.set(app.screen.width / 2, app.screen.height - 50);
  app.stage.addChild(btnPreview);

  const buttonPreviewText = new PIXI.Text("Play Now", {
    fontFamily: "Arial",
    fontWeight: 700,
    fill: 0xffffff,
    align: "center",
  });

  if (mobileScreen) {
    buttonPreviewText.style.fontSize = 48;
  } else {
    buttonPreviewText.style.fontSize = 32;
  }

  buttonPreviewText.anchor.set(0.5);
  btnPreview.addChild(buttonPreviewText);

  btnPreview.interactive = true;
  btnPreview.buttonMode = true;

  // Создаем переменные для управления анимацией
  let scalingUp = true;

  // Обновляем функцию для масштабирования кнопки
  function updateScale() {
    const scaleFactor = scalingUp ? 1.002 : 0.998;
    btnPreview.scale.x *= scaleFactor;
    btnPreview.scale.y *= scaleFactor;

    // Инвертируем направление анимации при достижении порогового значения
    if (btnPreview.scale.x > 1.05 || btnPreview.scale.x < 0.95) {
      scalingUp = !scalingUp;
    }
  }

  // Добавляем функцию обновления к Ticker

  btnPreview.on("click", () => {
    console.log("Play now clicked");
    window.open("https://www.g5.com", "_blank");
  });

  btnPreview.on("touchend", () => {
    console.log("Play now clicked");
    window.open("https://www.g5.com", "_blank");
  });

  function showCompletionWindow() {
    app.stage.addChild(finalScreen);
    app.stage.addChild(btnPreview);
    app.ticker.add(updateScale);
  }

  // showCompletionWindow();

  setTimeout(() => {
    app.stage.removeChild(previewOverlay);
    app.stage.removeChild(previewText);
    app.stage.removeChild(previewTextQ);
    app.stage.removeChild(dogImagePreview);
  });

  function placeDogRandomly(dog) {
    const minX = 0;
    const minY = 0;
    const maxX = app.screen.width - dog.width;
    const maxY = app.screen.height - dog.height;

    dog.x = minX + Math.random() * (maxX - minX);
    dog.y = minY + Math.random() * (maxY - minY);
  }

  function handleResize() {
    if (window.innerWidth > window.innerHeight) {
      mobileScreen = false;
    } else {
      mobileScreen = true;
    }
  }
  window.addEventListener("load", function () {
    handleResize();
  });
  window.addEventListener("orientationchange", function () {
    handleResize();
  });
  window.addEventListener("resize", function () {
    handleResize();
  });
};
