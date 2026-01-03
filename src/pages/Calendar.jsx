import { useEffect, useState, useContext, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useAuth } from "../context/AuthContext";
import { getEvents } from "../api/events";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const { token, user } = useAuth();
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
      alert("Failed to load calendar events.");
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const eventStyleGetter = (event) => {
    let backgroundColor = "#14b8a6";

    if (event.status === "completed") backgroundColor = "#10b981";
    if (event.status === "cancelled") backgroundColor = "#ef4444";

    return {
      style: {
        backgroundColor,
        borderRadius: "8px",
        opacity: 0.9,
        color: "white",
        border: "0px",
        paddingLeft: "8px",
        fontWeight: "500",
      },
    };
  };

  const handleSelectEvent = (event) => {
    const details = `
${event.title}

Date & Time: ${event.start.toLocaleDateString()} ${event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
${event.location ? `Location: ${event.location}` : ''}
${event.description ? `Description: ${event.description}` : ''}
${event.coordinator ? `Coordinator: ${event.coordinator}` : ''}
Status: ${event.status || 'upcoming'}
    `.trim();

    alert(details);
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
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calendar
          </h1>
          <p className="text-gray-600 mt-2">View and manage all upcoming events</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <style>{`
            .rbc-calendar {
              font-family: inherit;
              color: rgb(17, 24, 39);
            }
            .rbc-header {
              padding: 16px 12px;
              font-weight: 600;
              color: rgb(31, 41, 55);
              background: rgb(249, 250, 251);
              border-bottom: 1px solid rgb(229, 231, 235);
            }
            .rbc-today {
              background: rgb(240, 253, 250);
            }
            .rbc-off-range-bg {
              background: rgb(249, 250, 251);
            }
            .rbc-event {
              padding: 0 4px;
              border-radius: 8px;
            }
            .rbc-event-content {
              padding: 4px 8px;
              font-size: 12px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .rbc-day-bg {
              border-left: 1px solid rgb(229, 231, 235);
            }
            .rbc-date-cell {
              padding: 8px 4px;
            }
            .rbc-current-time-indicator {
              background-color: rgb(20, 184, 166);
              height: 2px;
            }
            .rbc-toolbar {
              padding: 16px;
              gap: 8px;
              background: rgb(249, 250, 251);
              border-bottom: 1px solid rgb(229, 231, 235);
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
            }
            .rbc-toolbar button {
              padding: 8px 16px;
              border: 1px solid rgb(209, 213, 219);
              border-radius: 8px;
              background: white;
              color: rgb(75, 85, 99);
              font-weight: 500;
              transition: all 300ms;
              cursor: pointer;
            }
            .rbc-toolbar button:hover {
              background: rgb(240, 253, 250);
              border-color: rgb(20, 184, 166);
              color: rgb(20, 184, 166);
            }
            .rbc-toolbar button.rbc-active {
              background: rgb(20, 184, 166);
              color: white;
              border-color: rgb(20, 184, 166);
            }
            .rbc-toolbar-label {
              color: rgb(55, 65, 81);
              font-weight: 600;
              flex: 1 0 auto;
            }
            .rbc-month-view,
            .rbc-time-view {
              border: none;
            }
            .rbc-time-slot {
              border-top: 1px solid rgb(243, 244, 246);
            }
            .rbc-time-content {
              border-top: 1px solid rgb(229, 231, 235);
            }
          `}</style>

          <div className="p-4 sm:p-6">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              eventPropGetter={eventStyleGetter}
              onSelectEvent={handleSelectEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
