import { ToC } from '../components/ToC'

export function Document() {
  return (
    <main className="flex flex-1 pv-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
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

      <section className="flex flex-col items-center">
        <h1 className="text-4xl font-bold">Document</h1>
      </section>
    </main>
  )
}
