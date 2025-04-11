"use client";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const ButtonEditDischargePage = ({
  admission_id,
}: {
  admission_id: number;
}) => {
  const router = useRouter();
  return (
    <Button
      variant="soft"
      color="amber"
      className="print:!hidden"
      onClick={() => {
        router.push(`/dashboard/discharge/${admission_id}`);
      }}
    >
      Edit
    </Button>
  );
};

export default ButtonEditDischargePage;
