import * as PIXI from 'pixi.js';

// Colors
const COLOR_PINK = '0xBB665D'
const COLOR_YELLOW = '0xD29626'
const COLOR_GREEN_100 = '0x53621E'
const COLOR_GREEN_200 = '0x48551E'
const COLOR_GREEN_300 = '0x374015'

const SEGMENT_MIN_LENGTH = 20
const SEGMENT_MAX_LENGTH = 40

export default class Branch {
  constructor(builder, x, y) {
    this.builder = builder;
    this.points = [];
    this.addPoint(x, y)

    this.growingSegmentEnd = this.addPoint(x, y)
    this.growingSegmentLength = 0
    this.growingSegmentMaxLength = SEGMENT_MAX_LENGTH
  }

  randomSegmentLength() {
    return Math.floor(Math.random() * (SEGMENT_MAX_LENGTH - SEGMENT_MIN_LENGTH + 1) + SEGMENT_MIN_LENGTH)
  }

  addPoint(x, y) {
    let newPoint = new PIXI.Point(x, y)
    this.points.push(newPoint)
    return newPoint
  }

  grow() {
    // Grow current branch segment
    if (this.growingSegmentLength < this.growingSegmentMaxLength) {
      this.growingSegmentEnd.y -= 1
      this.growingSegmentLength += 1
    } 
    // Create a new branch segment
    else {
      this.growingSegmentEnd = this.addPoint(this.growingSegmentEnd.x, this.growingSegmentEnd.y)
      this.growingSegmentLength = 0
      this.growingSegmentMaxLength = this.randomSegmentLength()
    }
  }

  render() {
    if (this.points.length < 10) this.grow()

    this.builder.moveTo(this.points[0].x, this.points[0].y);

    this.points.forEach((point, index) => {
      this.builder.lineStyle({
        width: this.points.length - index + 1,
        color: COLOR_PINK,
        join: 'round',
        cap: 'round'
      })
      this.builder.lineTo(point.x, point.y);
    })
  }
}