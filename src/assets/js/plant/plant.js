import * as PIXI from 'pixi.js';
import Branch from './branch';
import { getScore } from '../game'

const CANVAS_WIDTH = 600
const CANVAS_HEIGHT = 900

// Initialize the PIXI app
const app = new PIXI.Application({
  antialias: false,
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

// Grow relative to score
let previousScore = getScore()
let score

// Rendering loop
app.ticker.add(() => {

  score = getScore()
  if (score > previousScore * 1.02) {
    firstBranch.grow();
    builder.clear();
    firstBranch.render();
    console.log(score)
    previousScore = score
  }
});
