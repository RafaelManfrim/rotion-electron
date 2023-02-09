import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Document as DocumentType } from '@shared/types/ipc'
import { Editor, OnContentUpdateParams } from '../components/Editor'
import { ToC } from '../components/ToC'

export function Document() {
  const { id } = useParams<{ id: string }>()

  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery(['document', id], async () => {
    const response = await window.api.fetchDocument({ id: id! })

    return response.data
  })

  const { mutateAsync: saveDocument } = useMutation(
    async ({ title, content }: OnContentUpdateParams) => {
      await window.api.saveDocument({
        id: id!,
        title,
        content,
      })
    },
    {
      onSuccess: (_, { title }) => {
        queryClient.setQueryData<DocumentType[]>(['documents'], (documents) => {
          return documents?.map((document) => {
            if (document.id === id) {
              return {
                ...document,
                title,
              }
            }

            return document
          })
        })
      },
    },
  )

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`
    }
  }, [data])

  function handleUpdateContent({ title, content }: OnContentUpdateParams) {
    saveDocument({ title, content })
  }

  return (
    <main className="flex flex-1 pv-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0 p-2">
        <span className="text-rotion-300 text-xs font-semibold">
          TABLE OF CONTENTS
        </span>

        <ToC.Root>
          <ToC.Link>Back-end</ToC.Link>
          <ToC.Section>
            <ToC.Link>Django</ToC.Link>
            <ToC.Link>Node</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex flex-col items-center p-2">
        {!isFetching && initialContent && (
          <Editor
            content={initialContent}
            onContentUpdate={handleUpdateContent}
          />
        )}
      </section>
    </main>
  )
}
