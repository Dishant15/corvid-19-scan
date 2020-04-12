export default class Urls {

	static getHomePage() {
		return '/'
	}

	static get404() {
		return '/404'
    }

    static getUserProfile(page=':page') {
		return `/user/${page}`
	}

	// auth types : login | signup | first-login | verify
	static getAuthPages(auth_type=':auth_type') {
		return `/auth/${auth_type}`
	}

	static getForgotPassPage() {
		return '/password/forgot/'
	}

	static getResetPassPage(uuid=':uuid') {
		return `/password/reset/${uuid}`
	}
}