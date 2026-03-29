export default function VisitorWebsite() {
  return (
    <div className="p-6 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Table 1 */}
        <div className="border border-slate-700 rounded-xl overflow-hidden">
          {/* Title */}
          <div className="bg-white text-black flex justify-between items-center px-4 py-3">
            <h3 className="font-semibold">Most Visited Pages</h3>

            <select className="text-sm py-1">
              <option>Today</option>
              <option>Yesterday</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>

          {/* Table */}
          <table className="w-full text-left">
            <thead className="border-b border-slate-700 text-slate-400">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">URL</th>
                <th className="px-4 py-3 text-right">Views</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-slate-800 hover:bg-slate-800">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3 text-blue-400">Home Appliance</td>
                <td className="px-4 py-3 text-right">50</td>
              </tr>

              <tr className="border-b border-slate-800 hover:bg-slate-800">
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3 text-blue-400">Login</td>
                <td className="px-4 py-3 text-right">48</td>
              </tr>

              <tr className="border-b border-slate-800 hover:bg-slate-800">
                <td className="px-4 py-3">3</td>
                <td className="px-4 py-3 text-blue-400">Phone</td>
                <td className="px-4 py-3 text-right">46</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table 2 */}
        <div className="border border-slate-700 rounded-xl overflow-hidden">
          {/* Title */}
          <div className="bg-white text-black flex justify-between items-center px-4 py-3">
            <h3 className="font-semibold">Top Countries / City</h3>

            <select className="text-sm py-1">
              <option>Today</option>
              <option>Yesterday</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>

          {/* Table */}
          <table className="w-full text-left">
            <thead className="border-b border-slate-700 text-slate-400">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3 text-right">Visitors</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-slate-800 hover:bg-slate-800">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">USA</td>
                <td className="px-4 py-3 text-right">900</td>
              </tr>

              <tr className="border-b border-slate-800 hover:bg-slate-800">
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">UK</td>
                <td className="px-4 py-3 text-right">600</td>
              </tr>

              <tr className="border-b border-slate-800 hover:bg-slate-800">
                <td className="px-4 py-3">3</td>
                <td className="px-4 py-3">Germany</td>
                <td className="px-4 py-3 text-right">300</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
