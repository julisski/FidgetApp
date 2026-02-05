import { getDatabase, ref, push, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app } from '../firebaseConfig';

const db = getDatabase(app);

export type Profile = {
  id: string;
  name: string;
  createdAt: number;
};

export async function createProfile(name: string): Promise<void> {
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (!user) {
    throw new Error('No authenticated user');
  }

  const profilesRef = ref(db, `profiles/${user.uid}`);

  await push(profilesRef, {
    name,
    createdAt: Date.now(),
  });
}

export async function getProfiles(): Promise<Profile[]> {
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (!user) return [];

  const snapshot = await get(ref(db, `profiles/${user.uid}`));

  if (!snapshot.exists()) return [];

  const data = snapshot.val() as Record<
    string,
    { name: string; createdAt: number }
  >;

  return Object.entries(data).map(([id, value]) => ({
    id,
    name: value.name,
    createdAt: value.createdAt,
  }));
}
