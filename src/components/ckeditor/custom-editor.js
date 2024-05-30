import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

const editorConfiguration = {
  toolbar: {
    items: [
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
      '|',
      'videoInsert', // Added video insert button
    ],
  },
  // Configure the media embed feature
  mediaEmbed: {
    previewsInData: true,
  },
  link: {
    decorators: {
      toggleDownloadable: {
        mode: 'manual',
        label: 'Downloadable',
        attributes: {
          download: 'file',
        },
      },
      openInNewTab: {
        mode: 'manual',
        label: 'Open in a new tab',
        defaultValue: true,
        attributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      },
    },
  },
};

function CustomEditor({ initialData, onChange }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfiguration}
      data={initialData}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data); // Call the onChange function passed from the parent component
      }}
      // onReady={(editor) => {
      //     CKEditorInspector.attach(editor);
      // }}
    />
  );
}

export default CustomEditor;
