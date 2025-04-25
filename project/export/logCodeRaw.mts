import {getEmbedAsString} from "@enkore-target/js-none/project"

export function logCodeRaw(argument: string): string {
	let implementation = getEmbedAsString("text://log.mts")

	// convert export function into an IIFE
	implementation = implementation
		.split(`export function logImplementation(logMessage) {`)
		.join(`(function(logMessage) {`)

	return `;${implementation})(${argument});`
}
