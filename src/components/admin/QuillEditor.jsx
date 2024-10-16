import { useEffect, useState, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QuillEditor = ({ onContentChange, reset, initialContent }) => {
  const [quillEditor, setQuillEditor] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!quillEditor && editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
          ],
        },
      });

      setQuillEditor(quill);

      // Set the initial content if provided
      if (initialContent) {
        quill.clipboard.dangerouslyPasteHTML(initialContent);
      }

      quill.on('text-change', () => {
        const content = quill.root.innerHTML;
        onContentChange(content);
      });
    }
  }, [quillEditor, onContentChange, initialContent]);

  // Handle reset
  useEffect(() => {
    if (quillEditor && reset) {
      quillEditor.setContents([]);
      onContentChange('');
    }
  }, [reset, quillEditor, onContentChange]);

  // Update editor when initial content changes
  useEffect(() => {
    if (quillEditor && initialContent) {
      quillEditor.clipboard.dangerouslyPasteHTML(initialContent);
    }
  }, [initialContent, quillEditor]);

  return (
    <div className='w-full bg-[#f7f7f7] md:text-xl text-black outline-none p-4 border-2 border-gray-300 rounded-lg'>
      <div ref={editorRef} style={{ height: '300px' }}></div>
    </div>
  );
};

export default QuillEditor;
