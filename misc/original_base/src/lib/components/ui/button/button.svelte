<script lang="ts">
  import { Button as ButtonPrimitive } from "bits-ui";
  import { cn } from "$lib/utils";
  import { buttonVariants, type ButtonVariants } from "./variants";
  
  type $$Props = ButtonVariants & ButtonPrimitive.Props;
  
  let className: string | undefined = undefined;
  export { className as class };
  export let variant: $$Props["variant"] = "default";
  export let size: $$Props["size"] = "default";
  
  let buttonClass = buttonVariants({ variant, size, className });
</script>

<ButtonPrimitive.Root
  class={cn(buttonClass)}
  {...$$restProps}
>
  <slot />
</ButtonPrimitive.Root>