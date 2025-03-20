<script lang="ts">
  import type { WidgetContent, WidgetInterface } from '../data';
  
  interface Props {
    content: WidgetContent
    colorTheme: string
    icon: string
  }

  const { content, colorTheme, icon } = $props<Props>();

  // Define styles internally
  const styles = {
    container: `border-${colorTheme}-600/80 dark:border-${colorTheme}-400/40 bg-${colorTheme}-100/50 dark:bg-${colorTheme}-900/30`,
    title: `text-${colorTheme}-800 dark:text-${colorTheme}-300`,
    badge: `bg-${colorTheme}-600 dark:bg-${colorTheme}-500 text-white`
  };
</script>

<div class={styles.container}>
  <h2 class={styles.title}>
    <div class={styles.badge}>
      <!-- Icon and content -->
    </div>
  </h2>
</div> 