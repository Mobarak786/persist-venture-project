import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import type { Event } from "../../types";

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: Omit<Event, "id">) => void;
  initialData?: Event;
  formErrors: Record<string, string>;
}

export default function EventForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  formErrors,
}: EventFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      location: formData.get("location") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as "Religious" | "Social" | "Charity",
      starred: initialData?.starred || false,
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-xl w-full bg-primary-50 dark:bg-gray-900 rounded-2xl shadow-xl">
          <div className="p-6">
            <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6">
              {initialData ? "Edit Event" : "Add New Event"}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={initialData?.title}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    formErrors.title
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300  focus:border-primary-500 focus:ring-primary-500"
                  }`}
                />
                {formErrors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  defaultValue={initialData?.date}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    formErrors.date
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  }`}
                />
                {formErrors.date && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={initialData?.location}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    formErrors.location
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  }`}
                />
                {formErrors.location && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.location}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={initialData?.description}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    formErrors.description
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  }`}
                  rows={3}
                />
                {formErrors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={initialData?.category || "Social"}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="Religious">Religious</option>
                  <option value="Social">Social</option>
                  <option value="Charity">Charity</option>
                </select>
              </div>

              <div className="flex gap-4 justify-end mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {initialData ? "Update Event" : "Add Event"}
                </button>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
