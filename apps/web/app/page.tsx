import { Button } from "@madrasah/ui";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold underline">
        Hello, Next.js!
        <Button className="mt-4" variant="destructive">Click Me</Button>
      </h1>
    </main>
  );
}
