import React, { useEffect, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const App = () => {

    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState([
        {
          type: 'paragraph',
          children: [
              { text: 'A line of text in a paragraph.' }
            ],
        },
    ])

    return (
        <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
            <Editable 
                onKeyDown={event => {
                   
                }}
            />
        </Slate>
      )
}

const CodeElement = props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
}

const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
}
export default App;