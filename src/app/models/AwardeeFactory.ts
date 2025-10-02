export const AwardeeFactory = {
  makeAwardee(overrides = {}) {
    const defaultAwardee = {
      id: 0,
      name: "Default Awardee Name",
      email: "",
      hashedEmail: "",
      createdAt: new Date(),
    };
    return {
      ...defaultAwardee,
      ...overrides,
    };
  },
};
