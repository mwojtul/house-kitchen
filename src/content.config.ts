import { file } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import type { Person, WithContext, Recipe } from 'schema-dts';

const RecipeSchema = z.object({
	'@context': z.literal('https://schema.org'),
	'@type': z.literal('Recipe'),

	// Core metadata
	name: z.string(),
	description: z.string(),
	image: z.string(),
	slug: z.string(),

	// Author object
	author: z.object({
		'@type': z.literal('Person'),
		name: z.string(),
	}),

	datePublished: z.string(), // ISO date string

	// Keywords can be stored as one string with commas
	keywords: z.string(),

	recipeCategory: z.string(),
	recipeCuisine: z.string(),

	// Durations are ISO8601 strings like "PT30M"
	prepTime: z.string(),
	cookTime: z.string(),
	totalTime: z.string(),

	recipeYield: z.string(),

	// Ingredients as a list of strings
	recipeIngredient: z.array(z.string()),

	// Instructions as a list of HowToStep objects
	recipeInstructions: z.array(
		z.object({
			'@type': z.literal('HowToStep'),
			text: z.string(),
		}),
	),

	// Nutrition information object
	nutrition: z.object({
		'@type': z.literal('NutritionInformation'),
		calories: z.string(),
		carbohydrateContent: z.string(),
		proteinContent: z.string(),
		fatContent: z.string(),
		sugarContent: z.string(),
		fiberContent: z.string(),
		sodiumContent: z.string(),
	}),
}) satisfies z.ZodType<Recipe>;
export type RecipeSchema = z.infer<typeof RecipeSchema>;

const recipes = defineCollection({
	loader: file('src/data/recipes.json'),
	schema: RecipeSchema,
});

export const collections = { recipes };
