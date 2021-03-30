import React from 'react';
import { Text, Editor, Transforms } from 'slate';

import { Icon } from 'react-icons-kit'
import {bold} from 'react-icons-kit/fa/bold'
import {code} from 'react-icons-kit/fa/code'
import { italic } from 'react-icons-kit/icomoon/italic'
import { ic_looks_one } from 'react-icons-kit/md/ic_looks_one'

const Toolbar = props => {
  
  const editor = props.editor;

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

  return (
      <div className="toolbar">
          <span
              onMouseDown={event => {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
              }}
          >
              <Icon size={16} icon={bold} />
          </span>
          <span
              onMouseDown={event => {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
              }}
          >
              <Icon size={16} icon={code} />
          </span>

          <span
              onMouseDown={event => {
              event.preventDefault()
              CustomEditor.toggleItalicMark(editor)
              }}
          >
              <Icon size={16} icon={italic} />
          </span>

          <span
              onMouseDown={event => {
              event.preventDefault()
              CustomEditor.toggleTitleBlock(editor)
              }}
          >
              <Icon size={16} icon={ic_looks_one} />
          </span>
      </div>
  );
}

export default Toolbar;