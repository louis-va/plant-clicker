import * as PIXI from 'pixi.js';
import Branch from './branch';
import { getScore, setSeed, getSeed, setSteps, getSteps } from '../game';

class Plant {
  constructor(canvas, x, y) {
    this.canvas = canvas
    this.x = x;
    this.y = y;

    this.builder = new PIXI.Graphics();
    this.canvas.stage.addChild(this.builder);

    this.initializePlant();
    this.previousScore = getScore();

    this.canvas.ticker.add(this.update.bind(this));
  }

  initializePlant() {
    let seed = getSeed();
    let steps;
    if (seed) {
      this.createPlant(seed);
      steps = getSteps();
      for (let i = 0; i < steps; i++) {
        this.plant.grow();
      }
      this.plant.render();
    } else {
      seed = Math.floor(Math.random() * Math.pow(10, 10));
      setSeed(seed);
      this.createPlant(seed);
      steps = 0;
    }
    this.steps = steps;
  }

  createPlant(seed) {
    this.plant = new Branch(this.builder, seed, this.x, this.y, 0);
  }

  update() {
    const score = getScore();

    if (score > this.previousScore * 1.015) {
      this.plant.grow();
      this.builder.clear();
      this.plant.render();
      this.previousScore = score;
      this.steps++;
      setSteps(this.steps);
    }
  }

  destroy() {
    this.builder.clear();
    this.canvas.stage.removeChild(this.builder);
  }
}

// Initialize the Plant
const canvas = new PIXI.Application({
  antialias: false,
  width: 1000,
  height: 2000,
  backgroundAlpha: 0,
});
document.getElementById('plant').appendChild(canvas.view);

let plant = new Plant(canvas, 500, 2000);

// New plant when user clicks on reset button
document.getElementById("resetButton").addEventListener("click", () => {
  plant.destroy()
  plant = new Plant(canvas, 500, 2000);
});