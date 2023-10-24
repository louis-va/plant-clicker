import * as PIXI from 'pixi.js';
import Branch from './branch';

const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 900

// Initialize the PIXI app
const app = new PIXI.Application({
  antialias: true,
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  backgroundAlpha: 0
});
document.getElementById('plant').appendChild(app.view);

// Initialize Graphics, an object that will build all of our shapes
const builder = new PIXI.Graphics();
app.stage.addChild(builder);

// Create first branch
let firstBranch = new Branch(builder, CANVAS_WIDTH/2, CANVAS_HEIGHT, 0);

// Rendering loop
app.ticker.add(() => {
  builder.clear();
  firstBranch.render();
});
