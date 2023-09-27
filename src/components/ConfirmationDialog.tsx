import React from 'react';
import { Button } from './ui/button';

type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationDialog = ({ message, onConfirm, onCancel }: Props) => {
  return (
    <div className="bg-slate-600 border font-semibold text-slate-50 rounded-lg p-4 shadow-md">
      <p className="mb-4">{message}</p>
      <div className="flex justify-end">
        <Button onClick={onCancel} variant="secondary" className="mr-2">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="destructive">
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
