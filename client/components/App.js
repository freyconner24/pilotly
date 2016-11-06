import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    var pr = this.props;
    var st = this.state;

    var props = {};

    return (
      <div className="appContainer">
        {React.Children.map(this.props.children, function (child) {
          return React.cloneElement(child, props);
        }, this)}
      </div>
    )
  }
}
