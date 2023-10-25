import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { mergeAttributes } from '@tiptap/core';

// Import React components for rendering
import { GenerateButton, WordCountInput } from './Options';


export default Node.create({
  name: 'reactComponent',
  group: 'block',
  content: 'inline*',
  atom: true,

  addAttributes() {
    return {
      count: {
        default: 0,
      },
    };
  },

  parseHTML() {
    return [
      { tag: 'button-component' },
      { tag: 'input-component' },
    ];
  },

  // renderHTML({ HTMLAttributes }) {
  //   return [
  //     ['button-component', HTMLAttributes],
  //     ['input-component', HTMLAttributes],
  //   ];
  // };
  
  

  addNodeView() {
    return (ReactNodeViewRenderer(GenerateButton),
      ReactNodeViewRenderer(WordCountInput)

    );
  },
});
