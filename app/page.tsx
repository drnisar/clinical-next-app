import { Button } from "@radix-ui/themes";
import ToastMessage from "./dashboard/_components/ToastMessage";

export default function Home() {
  return (
    <div>
      <Button>Click Me</Button>
      <ToastMessage title="Hello" description="This is a toast message" />
    </div>
  );
}
