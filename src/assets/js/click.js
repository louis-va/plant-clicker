const container = document.getElementById('clickDisplay')

export default class Click {
  constructor(points, x, y) {
    this._x = x - 10
    this._y = y - 10
    this._el = this._createElement(points)
    this._display(100)
  }

  _createElement(points) {
    let element = document.createElement('span');
    element.classList.add('click')
    element.classList.add('noselect')
    element.style.left = this._x + 'px'
    element.style.top = this._y + 'px'
    element.style.opacity = '100%'
    element.textContent = '+' + points
    container.appendChild(element)
    return element
  }

  _display(opacity) {
    this._y = this._y-0.3
    this._el.style.top = this._y + 'px'
    this._el.style.opacity = 0.01 * opacity
    if (opacity > 0) {
      setTimeout(() => this._display(opacity-1), 10)
    } else {
      this._el.remove()
    }
  }
}