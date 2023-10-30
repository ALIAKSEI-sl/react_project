import { Component, ReactNode } from 'react';

type ErrorProps = {
  children: ReactNode;
};

type ErrorState = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Произошла ошибка:', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="error-block">
          Произошла ошибка. Пожалуйста, обновите страницу.
        </div>
      );
    }
    return children;
  }
}
