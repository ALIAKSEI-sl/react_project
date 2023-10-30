import { Component } from 'react';

type ErrorProp = object;

type ErrorState = object;

export default class ErrorElement extends Component<ErrorProp, ErrorState> {
  constructor(props: ErrorProp) {
    super(props);
    this.state = {};
  }

  render() {
    throw new Error('Упс, произошла ошибка.');
    return <div />;
  }
}
