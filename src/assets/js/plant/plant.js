import * as PIXI from 'pixi.js';
import Branch from './branch';

// Initialize the PIXI app
const app = new PIXI.Application({
  antialias: false,
  width: 600,
  height: 600,
  backgroundAlpha: 0
});
document.getElementById('plant').appendChild(app.view);

// Initialize Graphics, an object that will build all of our shapes
const builder = new PIXI.Graphics();
app.stage.addChild(builder);

// Create first branch
let branch = new Branch(builder, 300, 600);

// Rendering loop
app.ticker.add(() => {
  builder.clear();
  branch.render();
});
