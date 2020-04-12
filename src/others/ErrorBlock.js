import React from 'react'

import get from 'lodash/get'

const ErrorBlock = ({ field, error }) => {
	const err_list = get(error, field, false)

	if(err_list) {
		return (
			err_list.map((err, id) => {
				return <div class='error-block' key={id}>{err}</div>
			})
		)
	} else {
		return <div></div>
	}
}

export default ErrorBlock