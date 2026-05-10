const YEAR = new Date().getFullYear();

export default function ControlCenterFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="container-pro flex flex-col gap-2 py-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>Southern Cities Control Center</p>
        <p>© {YEAR} Southern Cities Enterprises</p>
      </div>
    </footer>
  );
}
