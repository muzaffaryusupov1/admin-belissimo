export const getLocale = (key: string) => localStorage.getItem(key)

export function slugify(str: string) {
	return String(str)
		.normalize('NFKD') // split accented characters into their base characters and diacritical marks
		.replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
		.trim() // trim leading or trailing whitespace
		.toLowerCase() // convert to lowercase
		.replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
		.replace(/\s+/g, '-') // replace spaces with hyphens
		.replace(/-+/g, '-') // remove consecutive hyphens
}

export function isValidSlug(slug: string) {
	const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
	return slugRegex.test(slug)
}

export function isUrlValid(string: string) {
	try {
		new URL(string)
		return true
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log(err.message)
		} else {
			console.log("It's not url")
		}
		return false
	}
}
