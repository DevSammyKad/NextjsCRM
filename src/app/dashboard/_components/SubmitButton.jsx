"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SubmitButton = ({ text, variant }) => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled={pending}>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
          {` ${text} Creating`}
        </Button>
      ) : (
        <Button variant={variant} size="lg" type="submit" className="my-5">
          {`  Create ${text} `}
        </Button>
      )}
    </>
  );
};
export default SubmitButton;
