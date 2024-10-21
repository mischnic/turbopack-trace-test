import path from "path";
import fs from "fs";

import * as Keyv from "keyv";
import Image from "next/image";
import { Suspense } from "react";
import { hashSync } from "@node-rs/bcrypt";
import { Client } from "./client";

export const dynamic = "force-dynamic";

export async function GetVisitorCount() {
  const keyv = new Keyv.default(process.env.KV_URL);
  const visits = await keyv.get("visits");

  if (visits) {
    await keyv.set("visits", visits + 1);
  } else {
    await keyv.set("visits", 1);
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  return <span>{visits}</span>;
}

export default async function Home() {
  const data = (
    await fs.promises.readFile(path.join(process.cwd(), "data.txt"), "utf8")
  ).trim();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="font-bold tracking-widest text-blue-500 mt-1">
            TURBOPACK-TRACE
          </h1>
        </div>
        <div className="font-mono text-center w-full text-sm flex items-center">
          <span>You are visitor #</span>
          <Suspense fallback={<span className="blur-sm">12</span>}>
            <GetVisitorCount />
          </Suspense>
        </div>
        <div className="font-mono text-center w-full text-sm flex items-center">
          Hash of "abc": {hashSync("abc")}
        </div>
        <div className="font-mono text-center w-full text-sm flex items-center">
          Reading the file `path.join(process.cwd(),"data.txt")`: {data}
        </div>
        <Client />
      </main>
    </div>
  );
}
