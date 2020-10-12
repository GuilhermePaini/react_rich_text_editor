import React from 'react'
import ReactDOM from 'react-dom'

import Primeiro from './components/Primeiro'
import Button from './components/Button'

let root = document.getElementById('root');

ReactDOM.render(
    <div>
        <Primeiro />
        <Button name='carol'/>
    </div>, 
    root
);
