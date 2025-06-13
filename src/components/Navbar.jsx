// === src/components/Navbar.jsx ===
export default function Navbar() {
  return (
    <header className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold tracking-wide">BetPesa</h1>
      <nav className="space-x-6 text-sm font-medium">
        <a href="/" className="hover:underline">Home</a>
        <a href="/login" className="hover:underline">Login</a>
      </nav>
    </header>
  );
}

// === src/components/Sidebar.jsx ===
export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-900 text-white p-6 hidden lg:block border-r border-blue-800">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul className="space-y-3 text-sm">
        <li className="hover:text-blue-300 cursor-pointer">Football</li>
        <li className="hover:text-blue-300 cursor-pointer">Basketball</li>
        <li className="hover:text-blue-300 cursor-pointer">Tennis</li>
        <li className="hover:text-blue-300 cursor-pointer">Live Betting</li>
      </ul>
    </aside>
  );
}