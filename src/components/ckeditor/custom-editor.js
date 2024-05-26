import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorConfiguration = {
    toolbar: [
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
        'undo',
        'redo'
    ]
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
        />
    );
}

export default CustomEditor;