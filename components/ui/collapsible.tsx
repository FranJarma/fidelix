"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.CollapsibleContent
>) => (
  <CollapsiblePrimitive.CollapsibleContent
    className={cn(
      "overflow-hidden transition-[max-height] duration-300 ease-in-out data-[state=open]:max-h-[600px] data-[state=closed]:max-h-0",
      className,
    )}
    {...props}
  />
);

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
