import React from 'react'

export default ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label htmlFor={label}>{label}</label>
			<input {...input} style={{ marginButtom: '5px' }} id={label} />
			<div className="red-text" style={{ marginButtom: '20px' }}>
				{touched && error}
			</div>
		</div>
	)
}
