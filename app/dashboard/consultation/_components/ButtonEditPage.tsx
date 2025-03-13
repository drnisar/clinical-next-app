"use client";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const ButtonEditPage = ({ params }: { params: string }) => {
  const router = useRouter();
  return (
    <Button
      variant="soft"
      color="amber"
      className="print:!hidden"
      onClick={() => {
        router.push(`/dashboard/consultation/edit/${params}`);
      }}
    >
      Edit
    </Button>
  );
};

export default ButtonEditPage;
