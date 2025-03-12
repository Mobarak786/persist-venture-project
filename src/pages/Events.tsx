import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/outline";
import EventCard from "../components/events/EventCard";
import EventSearch from "../components/events/EventSearch";
import EventForm from "../components/events/EventForm";
import type { Event } from "../types";

const initialEvents: Event[] = [
  {
    id: "1",
    title: "Interfaith Dialog Session",
    date: "2024-04-15",
    location: "Community Center",
    description:
      "Join us for an evening of meaningful dialogue between different faith communities.",
    category: "Religious",
    starred: false,
  },
  {
    id: "2",
    title: "Community Picnic",
    date: "2024-04-20",
    location: "Central Park",
    description: "A social gathering to strengthen community bonds.",
    category: "Social",
    starred: false,
  },
  {
    id: "3",
    title: "Food Drive",
    date: "2024-04-25",
    location: "Local Food Bank",
    description: "Help us collect food for families in need.",
    category: "Charity",
    starred: true,
  },
];

export default function Events() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredEvents = events
    .filter(
      (event) =>
        selectedCategory === "all" || event.category === selectedCategory
    )
    .filter((event) =>
      searchQuery
        ? event.title.toLowerCase().includes(searchQuery) ||
          event.description.toLowerCase().includes(searchQuery) ||
          event.location.toLowerCase().includes(searchQuery)
        : true
    );

  const validateForm = (eventData: Partial<Event>) => {
    const errors: Record<string, string> = {};
    if (!eventData.title?.trim()) errors.title = "Title is required";
    if (!eventData.date) errors.date = "Date is required";
    if (!eventData.location?.trim()) errors.location = "Location is required";
    if (!eventData.description?.trim())
      errors.description = "Description is required";
    if (eventData.description && eventData.description.length > 500) {
      errors.description = "Description must be less than 500 characters";
    }
    if (eventData.date && new Date(eventData.date) < new Date()) {
      errors.date = "Date must be in the future";
    }
    return errors;
  };

  const handleSubmit = (eventData: Omit<Event, "id">) => {
    const errors = validateForm(eventData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingEvent) {
      setEvents(
        events.map((event) =>
          event.id === editingEvent.id ? { ...eventData, id: event.id } : event
        )
      );
    } else {
      const newEvent: Event = {
        ...eventData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setEvents([...events, newEvent]);
    }

    setIsFormOpen(false);
    setEditingEvent(null);
    setFormErrors({});
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleToggleStar = (id: string) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, starred: !event.starred } : event
      )
    );
  };

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-primary-50">
              Events
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditingEvent(null);
                setIsFormOpen(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New Event
            </motion.button>
          </div>

          <EventSearch onSearch={handleSearch} />

          <div className="flex gap-2 md:gap-4 overflow-x-auto py-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory("all")}
              className={`min-w-[110px] px-4 py-2 rounded-full ${
                selectedCategory === "all"
                  ? "bg-primary-600 text-white"
                  : "text-gray-700 border border-gray-300"
              } shadow-sm hover:shadow transition-all`}
            >
              All Events
            </motion.button>
            {["Religious", "Social", "Charity"].map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? "bg-primary-600 text-white"
                    : " text-gray-700 border border-gray-300"
                } shadow-sm hover:shadow transition-all`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleStar={handleToggleStar}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <EventForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingEvent(null);
            setFormErrors({});
          }}
          onSubmit={handleSubmit}
          initialData={editingEvent || undefined}
          formErrors={formErrors}
        />
      </div>
    </div>
  );
}
