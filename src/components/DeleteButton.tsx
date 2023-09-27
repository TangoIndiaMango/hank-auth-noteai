"use client"
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Loader2, Trash } from 'lucide-react';
import ConfirmationDialog from './ConfirmationDialog';
import { toast } from 'react-toastify';

type Props = {
    noteId: number;
};

const DeleteButton: React.FC<Props> = ({ noteId }) => {
    const router = useRouter();
    const deleteNote = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/deleteNote', {
                noteId,
            });
            return response.data;
        },
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDeleteConfirmation = () => {
        setIsDialogOpen(false);
        deleteNote.mutate(undefined, {
            onSuccess: () => {
                toast.success('Note Deleted 🅰')
                router.push('/dashboard');
            },
            onError: (err) => {
                console.log(err);
            },
        });
    };

    return (
        <>
            {isDialogOpen ? (
                <ConfirmationDialog
                    message="Are you sure you want to delete this Note book?"
                    onConfirm={handleDeleteConfirmation}
                    onCancel={() => setIsDialogOpen(false)}
                />
            ) : (<Button
                variant="destructive"
                disabled={deleteNote.isLoading}
                size="sm"
                onClick={() => {
                    setIsDialogOpen(true);
                }}
            >
                {deleteNote.isLoading ? <><Loader2 className='w-4 h-4 mr-2 animate-spin' /> <Trash /> </> : <Trash />}
            </Button>)}


        </>
    );
};

export default DeleteButton;
