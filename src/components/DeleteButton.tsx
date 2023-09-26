"use client"

import React from 'react'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {
    noteId: number
}

const DeleteButton = ({noteId}: Props) => {
    const router = useRouter()
    const deleteNote = useMutation({
        mutationFn: async () => {
            const response = await axios.post("/api/deleteNote", {
                noteId
            })
            return response.data
        }
    })
  return (
    <Button variant={'destructive'} disabled={deleteNote.isLoading} size="sm" onClick={() => {const confirm = window.confirm("Areyou sure you want to delete this Note book?")
    if (!confirm) return    
    deleteNote.mutate(undefined, {
        onSuccess: () => {
            router.push("/dashboard")
        },
        onError: err => {
            console.log(err)
        }
    })
    }}>
        
    </Button>
  )
}

export default DeleteButton