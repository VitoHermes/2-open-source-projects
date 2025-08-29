export default function Footer() {
  return (
    <footer id="contact" className="border-t border-black/5 dark:border-white/10 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} Chris Davis. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="mailto:vito186cm@gmail.com" className="hover:underline">Email</a>
            <a href="https://www.linkedin.com/in/chrisdavis2025/" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
            <a href="https://github.com/vitoHermes/" target="_blank" rel="noreferrer" className="hover:underline">Github</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


