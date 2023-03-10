import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'phosphor-react'
import { useEffect } from 'react'

import { Document } from '@shared/types/ipc'

export function CreatePage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { isLoading: isCreatingNewDocument, mutateAsync: createDocument } =
    useMutation(
      async () => {
        const response = await window.api.createDocument()
        return response.data
      },
      {
        onSuccess: (newDocument) => {
          queryClient.setQueryData<Document[]>(['documents'], (documents) => {
            if (documents && documents?.length >= 0) {
              return [...documents, newDocument]
            } else {
              return [newDocument]
            }
          })

          navigate(`/documents/${newDocument.id}`)
        },
      },
    )

  useEffect(() => {
    function onNewDocument() {
      createDocument()
    }

    const unsubscribe = window.api.onNewDocumentRequest(onNewDocument)

    return () => {
      unsubscribe()
    }
  }, [createDocument])

  return (
    <button
      onClick={() => createDocument()}
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60"
      disabled={isCreatingNewDocument}
    >
      <Plus className="h-4 w-4" />
      Novo documento
    </button>
  )
}
