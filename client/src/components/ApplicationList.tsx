import { updateApplicationStatus, deleteApplication } from '../services/applicationApi';
import type { Dispatch, SetStateAction } from 'react';
import {
  APPLICATION_STATUS_LABELS,
  type Application,
  type ApplicationStatus,
  type ApplicationStatusFilter,
} from '../types';
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

interface ApplicationListProps {
  applications: Application[];
  searchValue: string;
  selectedStatus: ApplicationStatusFilter;
  loading: boolean;
  error: string;
  setApplications: Dispatch<SetStateAction<Application[]>>;
  setSelectedApplication: Dispatch<SetStateAction<Application | null>>;
  setSelectedStatus: Dispatch<SetStateAction<ApplicationStatusFilter>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
}

const statusOptions: { value: ApplicationStatus; label: string }[] = [
  { value: 'APPLIED', label: APPLICATION_STATUS_LABELS.APPLIED },
  { value: 'INTERVIEWING', label: APPLICATION_STATUS_LABELS.INTERVIEWING },
  { value: 'OFFERED', label: APPLICATION_STATUS_LABELS.OFFERED },
  { value: 'REJECTED', label: APPLICATION_STATUS_LABELS.REJECTED },
];

const statusFilterOptions: { value: ApplicationStatusFilter; label: string }[] = [
  { value: 'ALL', label: 'Tất cả' },
  ...statusOptions,
];

const ApplicationList = ({ applications, searchValue, selectedStatus, loading, error, setApplications, setSelectedApplication, setSelectedStatus, setSearchValue, setError }: ApplicationListProps) => {

  const handleStatusChange = async (id: number, status: ApplicationStatus) => {
    try {
      const updatedApplication = await updateApplicationStatus(id, status);

      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application.id === id ? updatedApplication : application
        )
      );
      setSelectedApplication((selectedApplication) =>
        selectedApplication?.id === id ? updatedApplication : selectedApplication
      );
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái hồ sơ:', error);
      setError('Không thể cập nhật trạng thái hồ sơ');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteApplication(id);
      setApplications((prevApplications) => prevApplications.filter((application) => application.id !== id));
      setSelectedApplication((selectedApplication) =>
        selectedApplication?.id === id ? null : selectedApplication
      );
    } catch (error) {
      console.error('Lỗi khi xóa hồ sơ ứng tuyển:', error);
      setError('Không thể xóa hồ sơ ứng tuyển');
    }
  };
  return (
    <div className="space-y-6">
      
      {/* Thanh bộ lọc và tìm kiếm: 1 cột trên mobile, 2 cột trên tablet/desktop */}
      <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field orientation="horizontal">
          <FieldLabel htmlFor="search-bar" className="sr-only">
            Tìm kiếm hồ sơ ứng tuyển
          </FieldLabel>
          <Input
            id="search-bar"
            type="search"
            placeholder="Tìm theo công ty hoặc vị trí..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setSearchValue('')}
            disabled={!searchValue}
          >
            Xóa
          </Button>
        </Field>

        <Field>
          <FieldLabel htmlFor="status-filter" className="sr-only">
            Lọc theo trạng thái
          </FieldLabel>
          <DropdownMenu>
            <DropdownMenuTrigger
              id="status-filter"
              aria-label="Lọc hồ sơ theo trạng thái"
              className="flex h-8 w-full items-center justify-between rounded-2xl border border-transparent bg-input/50 px-3 text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
            >
              {statusFilterOptions.find((option) => option.value === selectedStatus)?.label}
              <ChevronDownIcon className="size-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                {statusFilterOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSelectedStatus(option.value)}
                  >
                    <span>{option.label}</span>
                    {selectedStatus === option.value && <CheckIcon className="ml-auto size-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Field>
      </FieldGroup>

      <h2 className="text-xl font-semibold text-gray-800 tracking-tight">Danh sách hồ sơ ứng tuyển</h2>
      
      {loading && <p className="text-gray-500 animate-pulse text-sm">Đang tải hồ sơ ứng tuyển...</p>}
      
      {error && <p className="text-red-600 font-medium text-sm bg-red-50 p-3 rounded-md border border-red-200">{error}</p>}
      
      {/* Danh sách items xếp chồng dọc cách nhau khoảng mb-30px cũ tương đương space-y-6 */}
      <ul className="space-y-6">
        {applications.map((application) => (
          <li 
            key={application.id} 
            value={application.id} 
            onClick={() => setSelectedApplication(application)}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Vùng thông tin: text-left thay vì text-center cũ để trông gọn gàng, min-w-0 chống vỡ chữ dài */}
            <div className="min-w-0 flex-1">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider block mb-1">Công ty</span>
              <strong className="text-lg font-bold text-gray-900 block truncate">{application.company}</strong>
            </div>

            {/* Vùng các nút chức năng: Tự động gom cụm linh hoạt theo kích thước màn hình */}
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <Button 
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn kích hoạt onClick của thẻ li
                  setSelectedApplication(application);
                }} 
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium text-sm rounded-md transition-colors"
              >
                Xem chi tiết
              </Button>
              
              <div
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger
                    aria-label={`Thay đổi trạng thái hồ sơ tại ${application.company}`}
                    className="flex h-9 w-44 items-center justify-between rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statusOptions.find((option) => option.value === application.status)?.label}
                    <ChevronDownIcon className="size-4 text-gray-500" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuGroup>
                      {statusOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => {
                            if (option.value !== application.status) {
                              handleStatusChange(application.id, option.value);
                            }
                          }}
                        >
                          <span>{option.label}</span>
                          {application.status === option.value && <CheckIcon className="ml-auto size-4" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Button 
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn kích hoạt onClick của thẻ li
                  handleDelete(application.id);
                }} 
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-medium text-sm rounded-md transition-colors"
              >
                Xóa
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicationList;
