import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-card text-card-foreground border-t-2 border-black dark:border-white flex justify-between items-center p-6">
      <p className="text-lg font-mono font-semibold">&copy; ALTNEWZ | 2026</p>
      <p className="text-muted-foreground">
        Developed By:{" "}
        <Link
          href="https://suyogpoudel.com.np"
          className="text-primary hover:underline underline-offset-4"
          target="_blank"
        >
          Suyog Poudel
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
