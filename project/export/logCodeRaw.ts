import logImplementationSourceCode from "#~src/__logImplementation.str.ts"

export function logCodeRaw(argument: string): string {
	let implementation = logImplementationSourceCode

	// convert export function into an IIFE
	implementation = implementation
		.split(`export function logImplementation(logMessage) {`)
		.join(`(function(logMessage) {`)

	return `;${implementation})(${argument});`
}
