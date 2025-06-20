import logImplementationSourceCode from "#~src/__logImplementation.str.ts"

export function logCode(message: string): string {
	let implementation = logImplementationSourceCode

	// convert export function into an IIFE
	implementation = implementation
		.split(`export function logImplementation(logMessage) {`)
		.join(`(function(logMessage) {`)

	return `;${implementation})(${JSON.stringify(message)});`
}
