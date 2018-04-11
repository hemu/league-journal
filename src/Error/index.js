import React from 'react';

export class GenericErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log('*** Error boundary caught error ***', error);
    console.log(info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export const NetworkError = (options) => (WrappedComponent) => {
  // do things with options if you need more flexibility
  return class NetworkErrorHandler extends React.Component {
    componentDidMount = () => {
      if (this.props.data && this.props.data.error) {
        // do something with error
        console.log('Caught error in HOC!');
      }
    };

    componentWillReceiveProps = (nextProps) => {
      if (nextProps.data && nextProps.data.error) {
        // do something with error
        console.log('Caught error in HOC!');
      }
    };

    render = () => <WrappedComponent {...this.props} />;
  };
};
