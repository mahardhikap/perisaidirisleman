import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ImageInsertViaUrl from "@ckeditor/ckeditor5-image/src/imageinsertviaurl";
import Editor from "ckeditor5-custom-build"; // Your custom build path

const editorConfiguration = {
  toolbar: [
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "blockQuote",
    "insertTable",
    "undo",
    "redo",
    "|",
    "videoInsert", // Insert video option
    "mediaEmbed", // Embed media option
    // "imageUpload",
    // "insertImage",
  ],
  // plugins: [ImageInsertViaUrl],
  // image: {
  //   insert: {
  //     type: "auto",
  //   },
  //   upload: {
  //     panel: {
  //       items: ["insertImageViaUrl"],
  //     },
  //   },
  // },
  link: {
    decorators: {
      toggleDownloadable: {
        mode: "manual",
        label: "Downloadable",
        attributes: {
          download: "file",
        },
      },
      openInNewTab: {
        mode: "manual",
        label: "Open in a new tab",
        defaultValue: true,
        attributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      },
    },
  },
};

function CustomEditor({ initialData, onChange }) {
  return (
    <CKEditor
      editor={Editor}
      config={editorConfiguration}
      data={initialData}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}

export default CustomEditor;
