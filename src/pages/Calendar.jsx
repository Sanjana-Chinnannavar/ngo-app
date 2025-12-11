import { useEffect, useState, useContext, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import { getEvents } from "../api/events";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const { token, user } = useContext(AuthContext);
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
  }, []);

  // Color coding based on status
  const eventStyleGetter = (event) => {
    let backgroundColor = "#2A4D69"; // default

    if (event.status === "ongoing") backgroundColor = "#4B86B4";
    if (event.status === "completed") backgroundColor = "gray";

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
      alert(`Admin can edit event: ${event.title}`);
      // later: open edit modal
    } else {
      alert(
        `${event.title}\n\n${event.description || ""}\n\n📍 ${event.location}`
      );
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading calendar…</p>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold text-[#2A4D69] mb-6">
        Calendar
      </h1>

      <div className="bg-white p-4 rounded-xl shadow-lg border border-[#4B86B4]/20">
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
  );
};

export default CalendarPage;
