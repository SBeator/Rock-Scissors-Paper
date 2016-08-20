import React, { Component, PropTypes } from 'react';

const propTypes = {
  show: PropTypes.bool,
  menuText: PropTypes.string,
  readying: PropTypes.func,
};

class Ready extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.props.readying();
  }

  getClasses() {
    return `ready ${this.props.show ? '' : 'hide'}`;
  }

  render() {
    return (
      <div className={this.getClasses()} >
        <div className="ready__block">
          <button className="btn" onClick={this.onClick}>{this.props.menuText}</button>
        </div>
      </div>
    );
  }
}

Ready.propTypes = propTypes;

export default Ready;
