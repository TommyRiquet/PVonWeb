export const passwordEmailTemplate = (user: any, password: string) => {
	return (
		`
			<p>
				Hello ${user.firstName} ${user.lastName},
				<br>
				<br>
					You have been invited to join PVonWeb.
				<br>
				<br>
					Please click on the link below to login.
				<br>
				<br>
					<a href="https://pvonweb.be">Login</a>
				<br>
				<br>
					Your email is: <code>${user.email}</code>
				<br>
				<br>
					Your password is: <code>${password}</code>
				<br>
				<br>
					Thank you,
				<br>
					PVonWeb
			</p>
		`
	)
}
