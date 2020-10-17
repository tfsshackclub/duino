export const greetings = ['Helllooooooo', 'Hiiii', 'Hey', 'Ayo', 'Yoo']

export const sample = <T>(list: T[]) =>
	list[Math.floor(Math.random() * list.length)]
