import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import * as storeActionsFromFile from '../../../actions/store'
import BuyAndStore from '../../../components/BuyAndStore'

class Buy extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isStore: false
    }
  }
  render() {
    return (
      <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>
    )
  }
  componentDidMount() {
    this.checkStoreState()
  }
  // 检验当前商户是否被收藏
  checkStoreState() {
    const id = this.props.id
    const store = this.props.store
    // some 即任何一个满足即可
    store.some(item => {
      if (item.id === id) {
        // 已经被收藏
        this.setState({
          isStore: true
        })
        // 跳出循环
        return true
      }
    })
  }
  loginCheck() {
    const id = this.props.id
    const userinfo = this.props.userinfo
    if (!userinfo.username) {
      hashHistory.push('/Login/' + encodeURIComponent('/detail/' + id))
      return false
    }
    return true
  }
  buyHandle() {
    const loginFlag = this.loginCheck()
    if (!loginFlag) {
      return
    }
    hashHistory.push('/User')
  }
  storeHandle() {
    const loginFlag = this.loginCheck()
    if (!loginFlag) {
      return
    }
    const id = this.props.id
    const storeActions = this.props.storeActions
    if (this.state.isStore) {
      storeActions.rm({id: id})
    } else {
      storeActions.add({id: id})
    }
    this.setState({
      isStore: !this.state.isStore
    })
  }
}

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo,
    store: state.store
  }
}
function mapDispatchToProps(dispatch) {
  return {
    storeActions: bindActionCreators(storeActionsFromFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Buy)