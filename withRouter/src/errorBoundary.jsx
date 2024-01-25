import React, { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true })
    // Handle the error (e.g., log the error)
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI when an error occurs
      return <div>Error occurred.</div>
    }

    return this.props.children
  }
}

export default ErrorBoundary
