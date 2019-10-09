import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import Head from "./components/Head"
import Root from "./components/Root"
import FooterButtons from "./components/FooterButtons"

function App() {
    return (
        <div className="App">
            <Router>
                <Head />
                <Root />
                <FooterButtons />
            </Router>
        </div>
    )
}

export default App
