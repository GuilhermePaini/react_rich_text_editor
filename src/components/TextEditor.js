// Import React dependencies.
import React, { useEffect, useMemo, useState } from 'react';
// Import the Slate editor factory.
import { createEditor } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';

// Define our app...
const App = () => {
    // Create a Slate editor object that won't change across renders.
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
            <Editable />
        </Slate>
      )
}

export default App;