import {User} from "./user";
import {Event} from "./event";

export interface Feedback {
  id: string;
  feedback: string;
  rating: string;
  user_id: User;
  event_id: Event;
  created_at: Date;
}

export type FeedbackCreateInput = Omit<Feedback, "id" | "user_id" | "event_id" | "created_at"> & {
  userId: string;
  eventId: string;
}
