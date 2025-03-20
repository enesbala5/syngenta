<script lang="ts">
	import ContactList from '$lib/components/custom/general/Contact/ContactList/ContactList.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { company } from '$lib/data/generic';
	import { route } from '$lib/services/routeHandler';
</script>

<div class="min-h-screen">
	<main class="container-width-sm py-12">
		<section class="mx-auto mb-8 flex max-w-3xl flex-col gap-3 lg:mb-16 lg:gap-4">
			<h1 class="h2 text-center">Privacy Notice</h1>
			<div class="relative">
				<p class="text-center text-lg">Find the answers to your questions here.</p>
				<div class="mx-auto mt-6 flex w-fit flex-wrap items-center gap-2">
					<!-- EXPLORE QUESTIONS SHOULD SCROLL DOWN TO THE CONTAINER BELOW (VIEW TODO) -->
					<Button href={route('/(app)/(homepage)')} size="lg">Return Home</Button>
					<Button size="lg" variant="outline">Contact Us</Button>
				</div>
			</div>
		</section>
		<!-- CONTENT HERE -->
		<div
			id="privacySection"
			class="container-width-sm rounded-lg border border-opacity-50 bg-card/50 !px-6 pb-6 pt-3 dark:bg-card/5"
		>
			<h2 class="mb-4 text-xl font-semibold">Privacy Notice</h2>
			<p><strong>Effective Date:</strong> 11.22.2024</p>
			<p><strong>Last Updated:</strong> 11.22.2024</p>

			<h3 class="mt-4 font-semibold">1. Introduction</h3>
			<p>
				Welcome to Cover Letter Creator SaaS! We value your privacy and are committed to protecting
				your personal information. This Privacy Notice explains how we collect, use, and share your
				data when you use our platform to generate personalized cover letters and manage your job
				application materials.
			</p>

			<h3 class="mt-4 font-semibold">2. Information We Collect</h3>
			<p>When you use our service, we may collect the following types of data:</p>
			<ul class="ml-6 list-disc">
				<li>
					<strong>Bullet Points for Cover Letters:</strong> Data you enter about your skills, experience,
					and achievements.
				</li>
				<li>
					<strong>Tone Preferences:</strong> Your specifications for the tone and style of the cover
					letter.
				</li>
				<li><strong>Length Requirements:</strong> Your chosen word or character count.</li>
				<li>
					<strong>Uploaded Documents:</strong> Files you upload (PDF or Word format) for analysis and
					context extraction.
				</li>
				<li>
					<strong>Technical Data:</strong> IP address, browser type, device details, and usage statistics
					to improve platform performance and user experience.
				</li>
			</ul>

			<h3 class="mt-4 font-semibold">3. How We Use Your Information</h3>
			<p>We use your information for the following purposes:</p>
			<ul class="ml-6 list-disc">
				<li>
					<strong>Generating Cover Letters:</strong> Tailoring cover letters based on the provided bullet
					points, tone, and length preferences.
				</li>
				<li>
					<strong>Template Previews:</strong> Displaying personalized previews of four Latex templates
					based on user data.
				</li>
				<li>
					<strong>Resume Analysis:</strong> Extracting key details from uploaded CVs to generate contextually
					accurate cover letters.
				</li>
				<li>
					<strong>Improving Services:</strong> Monitoring usage to refine template designs, tone adjustments,
					and contextual accuracy.
				</li>
				<li>
					<strong>Customer Support:</strong> Addressing user queries and troubleshooting issues.
				</li>
			</ul>

			<h3 class="mt-4 font-semibold">4. Sharing and Disclosure</h3>
			<p>Your data will not be sold or shared with third parties, except in the following cases:</p>
			<ul class="ml-6 list-disc">
				<li>To comply with legal obligations.</li>
				<li>
					With trusted service providers that assist in hosting or processing data under strict
					confidentiality.
				</li>
			</ul>

			<h3 class="mt-4 font-semibold">5. Data Security</h3>
			<p>
				We implement robust security measures to safeguard your data. Uploaded files are encrypted
				during transit and storage. All data is deleted from our servers after 30 days unless you
				choose to save it for future use.
			</p>

			<h3 class="mt-4 font-semibold">6. User Rights</h3>
			<p>You have the following rights:</p>
			<ul class="ml-6 list-disc">
				<li>
					<strong>Access and Rectification:</strong> Request a copy or correction of your personal data.
				</li>
				<li>
					<strong>Data Deletion:</strong> Delete your account and associated data at any time.
				</li>
				<li><strong>Opt-Out:</strong> Stop using the service to prevent data collection.</li>
			</ul>

			<h3 class="mt-4 font-semibold">7. Retention Policy</h3>
			<p>
				We retain data only for as long as necessary to provide the service or as required by law.
			</p>

			<h3 class="mt-4 font-semibold">8. Contact Us</h3>
			<p>If you have questions or concerns about this Privacy Notice, please contact us at:</p>

			<ContactList />

			<p class="mt-4">
				By using our platform, you agree to this Privacy Notice. If you do not agree, please
				discontinue use of the service.
			</p>
		</div>
	</main>
</div>
