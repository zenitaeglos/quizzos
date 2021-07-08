import React from 'react';
import './App.css';
import { Item } from './App';


interface Props {
    items: Array<Item>;
}

interface AppState {
    items: Array<Item>;
}


class ItemsList extends React.Component< Props , AppState > {
    constructor(props: Props) {
        super(props);
        this.state = {
            items: this.props.items
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.items.map((item, i) => {
                        return <p key={i} >{item.name}</p>
                    })
                }
            </div>
        )
    }
}


export default ItemsList;