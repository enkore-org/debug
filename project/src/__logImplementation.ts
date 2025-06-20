// NB: we don't do typing here because we need the
// file's content to be stable (see project/export/logCode.ts why)

// @ts-ignore:next-line
export function logImplementation(logMessage) {
	const ENV_DEBUG_KEY = "ENKORE_DEBUG"

	const debugEnabled = (() => {
		// @ts-ignore:next-line
		if (typeof process === "object") {
			// @ts-ignore:next-line
			if (typeof process.env === "object") {
				// @ts-ignore:next-line
				if (ENV_DEBUG_KEY in process.env) {
					return true
				}
			}
		}

		// @ts-expect-error
		if (typeof window === "object") {
			// @ts-expect-error
			if (ENV_DEBUG_KEY in window) {
				return true
			}
		}

		return false
	})()

	if (!debugEnabled) {
		return
	}

	// use process.stderr.write when available
	const log = (() => {
		// @ts-ignore:next-line
		if (typeof process === "object") {
			// @ts-ignore:next-line
			if (typeof process.stderr === "object") {
				// @ts-ignore:next-line
				if (typeof process.stderr.write === "function") {
					// @ts-ignore:next-line
					return (msg) => {
						// @ts-ignore:next-line
						process.stderr.write(msg + "\n")
					}
				}
			}
		}

		if (typeof globalThis === "object") {
			// @ts-expect-error
			if (typeof globalThis.console === "object") {
				// @ts-expect-error
				if (typeof globalThis.console.log === "function") {
					// @ts-ignore:next-line
					return (msg) => {
						// @ts-expect-error
						return globalThis.console.log(msg)
					}
				}
			}
		}

		return () => {}
	})()

	const debugPrefix = "enkore debug: "
	const padding = " ".repeat(debugPrefix.length)

	const lines = logMessage.split("\n")

	let assembledMessage = ``

	for (const [index, line] of lines.entries()) {
		if (index === 0) {
			assembledMessage += `${debugPrefix}${line}\n`
		} else {
			assembledMessage += `${padding}${line}\n`
		}
	}

	log(assembledMessage.trimEnd())
}
