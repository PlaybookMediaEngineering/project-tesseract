import { sourcesZod } from "@repo/shared-types";
import { z } from "zod";
import { ThreadTweetData } from "./queueConsumer/chunkers/chunkTweet";

export type Env = {
	VECTORIZE_INDEX: VectorizeIndex;
	AI: Ai;
	SECURITY_KEY: string;
	OPENAI_API_KEY: string;
	GOOGLE_AI_API_KEY: string;
	CF_KV_AUTH_TOKEN: string;
	KV_NAMESPACE_ID: string;
	CF_ACCOUNT_ID: string;
	DATABASE: D1Database;
	MY_QUEUE: Queue<TweetData[]>;
	KV: KVNamespace;
	EMBEDCHUNKS_QUEUE: Queue<JobData>;
	MYBROWSER: unknown;
	ANTHROPIC_API_KEY: string;
	THREAD_CF_AUTH: string;
	THREAD: { processTweets: () => Promise<Array<any>> };
	THREAD_CF_WORKER: string;
	NODE_ENV: string;
	MD_SEC_KEY: string;
	MEM0_API_KEY: string;
};

export interface JobData {
	content: string;
	space: Array<number>;
	user: string;
	type: string;
}

export interface TweetData {
	tweetText: string;
	postUrl: string;
	authorName: string;
	handle: string;
	time: string;
	saveToUser: string;
}

interface BaseChunks {
	type: "tweet" | "page" | "note" | "image";
}

export interface TweetChunks extends BaseChunks {
	type: "tweet";
	chunks: Array<ThreadTweetData>;
}

export interface PageOrNoteChunks extends BaseChunks {
	type: "page" | "note";
	chunks: string[];
}
export interface ImageChunks extends BaseChunks {
	type: "image";
	chunks: string[];
}

export type Chunks = TweetChunks | PageOrNoteChunks | ImageChunks;

export interface KVBulkItem {
	key: string;
	value: string;
	base64: boolean;
}

export const contentObj = z.object({
	role: z.string(),
	parts: z
		.array(
			z.object({
				text: z.string(),
			}),
		)
		.transform((val) => val.map((v) => v.text))
		.optional(),
	content: z.string().optional(),
});

export const chatObj = z.object({
	chatHistory: z.array(contentObj).optional(),
	sources: sourcesZod.optional(),
});

export const vectorObj = z.object({
	pageContent: z.string(),
	title: z.string().optional(),
	description: z.string().optional(),
	spaces: z.array(z.string()).optional(),
	url: z.string(),
	user: z.string(),
	type: z.string().optional().default("page"),
});
export const vectorBody = z.object({
	spaces: z.array(z.string()).optional(),
	url: z.string(),
	user: z.string(),
});
