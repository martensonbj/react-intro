const React = require('react');
const ReactDOM = require('react-dom');

require('./main.css');

var ActionButton = React.createClass({
  render: function() {
    return (
      <button className="ActionButton" onClick={this.props.onAction}>
        <span>{this.props.text}</span>
      </button>
    )
  }
});

var LikesCounter = React.createClass({

  getInitialState: function() {
    return {
      count: this.props.initialCount
    }
  },

  addToCount: function(num) {
    this.setState({count: this.state.count + num});
  },

  render: function() {
    return (
      <div className="likes-panel">
        <h3>Likes: {this.state.count}</h3>
        <div className="action-buttons">
          <ActionButton text="Like! (+1)" onAction={this.addToCount.bind(this, 1)} />
          <ActionButton text="Dislike! (-1)" onAction={this.addToCount.bind(this, -1)} />
        </div>
      </div>
    )
  }
});

ReactDOM.render(<LikesCounter initialCount={0}/>, document.getElementById('application'));
