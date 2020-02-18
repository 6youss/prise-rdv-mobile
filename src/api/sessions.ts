import {ISession} from '../types';
import {BASE_URL} from '../utils/values';

export async function postSession(
  accessToken: string | undefined,
  patientId: string,
  doctorId: string,
  date: Date,
): Promise<ISession> {
  const res = await fetch(`${BASE_URL}/sessions/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({patientId, doctorId, date: date.toISOString()}),
  });
  if (res.ok) {
    return (await res.json()).session;
  }
  throw new Error(await res.text());
}
