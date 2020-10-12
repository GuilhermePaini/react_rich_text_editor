import React from 'react'
import ReactDOM from 'react-dom'

import Primeiro from './components/Primeiro'
import Link from './components/Button'

let root = document.getElementById('root');

ReactDOM.render(
    <div>
        <Primeiro />
        <Link href='carol'/>
    </div>, 
    root
);
