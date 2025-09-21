import { Awardee } from './Awardee';

export const AwardeeFactory = {
    makeAwardee(overrides = {}) {
        const defaultAwardee = {
            id: 0,
            name: 'Default Awardee Name',
            email: '',
            hashedEmail: '',
            createdAt: new Date()
        };
        return new Awardee({
            ...defaultAwardee,
            ...overrides
        });
    }
};
