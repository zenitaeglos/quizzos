import React from 'react';
import logo from './logo.svg';
import './App.css';
import ItemsList from './ItemsList';
import Header from './Header';
import Login from './Login';

export interface Item {
    item_id: number;
    name: string;
}


interface DisplayProps {
    title: string;
    itemsList: Array<Item>;
    token?: string;
    page: string;
    actionType: string;
}


class App extends React.Component< {}, DisplayProps > {

    constructor(props: {}) {
        super(props);
        this.state = {
            title: '',
            itemsList: new Array<Item>(),
            token: '',
            page: '',
            actionType: '',
        }

        this.myAction = this.myAction.bind(this);
    }

    componentDidMount() {
        const formData = new FormData();
        formData.append('grant_type', 'password');
        formData.append('username', 'pato');
        formData.append('password', 'lebatin');
        const username = 'pato';
        const password = '456'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/x-www-form-urlencoded', 'accept': 'application/json', },
            //headers: { 'Authorization': 'Bearer YXNkOmFzZA=='},
            body: 'grant_type=&username=pato&password=lebatin&scope=&client_id=&client_secret='
        };
        //const headers = { 'Authorization': 'Bearer YXNkOmFzZA=='};
        //const headers = { 'Authorization': 'Bearer ' + btoa('username=pato:password=lebation')};

        const headers = {'Content-type': 'application/json'};
        fetch("http://localhost:8004/user/login", {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=&username=pato&password=lebatin&scope=&client_id=&client_secret='
        }).then((Response) => {
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

    myAction(actionType: string) {
        console.log(actionType);
        this.setState({
            actionType: actionType
        });
    }

    setComponent() {
        switch(this.state.actionType) {
        case "login":
        return <Login
            logInDataAccount={ (login, password) => this.logInDataAccount(login, password) }
         />
            default:
                return null;
        }
    }

    logInDataAccount(login: string, password: string) {
        console.log("log in");
        console.log(login);
        console.log(password);
        fetch("http://localhost:8004/user/login", {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=&username=' + login + '&password=' + password + '&scope=&client_id=&client_secret='
        }).then((Response) => {
            console.log("poh claro");
            console.log(Response);

            return Response.json();
        }).then((Response) => {
            console.log(Response);
        });
    }



    render() {
        let component = this.setComponent();


        /*
        if (this.state.itemsList && this.state.itemsList.length > 0) {
            console.log("there is a list");
            console.log(this.state);
            component = <ItemsList
                            items={this.state.itemsList}
                        />
        }
        */
        return (
            <div>
                <Header
                    myAction={ this.myAction }
                 />
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
