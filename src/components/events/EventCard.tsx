import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  RiEditLine,
  RiDeleteBin6Line,
  RiStarLine,
  RiStarFill,
  RiMoreLine,
} from "react-icons/ri";
import { Dialog } from "@headlessui/react";
import type { Event } from "../../types";

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
  onToggleStar: (id: string) => void;
}

export default function EventCard({
  event,
  onEdit,
  onDelete,
  onToggleStar,
}: EventCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    setShowDeleteDialog(false);
    onDelete(event.id);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
      >
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-gray-900">
              {event.title}
            </h3>
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Show actions"
              >
                <RiMoreLine className="w-5 h-5 text-gray-500" />
              </button>

              <AnimatePresence>
                {showActions && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600   py-1 z-10"
                  >
                    <button
                      onClick={() => {
                        onToggleStar(event.id);
                        setShowActions(false);
                      }}
                      className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      {event.starred ? (
                        <>
                          <RiStarFill className="w-5 h-5 text-yellow-500" />
                          <span>Unstar Event</span>
                        </>
                      ) : (
                        <>
                          <RiStarLine className="w-5 h-5 text-gray-500" />
                          <span>Star Event</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        onEdit(event);
                        setShowActions(false);
                      }}
                      className="w-full px-4 py-2 text-left flex items-center space-x-2  hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <RiEditLine className="w-5 h-5 text-blue-500" />
                      <span>Edit Event</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteDialog(true);
                        setShowActions(false);
                      }}
                      className="w-full px-4 py-2 text-left flex items-center space-x-2  hover:bg-gray-50 dark:hover:bg-gray-700 text-red-600"
                    >
                      <RiDeleteBin6Line className="w-5 h-5" />
                      <span>Delete Event</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mt-2">
            {event.category}
          </span>
          <p className="text-gray-600 mt-2">
            {format(new Date(event.date), "MMMM d, yyyy")}
          </p>
          <p className="text-gray-600">{event.location}</p>
          <p className="text-gray-700 mt-4">{event.description}</p>
        </div>
      </motion.div>

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              Delete Event
            </Dialog.Title>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete "{event.title}"? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Delete
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
