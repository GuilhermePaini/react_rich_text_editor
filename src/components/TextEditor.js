import React, { useCallback, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import {CodeElement, DefaultElement, BoldElement, TitleElement, ItalicElement} from './Elements/';

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
        return <CodeElement {...props} />
      case 'bold':
        return <BoldElement {...props} />
      case 'title':
        return <TitleElement {...props} />
      case 'italic':
        return <ItalicElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const Leaf = props => {
    return (
      <span 
        {...props.attributes} 
        style={{ 
          fontWeight: props.leaf.bold ? 'bold' : 'normal', 
          fontStyle: props.leaf.italic ? 'italic' : 'normal'
        }}
      >
        {props.children}
      </span>
    )
  }

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