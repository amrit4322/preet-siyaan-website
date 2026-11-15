import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error) { if (import.meta.env.DEV) console.warn('[Preetsiyaan visual fallback]', error) }
  render() { return this.state.failed ? this.props.fallback || null : this.props.children }
}

