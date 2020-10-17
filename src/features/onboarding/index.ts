import { App } from '@slack/bolt'
import { sample, greetings } from '../../util/random/index'
import {
	blocksAndText,
	postEphemeralUserCurry,
	postMessageCurry,
	removeActionsFromMessage,
	sendSequentially,
} from '../../util/chat/index'
import startChannelDialogBlocks from './blocks/startChannelDialog'
import { club_channel } from '../../config'
import askToWelcomeBlocks from './blocks/askToWelcome'
import askHaveIntroducedBlocks from './blocks/askHaveIntroduced'
import { sleep } from '../../util/async/index'

const onboardingFeature = (app: App) => {
	app.command(
		!(process.env.NODE_ENV === 'production')
			? '/turner-sim-start'
			: '/turner-restart',
		async ({ ack, body }) => {
			await ack()

			const { user_id: userID } = body

			const imEphemeral = postEphemeralUserCurry(club_channel, userID)

			await imEphemeral(startChannelDialogBlocks(userID))
		}
	)

	app.event('member_joined_channel', async ({ event, body }) => {
		const { channel: channelID, user: userID } = event

		if (club_channel === channelID) {
			console.log(body)
			const imEphemeral = postEphemeralUserCurry(club_channel, userID)

			await imEphemeral(startChannelDialogBlocks(userID))
		}
	})

	app.action('onboard_hacker', async ({ ack, action, body }) => {
		await ack()

		console.log(body)

		const { value: userID } = action as any

		const im = postMessageCurry(userID)

		const introPieces: (string | [string, number])[] = [
			'????',
			':cake:',
			':parrot:?',
			':adorpheus:',
			':scrappy:',
			':canadaparrot:',
			':glitched:',
			'~*AHEM*~',
			'.',
			'.',
			'.',
			'.',
			[
				'Sorry, I was a bit off there. Let me load some sentience :eggthink:',
				2500,
			],
			['`sentience loaded.`', 2500],
			["I'm Duino!~ it's lovely to meet you :smile: !", 2000],
			`Like all of the other :sparkles: *amazing* :sparkles: bots here, I can do a lot of things (we'll get into my purpose a little bit later)! However, my favourite thing is saying hello to new people!\n\nWhy don't you introduce yourself in <#${club_channel}>? If you like, I can announce your arrival!`,
		]

		await sendSequentially(introPieces, im)

		await im(askToWelcomeBlocks(userID))
	})

	app.action('not_club_hacker', async ({ ack, action, body }) => {
		await ack()

		const imEphemeral = postEphemeralUserCurry(club_channel, body.user.id)

		imEphemeral(
			...blocksAndText(
				"That's alright! Since you're not a TFSS Hack Club member, I won't walk you through the onboarding flow—feel free to stay in this channel to chill, though!"
			)
		)
	})

	app.action('welcome_hacker_public', async ({ ack, action, body }) => {
		await ack()

		await removeActionsFromMessage(body)

		const { value: userID } = action as any

		const imChannel = postMessageCurry(club_channel)
		const imEphemeral = postEphemeralUserCurry(club_channel, userID)
		const im = postMessageCurry(userID)

		await imChannel(
			...blocksAndText(
				`${sample(
					greetings
				)} <#${club_channel}>! It appears that we have a new arrival—please put your hands together and welcome <@${userID}>!`
			)
		)

		await imEphemeral(
			...blocksAndText(
				"I've introduced you—feel free to say hi! I'll be waiting in DMs for you :)"
			)
		)

		await im(askHaveIntroducedBlocks(userID))
	})

	app.action('no_welcome_hacker', async ({ ack, action, body }) => {
		await ack()

		await removeActionsFromMessage(body)

		const { value: userID } = action as any
		const im = postMessageCurry(userID)

		await im(
			...blocksAndText(
				"That's alright! I'll wait here until you've introduced yourself :D"
			)
		)

		sleep(3000)
		await im(askHaveIntroducedBlocks(userID))
	})

	app.action(
		'continue_hacker_onboarding_after_introduction',
		async ({ ack, action, body }) => {
			await ack()

			const { value: userID } = action as any

			await removeActionsFromMessage(body)

			const im = postMessageCurry(userID)

			await sendSequentially(
				[
					'That was an awesome introduction! I guess I should introduce myself :sweat_smile:',
					"I'm Turner Fenton's personal club bot! I'll be handling everything from :flying_money_with_wings: funding and events to welcoming amazing new members like you :sparkling_heart: !",
					[
						'You can find my source over at <https://github.com/tfsshackclub/duino|our club Github :githubparrot:>!',
						2000,
					],
					[
						"Now, you're probably wondering what else I can do for you, and the answer is a LOT! You can interact with me through DMs, or restart this onboarding by using the `/turner-restart` slash command.",
						3000,
					],
					"DMing me `help` will give you a list of all the public commands (it's up to you to find the :ghost: secret ones); there are some fun puzzles for some commands. If you have any questions, you can always DM <@UHFEGV147> or <@UMW5W8DLZ>, your presidents for this year.",
					'Feel free to explore the *amazing* channels that my cousin Clippy introduced you to (Hack Club is so much more than just something at Turner!)',
					`That's about it for me for now—welcome to the 2020 TFSS Hack Club, <@${userID}>~! :ultrafastparrot: :hackclub: :rocket: :dizzy:`,
				],
				im
			)
		}
	)
}

export default onboardingFeature
