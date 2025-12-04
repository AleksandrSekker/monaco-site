import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'bzqr2t71',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: true,
  },
})
