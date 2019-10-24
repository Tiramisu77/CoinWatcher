import React from "react"

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    componentDidCatch(error) {
        this.setState({ hasError: true })
        console.error(error)
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return null
        }
        return this.props.children
    }
}
