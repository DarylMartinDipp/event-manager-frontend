import {User} from "./user";
import {Event} from "./event";

export interface Registration {
  id: string;
  user_id: User;
  event_id: Event;
  registered_at: Date;
}

export type RegistrationCreateInput = Omit<Registration, "id" | "user_id" | "event_id" | "registered_at"> & {
  userId: String;
  eventId: String;
};
