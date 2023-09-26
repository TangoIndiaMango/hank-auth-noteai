"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Loader2, Plus } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {}

const CreateNoteDialog = (props: Props) => {
    const [input, setInput] = useState("")
    const router = useRouter()
    const uploadToFirebase = useMutation({
        mutationFn: async (noteId: string) => {
            const response = await axios.post('/api/uploadToFirebase', {
                noteId
            })
            return response.data
        }
    })
    const createNotebook = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/createNoteBook', {
                name: input
            })
            return response.data
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input === "") {
            window.alert("Please enter a name for your notebook")
            return
        }
        createNotebook.mutate(undefined, {
            onSuccess: ({note_id}) => {
                console.log(`created new note ${note_id}`)
                // hit an endpoint to upload temp image url to permanent firebase
                uploadToFirebase.mutate(note_id)
                router.push(`/notebook/${note_id}`)

            },
            onError: (error) => {
                console.log(error);
                window.alert("Failed to create notebook")
            },
        })

    }
    return (
        <Dialog>
            <DialogTrigger>
                <div className='border-dashed border-2 flex border-slate-500 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4'>
                    <Plus className='w-6 h-6 text-slate-700' strokeWidth={3} />
                    <h2 className='font-semibold text-slate-700 sm:mt-2'>New Notebook</h2>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle >
                        New NoteBook
                    </DialogTitle>
                    <DialogDescription>
                        You can create a new note by clicking the button below
                    </DialogDescription>

                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <Input value={input} onChange={(e: any) => setInput(e.target.value)} placeholder="Name...." />
                    <div className="h-4"></div>
                    <div className="flex items-center gap-2">
                        <Button type="reset" variant={'secondary'}>Cancel</Button>
                        <Button type="submit" disabled={createNotebook.isLoading} className='bg-slate-600'>{createNotebook.isLoading && (
                            <Loader2 className='w-4 h-4 mr-2 animate-spin'/>

                        )} Create</Button>

                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNoteDialog