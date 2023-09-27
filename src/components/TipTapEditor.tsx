"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit"
import TipTapMenuBar from './TipTapMenuBar';
import { Button } from './ui/button';
import { useDebounce } from '@/lib/useDebounceHook';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Text from "@tiptap/extension-text";
import { NoteType } from '@/lib/db/schema';
import { useCompletion } from 'ai/react';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

type Props = { note: NoteType }

const TipTapEditor = ({ note }: Props) => {
    // on entry to the webpage, show the notebook title or last saved spot
    const [editorState, setEditorState] = useState(note.editorState || `<h1>${note.name}</h1>`)
    const { complete, completion } = useCompletion({
        api: '/api/completion'
    })
    const saveNote = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/saveNote', {
                noteId: note.id,
                editorState
            })
            return response.data
        }
    })
    const customText = Text.extend({
        addKeyboardShortcuts() {
            return {
                "Shift-a": () => {
                    //take last 30 words
                    const prompt = this.editor.getText().split(' ').slice(-30).join(' ')
                    complete(prompt)
                    // console.log(prompt)
                    return true
                }
            }
        }
    })

    const editor = useEditor({
        autofocus: true,
        extensions: [StarterKit, customText],
        content: editorState,
        onUpdate: ({ editor }) => {
            setEditorState(editor.getHTML())
        },
    })
    const debounceEditorState = useDebounce(editorState, 1500)
    const lastCompletion = useRef('');

    useEffect(() => {
        // get individual word so we can insert into the editor
        if (!editor || !completion) return;
        const diff = completion.slice(lastCompletion.current.length)
        lastCompletion.current = completion

        editor.commands.insertContent(diff)

    }, [completion, editor]);

    useEffect(() => {
        //save to db
        if (debounceEditorState == "") return
        saveNote.mutate(undefined, {
            onSuccess: data => { toast.success("Note Saved") },
            onError: err => {
                toast.error("There was a problem saving your note.")
                console.log("an error occured", err)
            }
        })
        // console.log(debounceEditorState)

        return () => { }
    }, [debounceEditorState])

    return (
        <>
            <div className="flex">
                {editor && <TipTapMenuBar editor={editor} />}
                <Button className='ml-auto' disabled variant={"outline"}>{
                    saveNote.isLoading ? (
                        <>
                            <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                            <p>Saving....</p>
                        </>
                    ) : (<p>Saved</p>)
                }</Button>

            </div>
            <div className="prose prose-sm w-full mt-4">
                <EditorContent editor={editor} />
            </div>
            <div className="h-4"></div>
            <span className='text-sm'>Tip: Press {" "}<kbd className="px-2 py-1.5 text-xs font-semibold text-gray-900 border border-gray-200 rounded-lg">Shift + A</kbd> {" "} for AI autocomplete</span>
        </>
    )
}

export default TipTapEditor