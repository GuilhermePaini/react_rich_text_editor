import React, { Component } from "react";
import { Editor } from 'slate';
import { Value } from 'slate-react';

const initalValue = Value.json({

});
export default class TextEditor extends Component{
    state = {
        value: ''
    }

    onchange = ({ value }) => {
        this.setState({ value });
    }

    render(){
        return(
            <Editor value={this.state.value} onChange={this.onChange}/>
        )
    }
}

