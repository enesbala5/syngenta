import { renderComponent, renderSnippet } from "$lib/components/ui/data-table/index.js";
import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import DataTableActions from './data-table-actions.svelte';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Startup = {
	id: string | null
	email_id: string | null
	ph_number: number | null,
	company_name: string | null,
	n_people: number | null,
	funding_team: string | null,
	founding_year: number | null,
	mission_statement: string | null,
	industry: string | null,
	investment_raised: number | null,
	accelerator_need: string | null,
	chat_history: string | null
};



export const columns: ColumnDef<Partial<Startup>>[] = [
	{
		accessorKey: "email_id",
		header: 'Email',
		cell: ({ row }) => 'test',
	},
	{
		accessorKey: "ph_number",
		header: 'Phone',
		cell: ({ row }) => 'test',
	},
	{
		accessorKey: "company_name",
		header: 'Company Name',
		cell: ({ row }) => 'test',
	},
	{
		accessorKey: "n_people",
		header: 'No. People',
		cell: ({ row }) => 'test',
	},
	{
		accessorKey: "funding_team",
		header: 'Founding Team',
		cell: ({ row }) => 'test',
	},
	{
		accessorKey: "founding_year",
		header: 'Founding Year',
		cell: ({ row }) => 'test',
	},
	{
		accessorKey: "mission_statement",
		header: 'Mission Statement',
		cell: ({ row }) => 'test',
	},
	{
		accessorKey: "industry",
		header: 'Industry',
		cell: ({ row }) => 'test',
	},
	{
		accessorKey: "investment_raised",
		header: 'Investment Raised',
		cell: ({ row }) => 'test',
	},
	{
		accessorKey: "accelerator_need",
		header: 'Accelerator Need',
		cell: ({ row }) => 'test',
	},
	// {
	// 	accessorKey: "chat_history",
	// 	header: 'Chat History',
	// 	cell: ({ row }) => 'test',
	// },
	// {
	// 	accessorKey: "amount",
	// 	header: () => {
	// 		const amountHeaderSnippet = createRawSnippet(() => ({
	// 			render: () => `<div class="text-right">Amount</div>`,
	// 		}));
	// 		return renderSnippet(amountHeaderSnippet, "");
	// 	},
	// 	cell: ({ row }) => {
	// 		const formatter = new Intl.NumberFormat("en-US", {
	// 			style: "currency",
	// 			currency: "USD",
	// 		});

	// 		const amountCellSnippet = createRawSnippet<[string]>((getAmount) => {
	// 			const amount = getAmount();
	// 			return {
	// 				render: () => `<div class="text-right font-medium">${amount}</div>`,
	// 			};
	// 		});

	// 		return renderSnippet(
	// 			amountCellSnippet,
	// 			formatter.format(parseFloat(row.getValue("amount")))
	// 		);
	// 	},

	// },
	// {
	// 	id: "actions",
	// 	cell: ({ row }) => {
	// 		// You can pass whatever you need from `row.original` to the component
	// 		return renderComponent(DataTableActions, { id: row?.original?.id ?? 'test' });
	// 	},
	// },

];