import React from 'react';

interface Props {
    logInDataAccount(login: string, password: string): any;
}

interface State {
    login: string;
    password: string;
}


class Login extends React.Component< Props, State > {
    constructor(props: Props) {
        super(props);

        this.state = {
            login: '',
            password: '',
        }

        this.handleClick = this.handleClick.bind(this);
    }

    onChange(field: string, e: string) {
        console.log(e);
        if (field === "login") {
            this.setState({
                login: e
            });
        }
        else if (field === "password") {
            this.setState({
                password: e
            });
        }
    }

    handleClick() {
        console.log("handle");
        console.log(this.state);
        this.props.logInDataAccount(this.state.login, this.state.password);
    }

    render() {
        return (
            <div>
                <input type="text" onChange={ (e) => this.onChange('login', e.target.value)} />
                <input type="password" onChange={ (e) => this.onChange('password', e.target.value)} />
                <button
                    onClick={ this.handleClick }
                >Login</button>
            </div>
        )
    }
}


export default Login;