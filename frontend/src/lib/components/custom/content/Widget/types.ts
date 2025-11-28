import type { Snippet } from 'svelte'

export type BaseWidgetComponentProps = {
	prefix?: Snippet<any>;
	suffix?: Snippet<any>;
}