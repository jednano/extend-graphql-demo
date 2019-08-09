import { Field, InputType } from 'type-graphql'

import Recipe from './Recipe'

@InputType()
export default class RecipeInput implements Partial<Recipe> {
	@Field()
	title: string

	@Field({ nullable: true })
	description?: string
}
