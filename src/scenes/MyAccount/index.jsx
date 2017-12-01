import React, {Component} from 'react';

export default class MyAccount extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <h1>MyAccount</h1>
      <button onClick={()=>console.log(this.props)}>GO</button>
      </div>);
  }
}

MyAccount.propTypes = {
};
