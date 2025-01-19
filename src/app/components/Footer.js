import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-amber-800 text-amber-100">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold">PeanutPerfection</Link>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-amber-300 transition-colors duration-300">About</Link>
            <Link href="#" className="hover:text-amber-300 transition-colors duration-300">Contact</Link>
            <Link href="#" className="hover:text-amber-300 transition-colors duration-300">Privacy Policy</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} PeanutPerfection. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

