<script lang="ts">
	import { tick } from 'svelte';
	import * as Select from '$lib/components/ui/select';
	import { cn } from '$lib/utils.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { ArrowDownUpIcon, CheckIcon, PlusCircleIcon } from 'lucide-svelte';

	let className: string | undefined | null = undefined;
	export { className as class };

	const groups = [
		{
			label: 'Personal Account',
			teams: [
				{
					label: 'Alicia Koch',
					value: 'personal'
				}
			]
		},
		{
			label: 'Teams',
			teams: [
				{
					label: 'Acme Inc.',
					value: 'acme-inc'
				},
				{
					label: 'Monsters Inc.',
					value: 'monsters'
				}
			]
		}
	] as const;

	type Team = (typeof groups)[number]['teams'][number];

	let open = false;
	let showTeamDialog = false;

	let selectedTeam: Team = groups[0].teams[0];

	function closeAndRefocusTrigger(triggerId: string) {
		open = false;

		tick().then(() => document.getElementById(triggerId)?.focus());
	}
</script>

<Dialog.Root bind:open={showTeamDialog}>
	<Popover.Root bind:open>
		<Popover.Trigger>
			{#snippet child(props)}
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					aria-label="Select a team"
					class={cn('w-[200px] justify-between', className)}
					{...props}
				>
					<Avatar.Root class="mr-2 h-5 w-5">
						<Avatar.Image
							src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
							alt={selectedTeam.label}
							class="grayscale"
						/>
						<Avatar.Fallback>SC</Avatar.Fallback>
					</Avatar.Root>
					{selectedTeam.label}
					<ArrowDownUpIcon class="ml-auto h-4 w-4 shrink-0 opacity-50" />
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-[200px] p-0">
			<Command.Root>
				<Command.Input placeholder="Search team..." />
				<Command.List>
					<Command.Empty>No team found.</Command.Empty>
					{#each groups as group}
						<Command.Group heading={group.label}>
							{#each group.teams as team}
								<Command.Item
									onSelect={() => (selectedTeam = team)}
									value={team.label}
									class="text-sm"
								>
									<Avatar.Root class="mr-2 h-5 w-5">
										<Avatar.Image
											src={`https://avatar.vercel.sh/${team.value}.png`}
											alt={team.label}
											class="grayscale"
										/>
										<Avatar.Fallback>SC</Avatar.Fallback>
									</Avatar.Root>
									{team.label}
									<CheckIcon
										class={cn(
											'ml-auto h-4 w-4',
											selectedTeam.value !== team.value && 'text-transparent'
										)}
									/>
								</Command.Item>
							{/each}
						</Command.Group>
					{/each}
				</Command.List>
				<Command.Separator />
				<Command.List>
					<Command.Group>
						<Command.Item
							onSelect={() => {
								open = false;
								showTeamDialog = true;
							}}
						>
							<PlusCircleIcon class="mr-2 h-5 w-5" />
							Create Team
						</Command.Item>
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create team</Dialog.Title>
			<Dialog.Description>Add a new team to manage products and customers.</Dialog.Description>
		</Dialog.Header>
		<div>
			<div class="space-y-4 py-2 pb-4">
				<div class="space-y-2">
					<Label for="name">Team name</Label>
					<Input id="name" placeholder="Acme Inc." />
				</div>
				<div class="space-y-2">
					<Label for="plan">Subscription plan</Label>
					<Select.Root type="single" name="plan">
						<Select.Trigger>Select a plan</Select.Trigger>
						<Select.Content>
							<Select.Item value="free">
								<span class="font-medium">Free </span>-<span class="text-muted-foreground">
									Trial for two weeks
								</span>
							</Select.Item>
							<Select.Item value="pro">
								<span class="font-medium">Pro</span> -
								<span class="text-muted-foreground"> $9/month per user </span>
							</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
			</div>
		</div>
		<Dialog.Footer>
			<Button variant="outline" onclick={() => (showTeamDialog = false)}>Cancel</Button>
			<Button type="submit">Continue</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
