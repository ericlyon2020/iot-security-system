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