import * as PIXI from 'pixi.js';
export default function createButton(app, text) {
  const btnTexture = PIXI.Texture.from('/src/assets/btn.png');
  const btn = new PIXI.Sprite(btnTexture);
  btn.anchor.set(0.5);
  btn.position.set(app.screen.width / 2, 500);
  windowContent.addChild(btn);
  
  const buttonText = new PIXI.Text(text, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xFFFFFF,
    align: 'center'
  });
  buttonText.anchor.set(0.5);
  buttonText.position.set(0, 0);
  btn.addChild(buttonText);
  
  btn.interactive = true;
  btn.buttonMode = true;
  btn.on('click', () => {
    console.log(text);
    window.location.href = 'https://www.g5.com'
  });
  
  return btn;
}
