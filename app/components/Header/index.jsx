import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { hashHistory } from 'react-router'
import './style.less'

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div>
        <div className="title-wrap">
          <div id="common-header">
            <span className="back-icon" onClick={this.clickHandle.bind(this)}>
              <i className="icon-chevron-left"></i>
            </span>
            <h1>{this.props.title}</h1>
          </div>
        </div>
        <div className="gap"></div>
      </div>
    )
  }
  clickHandle() {
    const link = this.props.backRouter
    if (!!link) {
      hashHistory.push(link)
    } else {
      window.history.back()
    }
  }
}

export default Header