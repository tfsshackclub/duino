import { db } from '../../index'
import { Member, Project } from '../types/index'

export const getMember = async (
	id: string
): Promise<Partial<Member> | null> => {
	const _data = await db.collection('members').doc(id).get()

	if (_data.exists) {
		const data = _data.data()

		const { name, age, projects } = data

		return {
			id,
			name,
			age,
			projects,
		}
	}

	return null
}

export const getProject = async (
	id: string
): Promise<Partial<Project> | null> => {
	const _data = await db.collection('projects').doc(id).get()

	if (_data.exists) {
		const data = _data.data()

		const { url, makers, github, title, description, date, created } = data

		return {
			id,
			url,
			makers,
			github,
			title,
			description,
			date,
			created,
		}
	}

	return null
}

export const getUserProjects = async (
	id: string
): Promise<Partial<Project>[] | null> => {
	const user = await getMember(id)

	if (user.projects) {
		const projects = await Promise.all(
			user.projects.map((project) => getProject(project))
		)

		if (projects) {
			return projects
		}
	}

	return null
}

export const setMember = async (id: string, data: Partial<Member>) => {
	const user = await getMember(id)

	if (!user) {
		return db.collection('users').doc(id).set(data)
	}

	const updatedUser = {
		...user,
		...data,
	}

	return db.collection('users').doc(id).set(updatedUser)
}

export const setProject = async (id: string, data: Partial<Project>) => {
	const project = await getProject(id)

	if (!project) {
		return db.collection('projects').doc(id).set(data)
	}

	const updatedProject = {
		...project,
		...data,
	}

	return db.collection('projects').doc(id).set(updatedProject)
}
