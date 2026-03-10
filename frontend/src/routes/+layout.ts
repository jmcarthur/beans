import { browser } from '$app/environment';

export const prerender = true;
export const ssr = false;

export function load() {
	let planningView: 'backlog' | 'board' = 'backlog';
	let selectedBeanId: string | null = null;
	let showPlanningChat = false;
	let filterText = '';

	if (browser) {
		const saved = localStorage.getItem('beans-planning-view');
		if (saved === 'backlog' || saved === 'board') {
			planningView = saved;
		}

		const params = new URLSearchParams(window.location.search);
		selectedBeanId = params.get('bean');

		showPlanningChat = localStorage.getItem('beans-planning-chat') === 'true';

		filterText = localStorage.getItem('beans-filter-text') ?? '';
	}

	return { planningView, selectedBeanId, showPlanningChat, filterText };
}
