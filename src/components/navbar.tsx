import Link from "next/link";
import ThemeToggle from "./theme-toggle";

const Navbar = () => {
  return (
    <nav className="w-full bg-card text-card-foreground border-b-2 border-black dark:border-white flex justify-between items-center p-6">
      <Link
        href="/"
        className="text-xl font-mono font-semibold hover:text-primary transition-colors tracking-wider"
      >
        ALTNEWZ
      </Link>

      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
