export default function AppFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border-subtle px-4 py-3 sm:px-6 md:px-8">
      <div className="flex flex-col items-center gap-1 sm:flex-row sm:justify-between sm:gap-0 text-xs text-text-muted">
        <span>© {year} OverKill Hill P³™. All rights reserved.</span>
        <span>
          Built with{' '}
          <a
            href="https://replit.com/refer/overkillhillp3/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline transition-colors"
            style={{ color: '#F5620F' }}
          >
            Replit
          </a>
        </span>
      </div>
    </footer>
  )
}
