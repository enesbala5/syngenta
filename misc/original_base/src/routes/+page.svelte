<script lang="ts">
  import CoverLetterForm from "$lib/components/CoverLetterForm.svelte";
  import { fade } from "svelte/transition";
  
  export let data;
</script>

<div class="min-h-screen bg-background">
  <main class="container mx-auto py-12">
    <h1 class="text-4xl font-bold text-center mb-8">Cover Letter Generator</h1>
    <CoverLetterForm {data} />
  </main>
</div>