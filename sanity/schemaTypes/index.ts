import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './documents/post'
import { authorType } from './documents/author'
import { categoryType } from './documents/category'
import { programType } from './documents/program'
import { resourceType } from './documents/resource'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, authorType, categoryType, programType, resourceType],
}
