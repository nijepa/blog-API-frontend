/* function saveToken(token, cb) {
  console.log(token)
	localStorage.setItem('nijepa_blog_user', JSON.stringify(token));

	// user is auth ^_^
	cb('AuthUser');
} */

function saveToken(token) {
  console.log(token)
	localStorage.setItem('nijepa_blog_user', JSON.stringify(token));

	// user is auth ^_^

}

export default saveToken;