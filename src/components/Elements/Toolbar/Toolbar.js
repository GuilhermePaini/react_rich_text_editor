import React from 'react';
import { Text, Editor, Transforms } from 'slate';

import { Icon } from 'react-icons-kit'
import { bold } from 'react-icons-kit/icomoon/bold'
import { embed } from 'react-icons-kit/icomoon/embed'

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

const Toolbar = editor => {

  return (
      <div>
          <a
              onMouseDown={event => {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
              }}
          >
              <Icon icon={bold} />
          </a>
          <a
              onMouseDown={event => {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
              }}
          >
              <Icon icon={embed} />
          </a>
          <button
              onMouseDown={event => {
              event.preventDefault()
              CustomEditor.toggleTitleBlock(editor)
              }}
          >
              Title
          </button>
          <button
              onMouseDown={event => {
              event.preventDefault()
              CustomEditor.toggleItalicMark(editor)
              }}
          >
              Italic
          </button>
      </div>
  );
}

export default Toolbar;