"use client";

import { cn } from "@/lib/utils";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>) => (
  <CollapsiblePrimitive.CollapsibleContent
    className={cn(
      "overflow-hidden transition-[max-height] duration-300 ease-in-out data-[state=closed]:max-h-0 data-[state=open]:max-h-[600px]",
      className,
    )}
    {...props}
  />
);

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
