import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Editor, Transforms } from 'slate';
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
  ]);

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      case 'bold':
        return <BoldElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, []);

  const onKeyDown = (event) =>{
    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault()
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'code',
      })

      Transforms.setNodes(
        editor,
        { type: match ? 'paragraph' : 'code' },
        { match: n => Editor.isBlock(editor, n) }
      )

    }else if(event.key === 'b' && event.ctrlKey){
      event.preventDefault()
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'bold',
      })

      Transforms.setNodes(
        editor,
        { type: match ? 'paragraph' : 'bold' },
        { match: n => Editor.isBlock(editor, n) }
      )
    }
  };

  return (
    <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
        <Editable
          renderElement={renderElement}
          onKeyDown={onKeyDown}
        />
    </Slate>
  );
}

const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>;
}

const BoldElement = props => {
  return <b {...props.attributes}>{props.children}</b>;
}

export default App;