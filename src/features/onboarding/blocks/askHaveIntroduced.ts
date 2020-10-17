import { club_channel } from '../../../config'

const askHaveIntroducedBlocks = (id: string) => [
	{
		type: 'context',
		elements: [
			{
				type: 'mrkdwn',
				text: `Have you introduced yourself to <#${club_channel}>?`,
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
				action_id: 'continue_hacker_onboarding_after_introduction',
			},
		],
	},
]

export default askHaveIntroducedBlocks
