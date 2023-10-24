import * as PIXI from 'pixi.js';

// Colors
const COLOR_PINK = '0xBB665D'
const COLOR_YELLOW = '0xD29626'
const COLOR_GREEN_100 = '0x53621E'
const COLOR_GREEN_200 = '0x48551E'
const COLOR_GREEN_300 = '0x374015'

const SEGMENT_MIN_LENGTH = 20
const SEGMENT_MAX_LENGTH = 40
const SEGMENT_MAX_WIDTH = 15
const SEGMENT_MAX_SHIFT = 2
const GROWTH_STEPS = 10

export default class Branch {
  constructor(builder, x, y, angle) {
    this.builder = builder
    this.angle = angle
    this.points = []
    this.addPoint(x, y)
    this.growingSegment = {}
    this.newSegment(x, y)
  }

  addPoint(x, y) {
    let newPoint = new PIXI.Point(x, y)
    this.points.push(newPoint)
    return newPoint
  }

  randomSegmentLength() {
    return Math.floor(Math.random() * (SEGMENT_MAX_LENGTH - SEGMENT_MIN_LENGTH + 1) + SEGMENT_MIN_LENGTH)
  }

  shiftAngle() {
    this.angle += Math.floor(Math.random() * (SEGMENT_MAX_SHIFT - (-SEGMENT_MAX_SHIFT)) + 1) + (-SEGMENT_MAX_SHIFT)
  }

  newSegment(x, y) {
    this.growingSegment.point = this.addPoint(x, y)
    this.growingSegment.maxLength = this.randomSegmentLength()
    this.growingSegment.endX = this.growingSegment.maxLength * Math.sin(this.angle * (Math.PI/180))
    this.growingSegment.endY = this.growingSegment.maxLength * Math.cos(this.angle * (Math.PI/180))
    this.growingSegment.step = 0
  }

  grow() {
    if (this.growingSegment.step < GROWTH_STEPS) {
      this.growingSegment.point.x += this.growingSegment.endX / GROWTH_STEPS
      this.growingSegment.point.y -= this.growingSegment.endY / GROWTH_STEPS
      this.growingSegment.step += 1
    } 
    else {
      this.newSegment(this.growingSegment.point.x, this.growingSegment.point.y)
      this.shiftAngle()
    }
  }

  render() {
    if (this.points.length < 25) this.grow()
    
    this.builder.moveTo(this.points[0].x, this.points[0].y);

    this.points.forEach((point, index) => {

      var lineWidth = this.points.length - index + 1
      
      this.builder.lineStyle({
        width: (lineWidth > SEGMENT_MAX_WIDTH) ? SEGMENT_MAX_WIDTH : lineWidth,
        color: COLOR_PINK,
        join: 'round',
        cap: 'round'
      })

      this.builder.lineTo(point.x, point.y);
    })
  }
}