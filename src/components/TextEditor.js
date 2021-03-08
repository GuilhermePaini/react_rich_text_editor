import React, { useCallback, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Text, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import {CodeElement, DefaultElement, BoldElement, TitleElement, ItalicElement} from './Elements/';

import Toolbar from './Elements/Toolbar/';

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
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

  isItalicMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.italic === true,
    })

    return !!match
  },

  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor)
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
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
      case 'italic':
        return <ItalicElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  /*const onKeyDown = (event) => {
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

      case 'i': {
        event.preventDefault()
        CustomEditor.toggleItalicMark(editor)
        break
      }
    }
  };*/

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
      <Toolbar editor={editor} custom={CustomEditor}/>
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