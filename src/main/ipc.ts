import { ipcMain } from 'electron'
import { IPC } from '@shared/constants/ipc'
import { FetchAllDocumentsResponse } from '@shared/types/ipc'

ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (): Promise<FetchAllDocumentsResponse> => {
    return {
      data: [
        { id: '1', title: 'Document 1', content: 'Content 1' },
        { id: '2', title: 'Document 2', content: 'Content 2' },
        { id: '3', title: 'Document 3', content: 'Content 2' },
      ],
    }
  },
)
