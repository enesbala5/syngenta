import { renderComponent, renderSnippet } from "$lib/components/ui/data-table/index.js";
import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import DataTableActions from './data-table-actions.svelte';
import StarRating from './star-rating.svelte';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Conversation = {
	chat_id: string,
	n_messages: number,
	start_epoch: number,
	end_epoch: number
	rating?: number
};

export const columns: ColumnDef<Partial<Conversation>>[] = [
	{
		accessorKey: "chat_id",
		header: 'Chat ID',
		cell: ({ row }) => {
			const item = createRawSnippet<[string]>((getItem) => {
				const value = getItem();
				return {
					render: () => `<div class="text-muted-foreground leading-none max-w-36 w-full overflow-hidden text-ellipsis whitespace-nowrap text-left">${value}</div>`
				};
			});

			return renderSnippet(item, row.getValue('chat_id'));
		}
	},
	{
		accessorKey: "n_messages",
		header: 'No. Messages',
		cell: ({ row }) => {
			const messagesAmountSnippet = createRawSnippet<[string]>((getItem) => {
				const messages = getItem();
				return {
					render: () => `<div class="code translate-y-0 w-full leading-none text-center">${messages ?? '-'}</div>`
				};
			});

			return renderSnippet(messagesAmountSnippet, row.getValue('n_messages'));
		}
	},
	{
		accessorKey: "rating",
		header: 'Star Rating',
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(StarRating, { value: row?.original?.rating });
		},
	},
	{
		accessorKey: "start_epoch",
		header: 'Conversation Start',
		cell: ({ row, getValue }) => {
			const value = getValue();
			const date = new Date(0)
			if (!value) return '-'
			date.setUTCSeconds(Number(value));
			return date.toLocaleDateString();
		},
	},
	{
		accessorKey: "end_epoch",
		header: 'Last Message At',
		cell: ({ row, getValue }) => {
			const value = getValue();
			const date = new Date(0)
			if (!value) return '-'
			date.setUTCSeconds(Number(value));
			return date.toLocaleDateString();
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(DataTableActions, { id: row?.original?.chat_id });
		},
	},

];