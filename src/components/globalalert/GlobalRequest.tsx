export class GlobalRequest {
  constructor (props = {}) {
    this.props = props
    this.state = {}
    this.el
  }

  setState (state) {
    const oldEl = this.el
    this.state = state
    this.el = this.renderDom()
    if (this.onStateChange) {
      this.onStateChange(oldEl, this.el)
    }
  }

  renderDom () {
    this.el = createDomFromString(this.render())
    return this.el
  }

  render () {
    // pass
  }

}

const createDomFromString = (domString) => {
  const div = document.createElement('div')
  div.innerHTML = domString
  return div
}

const mountDom = (component, wrapper) => {
  wrapper.appendChild(component.renderDom())
  component.onStateChange = (oldEl, newEl) => {
    wrapper.insertBefore(newEl, oldEl)
    wrapper.removeChild(oldEl)
  }
}

export { mountDom }
