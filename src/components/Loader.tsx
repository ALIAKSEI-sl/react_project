import { Component } from 'react';

type LoaderProp = object;

type LoaderState = object;

export default class Loader extends Component<LoaderProp, LoaderState> {
  constructor(props: LoaderProp) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container-loader">
        <div className="loader" />
      </div>
    );
  }
}
