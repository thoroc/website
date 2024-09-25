import "tailwindcss/tailwind.css";
import Head from "next/head";
import Image from "next/image";
import coverImg from "../public/img/background.png";
import { Menu } from "../src/components";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Russell-Roche</title>
      </Head>

      <main>
        <Menu />
        <div className="overflow-hidden">
          <Image
            src={coverImg}
            alt="Cover Image"
            className="object-cover"
            fill
          />
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
