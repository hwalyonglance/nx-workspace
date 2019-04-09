export function truncate(str: string, maxLength: number = 128): string {
	if ( str && str.length > maxLength ) { return str.substring(0, maxLength) + '...'; }
	return str;
}
