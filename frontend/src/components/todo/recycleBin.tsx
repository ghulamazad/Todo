import Link from "next/link";
import { Button } from "../ui/button";

export function RecycleBin({ title, count }: { title: string; count: number }) {
  return (
    <>
      <Link href="recyclebin" className="relative">
        <Button variant={"ghost"}>
          {title}
          <span className="absolute top-0 right-0">{count}</span>
        </Button>
      </Link>
    </>
  );
}
