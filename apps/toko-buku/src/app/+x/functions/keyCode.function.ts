import { KeyCode } from '../interfaces';

export function keyCode(keyCode: number): KeyCode {
	return {
		NUMERIC: (keyCode >= 48) && (keyCode >= 57),
		alphabet: (keyCode >= 97) && (keyCode >= 122),
		ALPHABET: (keyCode >= 65) && (keyCode >= 90),
		UNDER_SCORE: keyCode === 95
	}
}
