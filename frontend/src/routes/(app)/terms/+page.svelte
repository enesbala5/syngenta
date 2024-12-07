<script lang="ts">
	import ArrowButtonSuffix from '$lib/components/custom/general/Buttons/elements/ArrowButtonSuffix/ArrowButtonSuffix.svelte';
	import ContactList from '$lib/components/custom/general/Contact/ContactList/ContactList.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { company } from '$lib/data/generic';
	import { route } from '$lib/services/routeHandler';
</script>

<div class="min-h-screen">
	<main class="container-width-sm py-12">
		<section class="mx-auto mb-8 flex max-w-3xl flex-col gap-3 lg:mb-16 lg:gap-4">
			<h1 class="h2 text-center">Terms of Use</h1>
			<div class="relative">
				<p class="text-center text-lg">
					Understand the rules and guidelines for using our platform.
				</p>
				<div class="mx-auto mt-6 flex w-fit flex-wrap items-center gap-2">
					<!-- NAVIGATE TO TERMS CONTENT -->
					<Button href={route('/(app)/(homepage)')} size="lg">Return Home</Button>
					<Button size="lg" variant="outline" href={route('/(app)/contact')}> Contact Us</Button>
				</div>
			</div>
		</section>
		<!-- CONTENT HERE -->
		<div
			id="termsSection"
			class="container-width-sm rounded-lg border border-opacity-50 bg-card/50 !px-6 pb-6 pt-3 dark:bg-card/5"
		>
			<h2 class="mb-4 text-xl font-semibold">Terms of Use</h2>
			<p><strong>Effective Date:</strong> 11.22.2024</p>
			<p><strong>Last Updated:</strong> 11.22.2024</p>

			<h3 class="mt-4 font-semibold">1. Acceptance of Terms</h3>
			<p>
				By accessing or using the Cover Letter Creator SaaS platform, you agree to comply with these
				Terms of Use. If you do not agree, please discontinue use of our services.
			</p>

			<h3 class="mt-4 font-semibold">2. Description of Services</h3>
			<p>
				Cover Letter Creator provides tools for generating personalized cover letters, previewing
				templates, and analyzing uploaded resumes. The platform is designed for personal use only
				and may not be used for commercial purposes without express permission.
			</p>

			<h3 class="mt-4 font-semibold">3. User Responsibilities</h3>
			<ul class="ml-6 list-disc">
				<li>You must provide accurate and truthful information when using the platform.</li>
				<li>
					You are responsible for maintaining the confidentiality of your account credentials.
				</li>
				<li>You agree not to misuse the platform by uploading harmful or illegal content.</li>
			</ul>

			<h3 class="mt-4 font-semibold">4. Prohibited Activities</h3>
			<p>Users may not engage in the following activities:</p>
			<ul class="ml-6 list-disc">
				<li>Copying or distributing platform materials without authorization.</li>
				<li>Using the platform for fraudulent or malicious purposes.</li>
				<li>Attempting to interfere with platform security or functionality.</li>
			</ul>

			<h3 class="mt-4 font-semibold">5. Intellectual Property</h3>
			<p>
				All content, templates, and software on the platform are owned by [Company Name] or licensed
				for use. Users may not copy, modify, or distribute these materials without permission.
			</p>

			<h3 class="mt-4 font-semibold">6. Limitation of Liability</h3>
			<p>
				We are not responsible for any damages arising from the use or inability to use the
				platform. This includes, but is not limited to, lost opportunities, data loss, or
				unauthorized access to your account.
			</p>

			<h3 class="mt-4 font-semibold">7. Termination of Service</h3>
			<p>
				We reserve the right to terminate or suspend your account at any time for violations of
				these Terms of Use or other improper conduct.
			</p>

			<h3 class="mt-4 font-semibold">8. Changes to Terms</h3>
			<p>
				We may update these Terms of Use from time to time. Continued use of the platform after
				changes are made constitutes acceptance of the revised terms.
			</p>

			<h3 class="mt-4 font-semibold">9. Contact Us</h3>
			<p>If you have any questions about these Terms of Use, please contact us:</p>

			<ContactList />

			<p class="mt-4">
				By using our platform, you agree to these Terms of Use. If you do not agree, please
				discontinue use immediately.
			</p>
		</div>
	</main>
</div>
