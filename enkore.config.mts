import {
	createConfig,
	createTargetJSNoneOptions
} from "enkore/spec/factory"

export const config: unknown = createConfig({
	target: {
		name: "js-none",
		options: createTargetJSNoneOptions({
			
		})
	}
})
