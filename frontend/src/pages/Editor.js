import React, { useState, useRef } from 'react';
import '../styles/editor.css';

const Editor = () => {
  const [content, setContent] = useState('');
  const editorRef = useRef(null);
  const [suggestions] = useState([
    "Consider adding more keywords for SEO",
    "Expand this section with examples",
    "Add a call-to-action here"
  ]);

  const applySuggestion = (suggestionText) => {
    if (editorRef.current) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const suggestionNode = document.createTextNode(`\n${suggestionText} `);
      range.insertNode(suggestionNode);
      setContent(editorRef.current.innerText);
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2 className="editor-title">Content Editor</h2>
        <div className="editor-actions">
          <button className="editor-button">Save Draft</button>
          <button className="editor-button primary">Publish</button>
        </div>
      </div>

      <div className="editor-toolbar">
        <button className="toolbar-button" title="Bold">B</button>
        <button className="toolbar-button" title="Italic">I</button>
        <button className="toolbar-button" title="Heading">H</button>
        <button className="toolbar-button" title="Link">🔗</button>
        <button className="toolbar-button" title="Image">🖼️</button>
      </div>

      <div 
        ref={editorRef}
        className="editor-content"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => setContent(e.currentTarget.textContent)}
        placeholder="Start writing your content here..."
      ></div>

      <div className="ai-suggestions">
        <h3 className="suggestions-title">AI Writing Assistant</h3>
        {suggestions.map((suggestion, index) => (
          <div key={index} className="suggestion-item">
            {suggestion}
            <button 
              className="apply-button"
              onClick={() => applySuggestion(suggestion)}
              aria-label={`Apply suggestion: ${suggestion}`}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Editor;