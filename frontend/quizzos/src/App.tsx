import React from 'react';
import logo from './logo.svg';
import './App.css';
import ItemsList from './ItemsList';

export interface Item {
    item_id: number;
    name: string;
}

interface AppProps {
}


interface DisplayProps {
    title: string;
    itemsList: Array<Item>;
}


class App extends React.Component< AppProps, DisplayProps > {

    constructor(props: AppProps) {
        super(props);
        this.state = {
            title: '',
            itemsList: new Array<Item>()
        }
    }

    componentDidMount() {
        fetch("http://localhost:8004").then((Response) => {
            return Response.json();
        }).then((Response) => {
            console.log(Response);
            this.setState({
                title: Response.title,
                itemsList: Response.item_list
            });
        });
    }

    render() {
        let component = null;
        if (this.state.itemsList && this.state.itemsList.length > 0) {
            console.log("there is a list");
            console.log(this.state);
            component = <ItemsList
                            items={this.state.itemsList}
                        />
        }
        return (
            <div>
                <h1>{this.state.title}</h1>
                {component}
            </div>
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
