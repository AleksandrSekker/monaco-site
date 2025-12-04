// sanity.config.ts
import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default createConfig({
  name: 'default',
  title: 'monaco-site',
  projectId: 'bzqr2t71',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
