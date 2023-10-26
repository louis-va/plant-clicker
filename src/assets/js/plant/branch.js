import * as PIXI from 'pixi.js';

const COLOR_PINK = '0xBB665D'
const COLOR_YELLOW = '0xD29626'
const COLOR_GREEN_100 = '0x53621E'
const COLOR_GREEN_200 = '0x48551E'
const COLOR_GREEN_300 = '0x374015'

const MAX_LENGTH = 50 // Maximum number of segments in a branch
const SEGMENT_MIN_LENGTH = 15 // Minimum length of a semgent (pixels)
const SEGMENT_MAX_LENGTH = 30  // Maximum length of a semgent (pixels)
const SEGMENT_MAX_WIDTH = 15 // Maximum width of a semgent (pixels)
const SEGMENT_MAX_OFFSET = 5 // Maximum angle offset from previous segment (degrees)
const GROWTH_STEPS = 10 // Number of rendering loops it takes to draw a segment
const BRANCH_APPEARANCE = 7 // Number of segments between new branches
const BRANCH_MIN_ANGLE = 15 // Minimum angle at which a branch will grow on its parent branch (degrees)
const BRANCH_MAX_ANGLE = 35 // Maximum angle at which a branch will grow on its parent branch (degrees)

export default class Branch {
  constructor(builder, x, y, angle) {
    this._builder = builder
    this._angle = angle
    this._points = []
    this._addPoint(x, y)
    this._growingSegment = {}
    this._newSegment(x, y)
    this._childBranches = []
  }

  _randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  _addPoint(x, y) {
    let newPoint = new PIXI.Point(x, y)
    this._points.push(newPoint)
    return newPoint
  }

  _offsetAngle() {
    this._angle += this._randomInt(-SEGMENT_MAX_OFFSET, SEGMENT_MAX_OFFSET)
  }

  _newSegment(x, y) {
    this._growingSegment.point = this._addPoint(x, y)
    this._growingSegment.maxLength = this._randomInt(SEGMENT_MIN_LENGTH, SEGMENT_MAX_LENGTH)
    this._growingSegment.endX = this._growingSegment.maxLength * Math.sin(this._angle * (Math.PI/180))
    this._growingSegment.endY = this._growingSegment.maxLength * Math.cos(this._angle * (Math.PI/180))
    this._growingSegment.step = 0
  }

  _addChildBranch(x, y) {
    let angle;
    if (this._randomInt(0, 1)==1) {
      angle = this._randomInt(this._angle-BRANCH_MAX_ANGLE, this._angle-BRANCH_MIN_ANGLE)
    } else {
      angle = this._randomInt(this._angle+BRANCH_MIN_ANGLE, this._angle+BRANCH_MAX_ANGLE)
    }

    let branch = new Branch(this._builder, x, y, angle)
    this._childBranches.push(branch)
  }

  grow() {
    if (this._points.length >= MAX_LENGTH) return false

    if (this._growingSegment.step < GROWTH_STEPS) {
      this._growingSegment.point.x += this._growingSegment.endX / GROWTH_STEPS
      this._growingSegment.point.y -= this._growingSegment.endY / GROWTH_STEPS
      this._growingSegment.step += 1
    } else {
      this._newSegment(this._growingSegment.point.x, this._growingSegment.point.y)
      this._offsetAngle()

      if (this._points.length%BRANCH_APPEARANCE == 0)
        this._addChildBranch(this._growingSegment.point.x, this._growingSegment.point.y)
    }

    this._childBranches.forEach((branch) => branch.grow())

    return true
  }

  render() {
    this._builder.moveTo(this._points[0].x, this._points[0].y);
    this._points.forEach((point, index) => {
      var lineWidth = this._points.length - index + 1
      this._builder.lineStyle({
        width: (lineWidth > SEGMENT_MAX_WIDTH) ? SEGMENT_MAX_WIDTH : lineWidth,
        color: COLOR_PINK,
        join: 'round',
        cap: 'round'
      })
      this._builder.lineTo(point.x, point.y);
    })

    this._childBranches.forEach((branch) => branch.render())
  }
}