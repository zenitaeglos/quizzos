import React from 'react';
import logo from './logo.svg';
import './App.css';
import ItemsList from './ItemsList';

export interface Item {
    item_id: number;
    name: string;
}


interface DisplayProps {
    title: string;
    itemsList: Array<Item>;
    token?: string;
}


class App extends React.Component< {}, DisplayProps > {

    constructor(props: {}) {
        super(props);
        this.state = {
            title: '',
            itemsList: new Array<Item>(),
            token: ''
        }
    }

    componentDidMount() {
        const headers = { 'Authorization': 'Basic YXNkOmFzZA=='};
        fetch("http://localhost:8005/quizzes/23", {headers}).then((Response) => {
            /*
            if not authorised. redirected: false, status: 401, statusText: Unauthorized
            */
            console.log("feth");
            console.log(Response);
            return Response.json();
        }).then((Response) => {
            console.log(Response);
            this.setState({
                title: Response.title,
                itemsList: Response.quiz_list
            });
        });
    }

    getQuizzes() {
        const headers = { 'Authorization': 'Bearer' + this.state.token };
        fetch("http://localhost:8004/quizzes/", {headers}).then((Response) => {
            return Response.json();
        }).then((Response) => {
            this.setState({
                itemsList: Response.quiz_list
            })
        });
    }

    getQuiz() {
        const headers = { 'Authorization': 'Bearer' + this.state.token };
        fetch("http://localhost:8004/quizzes/1", {headers}).then((Response) => {
            return Response.json();
        }).then((Response) => {
            // do somethings
        })
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
