// NB: we don't do typing here because we need the
// file's content to be stable (see project/export/logCode.mts why)

// @ts-ignore:next-line
export function logImplementation(logMessage) {
	const ENV_DEBUG_KEY = "ENKORE_DEBUG"

	if (!globalThis) return;
	if (!("console" in globalThis)) return;
	if (!globalThis.console) return;
	if (typeof globalThis.console.log !== "function") return;

	let debugEnabled = false;

	if (typeof window === "object") {
		if (ENV_DEBUG_KEY in window) {
			debugEnabled = true;
		}
	}
	// @ts-ignore:next-line
	else if (typeof process === "object") {
		// @ts-ignore:next-line
		if (typeof process.env === "object") {
			// @ts-ignore:next-line
			if (ENV_DEBUG_KEY in process.env) {
				debugEnabled = true;
			}
		}
	}

	if (!debugEnabled) return;

	const debugPrefix = "enkore debug: "
	const padding = " ".repeat(debugPrefix.length)

	// @ts-ignore:next-line
	const log = (msg) => globalThis.console.log(msg)

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
