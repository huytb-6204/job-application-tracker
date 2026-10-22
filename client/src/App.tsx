import "./App.css";
import { useState, useEffect } from "react";
import ApplicationList from "./components/ApplicationList";
import { getApplications } from "./services/applicationApi";
import ApplicationForm from "./components/ApplicationForm";
import Dashboard from "./components/Dashboard";
import ApplicationTimeline from "./components/ApplicationTimeline";
import {
  APPLICATION_STATUS_LABELS,
  type Application,
  type ApplicationStatusFilter,
} from "./types";

function App() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<ApplicationStatusFilter>("ALL");
  const [searchValue, setSearchValue] = useState("");

  // Xử lý khi một hồ sơ ứng tuyển mới được tạo
  const handleApplicationCreated = (newApplication: Application) => {
    setApplications((prevApplications) => [
      ...prevApplications,
      newApplication,
    ]);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch {
        setError("Không thể tải danh sách hồ sơ ứng tuyển");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Lọc hồ sơ theo trạng thái và nội dung tìm kiếm
  const filteredData = applications.filter((application) => {
    const matchesStatus =
      selectedStatus === "ALL" || application.status === selectedStatus;
    const normallizedSearchValue = searchValue.toLowerCase().trim();
    const matchesSearch =
      application.company.toLowerCase().includes(normallizedSearchValue) ||
      application.position.toLowerCase().includes(normallizedSearchValue);

    return matchesStatus && matchesSearch;
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
        Theo dõi hồ sơ ứng tuyển
      </h1>

      {/* Mục tiêu: Dashboard dùng 1 cột trên mobile, 2 cột trên tablet (md), 4 cột trên desktop (lg) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Dashboard applications={applications} />
      </div>

      {/* Mục tiêu: Khu vực chính dùng 1 cột trên mobile, trên desktop (lg) List chiếm 2/3 và Detail chiếm 1/3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <ApplicationList
            applications={filteredData}
            searchValue={searchValue}
            selectedStatus={selectedStatus}
            loading={loading}
            error={error}
            setApplications={setApplications}
            setSelectedApplication={setSelectedApplication}
            setSelectedStatus={setSelectedStatus}
            setSearchValue={setSearchValue}
            setError={setError}
          />
        </div>

        {selectedApplication && (
          <aside className="grid w-full min-w-0 grid-cols-1 gap-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <section className="min-w-0 space-y-4">
              <h2 className="border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800">
                Hồ sơ đang chọn
              </h2>
              <div className="min-w-0 space-y-2 text-sm text-gray-600">
                <p className="break-words">
                  <span className="font-medium text-gray-900">Công ty:</span>{' '}
                  {selectedApplication.company}
                </p>
                <p className="break-words">
                  <span className="font-medium text-gray-900">Vị trí:</span>{' '}
                  {selectedApplication.position}
                </p>
                <p className="break-words">
                  <span className="font-medium text-gray-900">Trạng thái:</span>{' '}
                  {APPLICATION_STATUS_LABELS[selectedApplication.status]}
                </p>
              </div>
            </section>

            <section className="min-w-0 border-t border-gray-100 pt-6">
              <h3 className="hidden border-b border-gray-200 pb-2 mb-4 text-base font-semibold text-gray-800 md:block">
                Tiến trình ứng tuyển
              </h3>
              <ApplicationTimeline application={selectedApplication} />
            </section>
          </aside>
        )}


      </div>

      <hr className="border-gray-200" />

      {/* Mục tiêu: ApplicationForm nằm thành một section riêng bên dưới */}
      <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Thêm hồ sơ ứng tuyển mới
        </h2>
        <ApplicationForm onApplicationCreated={handleApplicationCreated} />
      </section>
    </main>
  );
}

export default App;
