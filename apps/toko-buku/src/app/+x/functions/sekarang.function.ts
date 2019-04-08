export function sekarang(): string {
	const now = new Date();
	let at = now.getFullYear()
		+ '-' + (now.getMonth() + 1).toString().padStart(2, '0')
		+ '-' + now.getDate().toString().padStart(2, '0')
		+ ' ' + now.getHours().toString().padStart(2, '0')
		+ ':' + (1 + now.getMinutes()).toString().padStart(2, '0')
		+ ':' + now.getSeconds().toString().padStart(2, '0')
	return at;
}
