import React, { Suspense } from 'react'
const SuspenseCpn = Cpn => {
	return props => {
		return (
			<Suspense fallback={<div/>}>
				<Cpn {...props} />
			</Suspense>
		)
	}
}
export default SuspenseCpn
