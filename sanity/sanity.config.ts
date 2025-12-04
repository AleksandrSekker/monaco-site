// sanity/sanity.config.ts
import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structureTool} from 'sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'monaco-site',
  projectId: 'bzqr2t71',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
