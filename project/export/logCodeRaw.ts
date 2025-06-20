import {getEmbedAsString} from "@anio-software/enkore.target-js/project"

export function logCodeRaw(argument: string): string {
	let implementation = getEmbedAsString("text://log.ts")

	// convert export function into an IIFE
	implementation = implementation
		.split(`export function logImplementation(logMessage) {`)
		.join(`(function(logMessage) {`)

	return `;${implementation})(${argument});`
}
