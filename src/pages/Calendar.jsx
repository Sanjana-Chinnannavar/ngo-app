import { useEffect, useState, useContext, useCallback } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import { getEvents } from "../api/events";
import { Calendar } from "lucide-react";
import { useToast } from "../context/ToastContext";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const { token, user } = useContext(AuthContext);
  const { toast } = useToast();
  const isAdmin = user?.role === "admin";

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getEvents(token);
      const formatted = res.data.map((ev) => ({
        id: ev.id,
        title: ev.title,
        start: new Date(`${ev.date}T${ev.startTime}`),
        end: ev.endTime
          ? new Date(`${ev.date}T${ev.endTime}`)
          : new Date(`${ev.date}T${ev.startTime}`),
        description: ev.description,
        location: ev.location,
        coordinator: ev.coordinator,
        status: ev.status,
      }));
      setEvents(formatted);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load calendar events.");
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    loadEvents();
  }, []);

  // Color coding based on status
  const eventStyleGetter = (event) => {
    let backgroundColor = "#14b8a6";

    if (event.status === "ongoing") backgroundColor = "#0d9488";
    if (event.status === "completed") backgroundColor = "#6b7280";

    return {
      style: {
        backgroundColor,
        borderRadius: "6px",
        opacity: 0.9,
        color: "white",
        border: "0px",
        paddingLeft: "6px",
      },
    };
  };

  // On event click
  const handleSelectEvent = (event) => {
    if (isAdmin) {
      toast.info(`Selected: ${event.title}`);
      // later: open edit modal
    } else {
      toast.info(
        <div>
          <p className="font-bold">{event.title}</p>
          <p className="text-sm">{event.description}</p>
          <p className="text-xs mt-1">📍 {event.location}</p>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calendar
          </h1>
          <p className="text-gray-600 mt-2">View all scheduled events at a glance</p>
        </div>

        <div
          className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-teal-300 hover:-translate-y-1"
          style={{
            animation: `fadeInUp 0.6s ease-out 0s both`
          }}
        >
          <style>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          <div className="h-1 bg-gradient-to-r from-teal-500 to-teal-400 group-hover:h-1.5 transition-all duration-300"></div>

          <div className="p-6 sm:p-8">
            <style>{`
              .rbc-calendar {
                font-family: inherit;
              }
              .rbc-header {
                padding: 12px 6px;
                font-weight: 600;
                font-size: 14px;
                color: #374151;
                border-bottom: 2px solid #e5e7eb;
              }
              .rbc-today {
                background-color: #f0fdfa;
              }
              .rbc-off-range-bg {
                background-color: #f9fafb;
              }
              .rbc-event {
                padding: 4px 6px;
                font-size: 13px;
                font-weight: 500;
              }
              .rbc-event:focus {
                outline: 2px solid #14b8a6;
              }
              .rbc-month-view {
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                overflow: hidden;
              }
              .rbc-day-bg {
                border-left: 1px solid #f3f4f6;
              }
              .rbc-month-row {
                border-top: 1px solid #f3f4f6;
              }
              .rbc-toolbar {
                padding: 16px 0;
                margin-bottom: 16px;
                flex-wrap: wrap;
                gap: 12px;
              }
              .rbc-toolbar button {
                padding: 8px 16px;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                background-color: white;
                color: #374151;
                font-weight: 500;
                transition: all 0.2s;
              }
              .rbc-toolbar button:hover {
                background-color: #f0fdfa;
                border-color: #14b8a6;
                color: #0d9488;
              }
              .rbc-toolbar button.rbc-active {
                background-color: #14b8a6;
                color: white;
                border-color: #14b8a6;
              }
              .rbc-toolbar button.rbc-active:hover {
                background-color: #0d9488;
              }
              .rbc-event {
                cursor: pointer;
                transition: all 0.2s;
              }
              .rbc-event:hover {
                transform: scale(1.05);
                box-shadow: 0 2px 8px rgba(20, 184, 166, 0.3);
              }
            `}</style>

            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              eventPropGetter={eventStyleGetter}
              onSelectEvent={handleSelectEvent}
            />
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-white px-6 sm:px-8 py-4 border-t border-gray-100 flex items-center justify-between group-hover:bg-gradient-to-r group-hover:from-teal-50 group-hover:to-gray-50 transition-all duration-300">
            <span className="text-sm text-gray-600 font-medium">
              {events.length} {events.length === 1 ? 'event' : 'events'} scheduled
            </span>
            <div className="w-2 h-2 bg-teal-500 rounded-full group-hover:animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
