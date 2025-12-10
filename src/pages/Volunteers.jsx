const Volunteers = () => {
  const mockVolunteers = [
    { name: "Alex Johnson", skills: "First Aid", availability: "Weekends" },
    { name: "Sanjana Chinnanavar", skills: "Teaching", availability: "Weekdays" },
    { name: "Riya Sharma", skills: "Event Management", availability: "Flexible" },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Volunteers</h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Skills</th>
              <th className="p-3 text-left">Availability</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {mockVolunteers.map((v, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{v.name}</td>
                <td className="p-3">{v.skills}</td>
                <td className="p-3">{v.availability}</td>
                <td className="p-3">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Volunteers;
