import bcryptjs from 'bcryptjs';
import User from '../models/User.js';

const TEST_USERS = [
  {
    firstName: 'Student',
    lastName: 'User',
    email: 'student@test.com',
    password: '123456',
    role: 'student',
  },
  {
    firstName: 'Faculty',
    lastName: 'User',
    email: 'faculty@test.com',
    password: '123456',
    role: 'faculty',
  },
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@test.com',
    password: '123456',
    role: 'admin',
  },
];

export const seedTestUsers = async () => {
  for (const seed of TEST_USERS) {
    const existing = await User.findOne({ email: seed.email }).select('+password');

    if (!existing) {
      const user = new User(seed);
      await user.save();
      continue;
    }

    const passwordMatches = await bcryptjs.compare(seed.password, existing.password);
    let changed = false;

    if (!passwordMatches) {
      existing.password = seed.password;
      changed = true;
    }

    if (existing.role !== seed.role) {
      existing.role = seed.role;
      changed = true;
    }

    if (!existing.isActive) {
      existing.isActive = true;
      changed = true;
    }

    if (changed) {
      await existing.save();
    }
  }
};
