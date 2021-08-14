import React from 'react';
import './App.css';


interface Props {
    myAction(actionType: string): any;
};


class Header extends React.Component< Props, {} > {

    constructor(props: Props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(actionType: string) {
        console.log("handleClick");
        this.props.myAction(actionType);
    }

    render() {
        return (
            <div>
                <span>Hola</span>
                <button
                    onClick={ () => this.handleClick("login") }
                    >Login
                </button>
            </div>
        )
    }
}


export default Header;