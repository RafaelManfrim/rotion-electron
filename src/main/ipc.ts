import { ipcMain } from 'electron'

ipcMain.handle('fetch-documents', async () => {
  return [
    { id: '1', title: 'Document 1' },
    { id: '2', title: 'Document 2' },
    { id: '3', title: 'Document 3' },
  ]
})
