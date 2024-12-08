import { renderComponent, renderSnippet } from "$lib/components/ui/data-table/index.js";
import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import DataTableActions from './data-table-actions.svelte';
import DataTooltip from './data-tooltip.svelte';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Startup = {
	email_id: string,
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
		accessorKey: "company_name",
		header: 'Company Name',
		cell: ({ row }) => {
			return renderComponent(DataTooltip, { value: row?.original?.company_name });
		},

	},
	{
		accessorKey: "n_people",
		header: 'No. People',
		cell: ({ row }) => {
			const messagesAmountSnippet = createRawSnippet<[string]>((getItem) => {
				const messages = getItem();
				return {
					render: () => `<div class="code translate-y-0 w-full leading-none text-center">${messages}</div>`
				};
			});

			return renderSnippet(messagesAmountSnippet, row.getValue('n_people'));
		},
	},
	{
		accessorKey: "email_id",
		header: 'Email',
		// cell: ({ row }) => row.getValue('email_id'),
	},
	{
		accessorKey: "founding_year",
		header: 'Founding Year',
		cell: ({ row }) => {
			return renderComponent(DataTooltip, { value: row?.original?.founding_year });
		},
	},
	{
		accessorKey: "ph_number",
		header: 'Phone Number',
		cell: ({ row }) => {
			const emailSnippet = createRawSnippet<[string]>((getPhoneNumber) => {
				const email = getPhoneNumber();
				return {
					render: () => `<div class="lowercase">${email}</div>`
				};
			});

			return renderSnippet(emailSnippet, row.getValue('ph_number'));
		}
	},
	{
		accessorKey: "funding_team",
		header: 'Founding Team',
		cell: ({ row }) => {
			return renderComponent(DataTooltip, { value: row?.original?.funding_team });
		},

	},

	{
		accessorKey: "mission_statement",
		header: 'Mission Statement',
		cell: ({ row }) => {
			return renderComponent(DataTooltip, { value: row?.original?.mission_statement });
		},
	},
	{
		accessorKey: "industry",
		header: 'Industry',
		cell: ({ row }) => {
			return renderComponent(DataTooltip, { value: row?.original?.industry });
		},

	},
	{
		accessorKey: "investment_raised",
		header: 'Investment Raised',
		cell: ({ row }) => {
			return renderComponent(DataTooltip, { value: row?.original?.investment_raised });
		},
	},
	{
		accessorKey: "accelerator_need",
		header: 'Accelerator Need',
		cell: ({ row }) => {
			return renderComponent(DataTooltip, { value: row?.original?.accelerator_need });
		},

	},

	{
		id: "actions",
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(DataTableActions, { id: row?.original?.email_id, data: row?.original });
		},
	},

];