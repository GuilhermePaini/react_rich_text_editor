import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Text, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import {CodeElement, DefaultElement, BoldElement, TitleElement} from './Elements/';

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
    })

    return !!match
  },

  isTitleMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'title',
    })

    return !!match
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })

    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleTitleBlock(editor) {
    const isActive = CustomEditor.isTitleMarkActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'title' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },
}

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
      default:
        return <DefaultElement {...props} />
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const onKeyDown = (event) => {
    if(!event.ctrlKey){ return }

    switch (event.key) {
      case 'k': {
        event.preventDefault()
        CustomEditor.toggleCodeBlock(editor)
        break
      }

      case 'b': {
        event.preventDefault()
        CustomEditor.toggleBoldMark(editor)
        break
      }
    }
  };

  return (
    <Slate 
      editor={editor} 
      value={value} 
      onChange={newValue => setValue(newValue)}
    >
      <div>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleBoldMark(editor)
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleCodeBlock(editor)
          }}
        >
          Code Block
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleTitleBlock(editor)
          }}
        >
          Title
        </button>
      </div>
      <Editable
        renderElement={renderElement}
        onKeyDown={onKeyDown}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
}

const Leaf = props => {
  return (
    <span 
      {...props.attributes} 
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}

export default App;