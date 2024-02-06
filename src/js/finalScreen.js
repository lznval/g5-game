export const finalScreen = (app, mobileScreen) => {
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
  app.stage.addChild(finalScreen);
};
