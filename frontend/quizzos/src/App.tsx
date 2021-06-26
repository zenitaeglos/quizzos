import React from 'react';
import logo from './logo.svg';
import './App.css';

interface AppProps{
}


class App extends React.Component<AppProps, { title: string }> {

    constructor(props: AppProps) {
        super(props);
        this.state = {
            title: ''
        }
    }

    componentDidMount() {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8004");
            const titleData = await response.json();

            this.setState({
                title: titleData.title
            });

        }
        fetchData();
    }

    render() {
        return (
            <h1>{this.state.title}</h1>
        )
    }
}
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export default App;
