const container = document.getElementById('clickDisplay')

export default class Click {
  constructor(points, x, y, boost) {
    this._x = x - 10
    this._y = y - 20
    this._boost = boost
    this._el = this._createElement(points)
    this._fade(100)
  }

  _createElement(points) {
    let element = document.createElement('span');
    element.classList.add('noselect')
    element.style.left = this._x + 'px'
    element.style.top = this._y + 'px'
    element.style.opacity = '100%'
    if (this._boost == true) {
      element.classList.add('click-boost')
      element.textContent = '+' + points * 3
    } else {
      element.classList.add('click')
      element.textContent = '+' + points
    }
    container.appendChild(element)
    return element
  }

  _fade(opacity) {
    this._y = (this._boost) ? this._y+0.6 : this._y+0.3
    this._el.style.top = this._y + 'px'
    this._el.style.opacity = 0.01 * opacity
    if (opacity > 0) {
      setTimeout(() => this._fade(opacity-1), 10)
    } else {
      this._el.remove()
    }
  }
}