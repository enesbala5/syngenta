<script lang="ts" generics="TData, TValue">
	import {
		type ColumnDef,
		type PaginationState,
		getCoreRowModel,
		getPaginationRowModel
	} from '@tanstack/table-core';
	import * as Table from '$lib/components/ui/table';
	import * as Pagination from '$lib/components/ui/pagination';
	import { Button } from './button';
	import type { TableResponse } from './types';
	import { FlexRender, createSvelteTable } from '$lib/components/ui/data-table/index.js';

	type DataTableProps<TData, TValue> = {
		data: TData[];
		columns: ColumnDef<TData, TValue>[];
	} & Pick<TableResponse, 'pageNumber' | 'totalItems' | 'filters'>;

	let { data, columns, filters, pageNumber, totalItems }: DataTableProps<TData, TValue> = $props();

	let pagination = $state<PaginationState>({ pageIndex: pageNumber, pageSize: 15 });

	const table = createSvelteTable({
		get data() {
			return data;
		},
		columns,
		state: {
			get pagination() {
				return pagination;
			}
		},
		onPaginationChange: (updater) => {
			if (typeof updater === 'function') {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	});
</script>

<div class="rounded-md border">
	<Table.Root>
		<Table.Header>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<Table.Row>
					{#each headerGroup.headers as header (header.id)}
						<Table.Head>
							{#if !header.isPlaceholder}
								<FlexRender
									content={header.column.columnDef.header}
									context={header.getContext()}
								/>
							{/if}
						</Table.Head>
					{/each}
				</Table.Row>
			{/each}
		</Table.Header>
		<Table.Body>
			{#each table.getRowModel().rows as row (row.id)}
				<Table.Row data-state={row.getIsSelected() && 'selected'}>
					<!-- {#each row.getVisibleCells() as cell (cell.id)}
						<p>{cell}</p>
						<Table.Cell>
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</Table.Cell>
					{/each} -->
				</Table.Row>
			{:else}
				<Table.Row>
					<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
	<div class="flex items-center justify-end space-x-2 py-4">
		<Pagination.Root count={totalItems} perPage={pagination.pageSize} page={pagination.pageIndex}>
			{#snippet children({ pages, currentPage })}
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton />
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item hidden={currentPage !== page.value}>
								<Pagination.Link {page} isActive={currentPage === page.value}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton />
					</Pagination.Item>
				</Pagination.Content>
			{/snippet}
		</Pagination.Root>
		<Button
			variant="outline"
			size="sm"
			onclick={() => table.previousPage()}
			disabled={!table.getCanPreviousPage()}
		>
			Previous
		</Button>
		<Button
			variant="outline"
			size="sm"
			onclick={() => table.nextPage()}
			disabled={!table.getCanNextPage()}
		>
			Next
		</Button>
	</div>
</div>
