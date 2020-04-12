import React from 'react'

export default ({ loading = false, label = "Click", onClick, ...restProps }) => {

	if(loading) {
		return (
			<div class="btn disable-btn">Loading...</div>
		)
	}

	return (
		<div onClick={onClick}
			{...restProps} >
			{label}
		</div>
	)
}
