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
					<a href="http://localhost:3000/">Login</a>
				<br>
				<br>
					Your email is: ${user.email}
				<br>
				<br>
					Your password is: ${password}
				<br>
				<br>
					Thank you,
				<br>
					PVonWeb
			</p>
		`
	)
}