import {
	Resolver,
	Query,
	FieldResolver,
	Arg,
	Root,
	Mutation,
	Int,
	ResolverInterface,
} from 'type-graphql'
import { plainToClass } from 'class-transformer'

import Recipe from 'src/models/Recipe'
import RecipeInput from 'src/models/RecipeInput'
import createRecipes from 'samples/createRecipes'

@Resolver(_of => Recipe)
export default class RecipeResolver implements ResolverInterface<Recipe> {
	private readonly items: Recipe[] = createRecipes()

	@Query(_returns => Recipe, { nullable: true })
	async recipe(@Arg('title') title: string): Promise<Recipe | undefined> {
		return await this.items.find(recipe => recipe.title === title)
	}

	@Query(_returns => [Recipe], {
		description: 'Get all the recipes from around the world ',
	})
	async recipes(): Promise<Recipe[]> {
		return await this.items
	}

	@Mutation(_returns => Recipe)
	async addRecipe(@Arg('recipe') recipeInput: RecipeInput): Promise<Recipe> {
		const recipe = plainToClass(Recipe, {
			description: recipeInput.description,
			title: recipeInput.title,
			ratings: [],
			creationDate: new Date(),
		})
		await this.items.push(recipe)
		return recipe
	}

	@FieldResolver()
	ratingsCount(
		@Root() recipe: Recipe,
		@Arg('minRate', _type => Int, { defaultValue: 0.0 }) minRate: number,
	): number {
		return recipe.ratings.filter(rating => rating >= minRate).length
	}
}
