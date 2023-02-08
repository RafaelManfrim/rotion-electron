import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Editor } from '../components/Editor'
import { ToC } from '../components/ToC'

export function Document() {
  const { id } = useParams<{ id: string }>()

  const { data, isFetching } = useQuery(['document', id], async () => {
    const response = await window.api.fetchDocument({ id: id! })

    return response.data
  })

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`
    }
  }, [data])

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
        {!isFetching && initialContent && <Editor content={initialContent} />}
      </section>
    </main>
  )
}
