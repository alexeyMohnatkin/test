export default function({ spriteContent, application, finalState, css, js }) {
	return `<!doctype html>
	<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta http-equiv="x-ua-compatible" content="ie=edge">
			<title>Shakakode admin</title>
			<meta name="description" content="">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" href="${css}">
		</head>
		<body>
			${spriteContent}
			<div id="root">${application}</div>
			<script>
				// WARNING: See the following for Security isues with this approach:
				// http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
				window.__PRELOADED_STATE__ = ${JSON.stringify(finalState)}
			</script>
			<script src="${js}"></script>
		</body>
	</html>`;
}
