import { club_channel } from '../../../config'

const startChannelDialogBlocks = (id: string) => [
	{
		type: 'section',
		text: {
			type: 'mrkdwn',
			text: `:partyparrot: :tada: :party_orpheus: :hackclub: Eyyy, welcome to <#${club_channel}>, <@${id}>!`,
		},
	},
	{
		type: 'context',
		elements: [
			{
				type: 'plain_text',
				text: 'Are you a member of TFSS Hack Club?',
				emoji: true,
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
				action_id: 'onboard_hacker',
			},
			{
				type: 'button',
				text: {
					type: 'plain_text',
					emoji: true,
					text: 'Nope',
				},
				style: 'danger',
				value: id,
				action_id: 'not_club_hacker',
			},
		],
	},
]

export default startChannelDialogBlocks
