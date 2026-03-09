<script lang="ts">
	import { beansStore } from '$lib/beans.svelte';
	import { ui } from '$lib/uiState.svelte';
	import BeanItem from '$lib/components/BeanItem.svelte';
	import BoardView from '$lib/components/BoardView.svelte';
	import BeanPane from '$lib/components/BeanPane.svelte';
	import SplitPane from '$lib/components/SplitPane.svelte';
	import AgentChat from '$lib/components/AgentChat.svelte';

	const CENTRAL_SESSION_ID = '__central__';

	const topLevelBeans = $derived(beansStore.all.filter((b) => !b.parentId));

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && ui.currentBean && !ui.showForm) {
			ui.clearSelection();
		}
	}

	function handlePlanningClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			ui.clearSelection();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<SplitPane direction="horizontal" side="start" persistKey="chat-width" initialSize={420} collapsed={!ui.showPlanningChat}>
	{#snippet aside()}
		<div class="flex flex-col h-full bg-surface border-r border-border">
			<!-- Chat header -->
			<div class="flex items-center px-4 h-10 border-b border-border shrink-0">
				<span class="text-sm font-medium text-text">Agent</span>
				<div class="flex-1"></div>
				<button
					onclick={() => ui.togglePlanningChat()}
					class="w-6 h-6 flex items-center justify-center rounded text-text-muted hover:text-text hover:bg-surface-alt transition-colors cursor-pointer"
					title="Close chat"
				>
					&#x2715;
				</button>
			</div>
			<div class="flex-1 min-h-0">
				<AgentChat beanId={CENTRAL_SESSION_ID} />
			</div>
		</div>
	{/snippet}

	{#snippet children()}
		<SplitPane direction="horizontal" side="end" persistKey="detail-width" initialSize={480} collapsed={!ui.currentBean}>
			{#snippet children()}
				<div class="flex flex-col h-full">
					<!-- Toggle bar -->
					<div class="flex items-center px-4 h-10 border-b border-border bg-surface shrink-0">
						<button
							onclick={() => ui.togglePlanningChat()}
							class={[
								"mr-3 w-7 h-7 flex items-center justify-center rounded transition-colors cursor-pointer",
								ui.showPlanningChat
									? "bg-accent text-accent-text"
									: "bg-surface border border-border text-text-muted hover:bg-surface-alt"
							]}
							title={ui.showPlanningChat ? "Hide chat" : "Show chat"}
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
								<path fill-rule="evenodd" d="M10 3c-4.31 0-8 3.033-8 7 0 2.024.978 3.825 2.499 5.085a3.478 3.478 0 01-.522 1.756.75.75 0 00.584 1.143 5.976 5.976 0 003.936-1.108c.487.082.99.124 1.503.124 4.31 0 8-3.033 8-7s-3.69-7-8-7z" clip-rule="evenodd" />
							</svg>
						</button>

						<div class="flex">
							<button
								onclick={() => ui.setPlanningView('backlog')}
								class={[
									"px-3 py-1 text-sm font-medium rounded-l-md border transition-colors cursor-pointer",
									ui.planningView === "backlog"
										? "bg-accent text-accent-text border-accent"
										: "bg-surface border-border text-text-muted hover:bg-surface-alt"
								]}
							>
								Backlog
							</button>
							<button
								onclick={() => ui.setPlanningView('board')}
								class={[
									"px-3 py-1 text-sm font-medium rounded-r-md border border-l-0 transition-colors cursor-pointer",
									ui.planningView === "board"
										? "bg-accent text-accent-text border-accent"
										: "bg-surface border-border text-text-muted hover:bg-surface-alt"
								]}
							>
								Board
							</button>
						</div>
						<div class="flex-1"></div>
						<button
							class="px-3 py-1.5 text-sm font-medium bg-accent text-accent-text rounded-md hover:opacity-90 transition-opacity cursor-pointer"
							onclick={() => ui.openCreateForm()}
						>
							+ New Bean
						</button>
					</div>

					{#if ui.planningView === 'backlog'}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div class="flex-1 overflow-auto bg-surface" onclick={handlePlanningClick}>
							<div class="p-3 space-y-1" onclick={handlePlanningClick}>
								{#each topLevelBeans as bean (bean.id)}
									<BeanItem
										{bean}
										selectedId={ui.currentBean?.id}
										onSelect={(b) => ui.selectBean(b)}
									/>
								{:else}
									{#if !beansStore.loading}
										<p class="text-text-muted text-center py-8 text-sm">No beans yet</p>
									{/if}
								{/each}
							</div>
						</div>
					{:else}
						<div class="flex-1 min-h-0 bg-surface-alt">
							<BoardView
								onSelect={(b) => ui.selectBean(b)}
								selectedId={ui.currentBean?.id}
							/>
						</div>
					{/if}
				</div>
			{/snippet}

			{#snippet aside()}
				{#if ui.currentBean}
					<BeanPane
						bean={ui.currentBean}
						onSelect={(b) => ui.selectBean(b)}
						onEdit={(b) => ui.openEditForm(b)}
						onClose={() => ui.clearSelection()}
					/>
				{/if}
			{/snippet}
		</SplitPane>
	{/snippet}
</SplitPane>
