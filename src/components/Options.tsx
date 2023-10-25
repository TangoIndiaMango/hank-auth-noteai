import React from 'react';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';

type GenerateProps = {
  onClick: () => void;
  prompt?: string;
};

export const GenerateButton = ({ onClick }: GenerateProps) => {
  return (
    <NodeViewWrapper className="react-component-with-content">
      <button onClick={onClick}>More Context</button>
    </NodeViewWrapper>
  );
};

type GenerateNumProps = {
  value: any;
  onClick: () => void;
};

export const WordCountInput = ({ value, onClick }: GenerateNumProps) => {
  return (
    <NodeViewWrapper className="react-component-with-content">
      <NodeViewContent className="content" />
      <button onClick={onClick}>More Context</button>
    </NodeViewWrapper>
  );
};
