// sanity.config.ts
import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {deskTool} from 'sanity/desk'

export default defineConfig({
  name: 'default',
  title: 'monaco-site',
  projectId: 'bzqr2t71',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
