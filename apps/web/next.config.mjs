import MillionLint from "@million/lint";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

/** @type {import('next').NextConfig} */
const baseNextConfig = {
	transpilePackages: ["@repo/ui"],
	reactStrictMode: false,
	env: {
		TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
	},
	eslint: {
		disableDuringBuilds: true,
	},
};

let selectedCofig = baseNextConfig;

if (process.env.NODE_ENV === "development") {
	selectedCofig = MillionLint.next({
		rsc: true,
	})(baseNextConfig);
}

export default selectedCofig;

// we only need to use the utility during development so we can check NODE_ENV
// (note: this check is recommended but completely optional)
if (process.env.NODE_ENV === "development") {
	// `await`ing the call is not necessary but it helps making sure that the setup has succeeded.
	//  If you cannot use top level awaits you could use the following to avoid an unhandled rejection:
	//  `setupDevPlatform().catch(e => console.error(e));`
	await setupDevPlatform();
}
