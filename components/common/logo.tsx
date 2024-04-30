import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="logo"
        width="0"
        height="0"
        sizes="100vw"
        priority
        className="w-20 md:w-24 lg:w-32 h-auto"
      />
    </Link>
  );
}
