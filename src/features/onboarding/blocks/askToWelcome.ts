import { club_channel } from '../../../config'

const askToWelcomeBlocks = (id: string) => [
	{
		type: 'context',
		elements: [
			{
				type: 'mrkdwn',
				text: `Would you like me to give you a quick introduction in <#${club_channel}>?`,
			},
		],
	},
	{
		type: 'actions',
		elements: [
			{
				type: 'button',
				text: {
					type: 'plain_text',
					emoji: true,
					text: 'Yep!',
				},
				style: 'primary',
				value: id,
				action_id: 'welcome_hacker_public',
			},
			{
				type: 'button',
				text: {
					type: 'plain_text',
					emoji: true,
					text: 'No thanks.',
				},
				style: 'danger',
				value: id,
				action_id: 'no_welcome_hacker',
			},
		],
	},
]

export default askToWelcomeBlocks
