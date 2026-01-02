export const Permissions = {
  canManageEvents(user) {
    return user?.role === "admin";
  },

  canManageAnnouncements(user) {
    return user?.role === "admin";
  },

  canRespondToEvent(user) {
    return user?.role === "volunteer";
  }
};
