import { Field, Int, ObjectType } from 'type-graphql'

import User from './User'

@ObjectType()
export default class Rate {
	@Field(_type => Int)
	value: number

	@Field()
	date: Date

	user: User
}
