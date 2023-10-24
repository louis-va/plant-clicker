import * as PIXI from 'pixi.js';

// Colors
const COLOR_PINK = '0xBB665D'
const COLOR_YELLOW = '0xD29626'
const COLOR_GREEN_100 = '0x53621E'
const COLOR_GREEN_200 = '0x48551E'
const COLOR_GREEN_300 = '0x374015'

export default class Branch {
  constructor(builder, x, y) {
    this.builder = builder;
    this.length = 30;

    this.points = [];
    this.addPoint(x, y)

    this.lastPointX


    this.addPoint(x, y - this.length)
    this.addPoint(x+2, y - this.length*2)
    this.addPoint(x+2, y - this.length*3)
    this.addPoint(x, y - this.length*4)
    this.addPoint(x-2, y - this.length*5)
    this.addPoint(x-3, y - this.length*6)
    this.addPoint(x-1, y - this.length*7)
    this.addPoint(x, y - this.length*8)
  }

  addPoint(x, y) {
    this.points.push(new PIXI.Point(x, y))
  }

  render() {
    this.builder.moveTo(this.points[0].x, this.points[0].y);

    this.points.forEach((point, index) => {
      this.builder.lineStyle({
        width: this.points.length - index,
        color: COLOR_PINK,
        join: 'round',
        cap: 'round'
      })
      this.builder.lineTo(point.x, point.y);
    })
  }
}