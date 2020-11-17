import {render, Component, createElement } from './toy-react'


class MyComponent extends Component {
  render() {
    return (
      <div>
        <h1>my component</h1>
        {this.props.children}
      </div>
    );
  }
}

render(
  <MyComponent class="cc">
    <div>a</div>
    <div>b</div>
    <div>c</div>
    123
  </MyComponent>,
  document.body
);
