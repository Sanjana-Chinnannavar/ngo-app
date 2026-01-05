const { sequelize } = require("./config/db");
const User = require("./models/User");
const Volunteer = require("./models/Volunteer");
const Event = require("./models/Event");
const EventAssignment = require("./models/EventAssignment");
const Announcement = require("./models/Announcement");
require("./models/associations");

const seed = async () => {
    try {
        await sequelize.sync({ force: true }); // Reset DB
        console.log("Database reset.");

        // 1. Create Admin
        await User.create({
            email: "admin@example.com",
            password: "password123",
            role: "admin",
        });

        // 2. Helper to create volunteer
        const createVol = async (name, email, phone, skills, availability, gender = "Male", age = 22) => {
            const user = await User.create({ email, password: "password123", role: "volunteer" });
            await Volunteer.create({ name, email, phone, skills, availability, gender, age, userId: user.id });
        };

        // 3. Insert Real Volunteers
        await createVol("Sanjana", "sanjana.hbl@email.com", "9845012345", "Content Writing, Social Media", "Weekends only (Saturday & Sunday)", "Female", 24);
        await createVol("Satwik", "satwik.dev@email.com", "9900123456", "Web Development", "Weekends", "Male", 26);
        await createVol("Harsh", "harsh.ngo@email.com", "9886234567", "Logistics, Event Coordination, Heavy Lifting", "Flexible (On-call for emergencies)", "Male", 29);
        await createVol("Udita", "udita.b@email.com", "7019345678", "Graphic Design, Poster Making, Video Editing", "Weekdays (Remote/Work from home)", "Female", 23);
        await createVol("Madhura", "madhura.edu@email.com", "8123456789", "Teaching, Child Psychology, Primary Education", "Weekdays (3 PM to 5 PM)", "Female", 30);
        await createVol("Srushti", "srushti.arts@email.com", "9448067890", "Public Speaking, Community Outreach, English", "Weekends and Public Holidays", "Female", 27);
        await createVol("Rakshita", "rakshita.fin@email.com", "9611178901", "Accounting, Data Entry, Spreadsheet Management", "Friday afternoons", "Female", 32);
        await createVol("Devika", "devika.legal@email.com", "9742289012", "Documentation, Legal Awareness", "Tuesday and Thursday mornings", "Female", 28);
        await createVol("test", "test@gmail.com", "7894561234", "test", "test", "Male", 20);


        // 4. Create Events
        await Event.create({
            title: "Fundraising Gala Strategy Meeting",
            description: "Internal planning session to discuss the upcoming annual gala.",
            date: "2026-02-10",
            startTime: "17:00",
            endTime: "18:30",
            location: "NGO Head Office, Shirur Park",
            coordinator: "Rakshita",
            status: "upcoming",
            volunteersNeeded: 20,
        });

        await Event.create({
            title: "Monthly Food Distribution Drive",
            description: "Distributing dry ration kits and cooked meals to the homeless.",
            date: "2026-02-05",
            startTime: "19:30",
            endTime: "21:30",
            location: "Hubli Junction (Railway Station)",
            coordinator: "Devika",
            status: "upcoming",
            volunteersNeeded: 15,
        });

        await Event.create({
            title: "Hubli Youth Tree Plantation",
            description: "Planting 100 native saplings along the bypass road.",
            date: "2026-01-26",
            startTime: "08:00",
            endTime: "11:00",
            location: "Kusugal Road Bypass, Hubli",
            coordinator: "Madhura",
            status: "upcoming",
            volunteersNeeded: 35
        });

        await Event.create({
            title: "Women's Skill Development (Tailoring)",
            description: "Launch of the new 3-month tailoring course for women.",
            date: "2026-01-24",
            startTime: "10:00",
            endTime: "16:00",
            location: "NGO Training Hub, Deshpande Nagar",
            coordinator: "Srushti",
            status: "upcoming",
            volunteersNeeded: 10
        });

        await Event.create({
            title: "Sustainable Farming Seminar",
            description: "Training session for local farmers on organic fertilizer.",
            date: "2026-01-18",
            startTime: "10:00",
            endTime: "13:00",
            location: "APMC Yard Meeting Hall",
            coordinator: "Udita",
            status: "upcoming",
            volunteersNeeded: 10,
        });

        await Event.create({
            title: "Free Health Check-up Camp",
            description: "General health screening including BP and diabetes check.",
            date: "2026-01-15",
            startTime: "09:00",
            endTime: "16:00",
            location: "Government Primary School, Gokul Road",
            coordinator: "Harsh",
            status: "upcoming",
            volunteersNeeded: 15,
        });

        await Event.create({
            title: "Vidyanagar Literacy Workshop",
            description: "Weekly tutoring session for underprivileged children.",
            date: "2026-01-11",
            startTime: "08:00",
            endTime: "13:00",
            location: "Community Center, Vidyanagar",
            coordinator: "Satwik",
            status: "upcoming",
            volunteersNeeded: 8
        });

        await Event.create({
            title: "Unkal Lake Cleanup Drive",
            description: "Community volunteer event to remove plastic waste from the lake.",
            date: "2026-01-07",
            startTime: "07:00",
            endTime: "22:30",
            location: "Unkal Lake",
            coordinator: "Sanjana",
            status: "upcoming",
            volunteersNeeded: 30,
        });

        // 5. Create Announcements
        await Announcement.create({ title: "Emergency Monsoon Relief Fund", message: "With heavy rains expected in North Karnataka next week, we are collecting donations for tarpaulin sheets and dry rations. Every small contribution helps protect a family this monsoon.", postedBy: "Admin" });
        await Announcement.create({ title: "Change in Office Hours", message: "Please note that our main office in Shirur Park will now operate from 9:00 AM to 6:00 PM, Monday through Saturday. We will remain closed on Sundays except for specific volunteer drives.", postedBy: "Admin" });
        await Announcement.create({ title: "Plastic-Free Hubli Initiative", message: "Starting this month, our NGO is partnering with local vendors at the MG Market to distribute cloth bags. Join us this Saturday as we phase out single-use plastics.", postedBy: "Admin" });
        await Announcement.create({ title: "New Partnership with KIMS Hospital", message: "We are proud to announce a collaboration with KIMS Hospital to provide subsidized healthcare cards for senior citizens registered with our foundation. Contact the office for details.", postedBy: "Admin" });
        await Announcement.create({ title: "Call for Blood Donors", message: "Our emergency blood donor database is being updated. If you are a healthy donor living in Hubli, please submit your contact details and blood group to our whatsapp helpline.", postedBy: "Admin" });
        await Announcement.create({ title: "Website Maintenance Notice", message: "Our online donation portal will be down for scheduled maintenance tonight from 11:00 PM to 2:00 AM. Please plan your contributions accordingly.", postedBy: "Admin" });

        console.log("Seed data injected successfully!");
        process.exit();
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seed();
