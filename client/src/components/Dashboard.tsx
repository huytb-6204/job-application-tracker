import type { Application } from '../types'

interface DashboardProps {
  applications: Application[]
}

function Dashboard({applications}: DashboardProps) {
  const total = applications.length;

  const applied = applications.filter(app => app.status === 'APPLIED').length;
  const interviewing = applications.filter(app => app.status === 'INTERVIEWING').length;
  const offered = applications.filter(app => app.status === 'OFFERED').length;
  const rejected = applications.filter(app => app.status === 'REJECTED').length;

  return (
    <>
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm min-w-0 md:col-span-2 lg:col-span-4">
        <h2 className="text-lg font-semibold text-blue-900 truncate">Tổng quan</h2>
        <p className="text-sm text-blue-700 mt-1">
          Tổng số hồ sơ: <span className="text-2xl font-bold text-blue-900 ml-1">{total}</span>
        </p>
      </div>

      <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm min-w-0">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate">Đã ứng tuyển</h3>
        <p className="text-2xl font-bold text-gray-900 mt-2">{applied}</p>
      </div>

      <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm min-w-0">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate">Đang phỏng vấn</h3>
        <p className="text-2xl font-bold text-amber-600 mt-2">{interviewing}</p>
      </div>

      <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm min-w-0">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate">Đã nhận đề nghị</h3>
        <p className="text-2xl font-bold text-green-600 mt-2">{offered}</p>
      </div>

      <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm min-w-0">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate">Đã bị từ chối</h3>
        <p className="text-2xl font-bold text-red-600 mt-2">{rejected}</p>
      </div>
    </>
  );
}

export default Dashboard;
