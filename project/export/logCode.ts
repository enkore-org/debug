import {getEmbedAsString} from "@anio-software/enkore.target-js/project"

export function logCode(message: string): string {
	let implementation = getEmbedAsString("text://log.ts")

	// convert export function into an IIFE
	implementation = implementation
		.split(`export function logImplementation(logMessage) {`)
		.join(`(function(logMessage) {`)

	return `;${implementation})(${JSON.stringify(message)});`
}
