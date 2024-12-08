<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import * as Dialog from '$lib/components/ui/dialog';

	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { CopyIcon, EyeIcon, UserIcon } from 'lucide-svelte';
	import { copyText } from 'svelte-copy';
	import { toast } from 'svelte-sonner';
	import Spinner from '$lib/components/custom/general/Spinner/Spinner.svelte';
	import client from '$lib/services/api';
	import type { Startup } from './columns';

	let { id, data }: { id?: string; data: Partial<Startup> } = $props();
</script>

{#if id}
	<div class="flex w-full items-center justify-end gap-2">
		<Button
			onclick={() => {
				copyText(id).then(() => {
					toast.success(`Copied Conversation ID successfully!`);
				});
			}}
			variant="outline"
		>
			<CopyIcon />
			Copy ID
		</Button>

		<Dialog.Root>
			<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
				<EyeIcon />
				View Startup Details
			</Dialog.Trigger>
			<Dialog.Content class="flex w-full flex-col  sm:max-w-[900px]">
				{#await new Promise((resolve) => setTimeout(resolve, 150))}
					<div
						class="flex flex-col items-center justify-center gap-1.5 py-4 text-xs text-muted-foreground"
					>
						<Spinner class="size-6" />
						<p>Loading Startup Data</p>
					</div>
				{:then res}
					<Dialog.Header>
						<Dialog.Title>{data?.company_name || 'Unknown Company'}</Dialog.Title>
						<Dialog.Description>
							Make changes to your profile here. Click save when you're done.
						</Dialog.Description>
					</Dialog.Header>
					<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
					<Card.Root class="w-full">
						<Card.Content class="grid w-full grow grid-cols-1 gap-6">
							<div class="grid items-start gap-2 text-left text-sm sm:grid-cols-2">
								<p><strong>Email:</strong> {data?.email_id}</p>
								<p><strong>Phone:</strong> {data?.ph_number || 'N/A'}</p>
								<p>
									<strong>Founding Year:</strong>
									{data?.founding_year || 'N/A'}
								</p>
								<p>
									<strong>Number of People:</strong>
									{data?.n_people || 'N/A'}
								</p>
								<p>
									<strong>Founding Team:</strong>
									{data?.funding_team || 'N/A'}
								</p>
								<p>
									<strong>Mission Statement:</strong>
									{data?.mission_statement || 'N/A'}
								</p>
								<p><strong>Industry:</strong> {data?.industry || 'N/A'}</p>
								<p>
									<strong>Investment Raised:</strong>
									${data?.investment_raised?.toLocaleString() || 'N/A'}
								</p>
								<p><strong>Accelerator Need:</strong> {data?.accelerator_need || 'N/A'}</p>
							</div>
						</Card.Content>
					</Card.Root>
				{/await}
			</Dialog.Content>
		</Dialog.Root>
	</div>
{:else}
	<p class=" text-sm text-muted-foreground">Missing Item ID</p>
{/if}
