import * as types from './graphql'

import { join } from 'path'
import { makeSchema } from 'nexus'
import { rootDir } from './constants'

export const schema = makeSchema({
  types: types,
  outputs: {
    schema: join(process.cwd(), rootDir, 'generated/schema.graphql'),
    typegen: join(process.cwd(), rootDir, 'generated/nexus-typegen.ts'),
  },
  contextType: {
    module: join(process.cwd(), rootDir, 'context.ts'),
    export: 'Context',
  },
})
