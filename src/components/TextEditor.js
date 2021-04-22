import React, { useCallback, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import {Code, Default, Bold, Title, Italic, Leaf} from './Elements/';

import Toolbar from './Toolbar';

const App = () => {

  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
      {
        type: 'paragraph',
        children: [
            { text: 'A line of text in a paragraph.' }
          ],
      },
  ]);

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <Code {...props} />
      case 'bold':
        return <Bold {...props} />
      case 'title':
        return <Title {...props} />
      case 'italic':
        return <Italic {...props} />
      default:
        return <Default {...props} />
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  return (
    <Slate 
      editor={editor} 
      value={value} 
      onChange={newValue => setValue(newValue)}
    >
      <Toolbar editor={editor}/>
      <Editable
        renderElement={renderElement}
        //onKeyDown={onKeyDown}
        renderLeaf={renderLeaf}
        className='editor'
      />
    </Slate>
  );
}

export default App;