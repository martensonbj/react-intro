# Introduction To React: Part 1

To install the dependencies:

```
npm install
```

To fire up a development server:

```
npm start
```

Once the server is running, you can visit:

* `http://localhost:8080/webpack-dev-server/` to run your application.
* `http://localhost:8080/webpack-dev-server/test.html` to run your test suite in the browser.

To build the static files:

```js
npm run build
```


To run tests in Node:

```js
npm test
```
# Lets Build Some Components

#### Getting Started

`index.js`

At the top of this file you'll see two lines of code.

```
const React = require('react');
const ReactDOM = require('react-dom');
```

What's the difference?

These two lines tell our app to find the `React` library, and that we will want to interact with the Document Object Model (vs `react-native`, or `react-canvas`, or `react-three`...among others).

```
ReactDOM.render(<ActionButton text="Submit" />, document.getElementById('application'));
```
Here we're using our stored variable ReactDOM because...shockingly...we want to render an HTML element onto the DOM.

More explicitly, this line of code tells our app that we want to render the component `<ActionButton />` into our document within the div element with an ID of `#application`. Take a look at the `index.html` file and you'll see the empty `<div>` ready to render our React components.

Note the line `text="Submit"`. This is what we've been referring to as a `prop`. It is an immutable property that will be passed down into the component and can be rendered within the JSX or HTML markdown.

If we navigate to the console, you'll see we have a predictable error:
`Uncaught ReferenceError: ActionButton is not defined`. This makes sense, since we haven't defined a variable called ActionButton. Let's do that now.

`index.js`

```
var ActionButton = React.createClass({
  render: function() {
    return (
      <button className="ActionButton">
        <span>Submit</span>
      </button>
    )
  }
});

ReactDOM.render(<ActionButton />, document.getElementById('application'));
```

Refresh your browser.

We have a button!

If you're using Chrome and you haven't already, download the React Dev Tools extension. If we open up the console and click on the `React` tab you'll see we have our `<ActionButton>` component. Under that check it out:
```
Props
  Empty object
```

When we create our HTML element we are currently passing in nothing. Right now the text `Submit` is hard coded into our element. Time to make it dynamic and take advantage of `this.props`.

Add `text="Submit"` to our last line of code within the `ReactDOM.render()` function, and then tell our HTML to go find that information using JSX with `{this.props.title}`

```
var ActionButton = React.createClass({
  render: function() {
    return (
      <button className="ActionButton">
        <span>{this.props.title}</span>
      </button>
    )
  }
});

ReactDOM.render(<ActionButton title="Submit"/>, document.getElementById('application'));
```

Refresh and check out the console again. What does `$r.props` give you?

```
Props
  title: "Submit"
  ```

Time to get fancy. We have a button, but our app is going to need way more than that if we want to count some Likes. Lets create a section of HTML that has all of our components.

```
var LikesCounter = React.createClass({
  render: function() {
    return (
      <div className="likes-panel">
        <h3>Likes: 0</h3>
        <div className="action-buttons">
          <ActionButton text="Like! (+1)" />
          <ActionButton text="Dislike! (-1)" />
        </div>
      </div>
    )
  }
});
```

Notice how we have nested `<ActionButton />` components within our containing `<LikesCounter />` component. This is what makes React so convenient - by handling each element as its own bundle of information we can move pieces around without having to rewrite any of the markdown.

Change the last line of code to reflect that we want `ReactDOM.render()` to render `<LikesCounter />` onto the DOM, which will in turn call on the `<ActionButton />` guys.

`ReactDOM.render(<LikesCounter />, document.getElementById('application'));`

So now that we have our HTML page looking pretty fly, its time to add behavior to the buttons. Think about what we're trying to accomplish here:

When the page loads, we want the initial value of Likes to be 0. Then when we click "Like" We want to add 1 to the value of Likes, and remove 1 when we click "Dislike".

Starting with the first statement, on page load we want the initial state of our LikesCounter to have a count of 0. Along with sending the `props` through our custom HTML element, we can also initialize a `state` that can be mutated based on user interaction and data mutations.

Lets start with setting an initial count through our `<LikesCounter />` in `props`.

```
ReactDOM.render(<LikesCounter initialCount={0} />, document.getElementById('container'));
```

Then we can set the initial state of the component to reflect the initialCount of the HTML element, which we are setting to 0. Then we can use the information stored in our current `state` to tell our `<h3>` element what to display.

```
  getInitialState: function() {
		return {
      count: this.props.initialCount};
		}
	}
```

At this point your `index.js` file should look like this:

```
const React = require('react');
const ReactDOM = require('react-dom');

require('./main.css');

var ActionButton = React.createClass({
  render: function() {
    return (
      <button className="ActionButton">
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

  render: function() {
    return (
      <div className="likes-panel">
        <h3>Likes: {this.state.count}</h3>
        <div className="action-buttons">
          <ActionButton text="Like! (+1)" />
          <ActionButton text="Dislike! (-1)" />
        </div>
      </div>
    )
  }
});

ReactDOM.render(<LikesCounter initialCount={0}/>, document.getElementById('application'));
```

Open up the console and look at what information is available within the `<LikesCounter />` component.

Last step - hook up the buttons to change the state!

In a perfect world, I want to write a JavaScript function that adds 1 to the `<LikesCounter />` `<h3>` tag every time I click on the `Like (+1)` button. Lets add that between our `getInitialState()` method and our final `render()` function.

```
addToCount: function(num) {
		this.setState({count: this.state.count + num});
},
```

The function is saying that when the event fires on the button, we want to pass in a value, and then change the state of our component. Like `getInitialState()` we can update that information using the built-in `setState()` method.  

This is where the magic of React comes in. We are essentially throwing out the old information and replacing it with fresh, up-to-date information by setting the state to be `{count: this.state.count + num}`.

Finally, add an `onClick` event-listener into our `ActionButton` class, and then pass that information to the `<ActionButton />` component to tell it what to do within our `<LikesCounter />`.

```
var ActionButton = React.createClass({
  render: function() {
    return (
      <button className="ActionButton" onClick={this.props.onAction}>
        <span>{this.props.text}</span>
      </button>
    )
  }
});
```
```
<ActionButton text="Like! (+1)" onAction={this.addToCount.bind(this, 1)} />
<ActionButton text="Dislike! (-1)" onAction={this.addToCount.bind(this, -1)} />
```

The final `index.js` file should look like this:

```
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
```

##### Resources/Additional Stuff You Should Read
[Render vs Return](https://facebook.github.io/react/docs/component-specs.html)

[React Classes vs extend Component](https://toddmotto.com/react-create-class-versus-component/)

[9 Things Ever React Dev Should Know](https://camjackson.net/post/9-things-every-reactjs-beginner-should-know)

[React Tutorial by Facebook](https://facebook.github.io/react/docs/tutorial.html)
