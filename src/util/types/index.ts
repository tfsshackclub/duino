import { firestore } from 'firebase'

export interface Member {
	id?: string
	name: string
	age: number
	projects: string[]
}

export interface Project {
	id?: string
	url: string
	makers: string[]
	github: string
	title: string
	description: string
	date: string
	created: firestore.Timestamp
}
