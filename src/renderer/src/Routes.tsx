import { Router, Route } from 'electron-router-dom'

import { Blank } from './pages/Blank'
import { Document } from './pages/Document'
import { Default } from './pages/layouts/Default'

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Blank />} />
          <Route path="/documents/:id" element={<Document />} />
        </Route>
      }
    />
  )
}
