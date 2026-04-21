import * as React from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

const CardWrapper = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <Card
      {...props}
      className={cn(
        "border-0 shadow-lg to-white bg-white  dark:bg-background dark:bg-linear-to-br dark:from-black/50 dark:to-black",
        className,
      )}
    >
      {props.children}
    </Card>
  );
};

export default CardWrapper;
