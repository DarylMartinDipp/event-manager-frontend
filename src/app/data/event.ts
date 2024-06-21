import {User} from "./user";
import {Category} from "./category";

export interface Event {
  id: string;
  title: string;
  description: string;
  number_street: string;
  street: string;
  city: string;
  country: string;
  event_date: Date;
  organizer: User;
  category: Category;
  created_at: Date;
}

export type EventCreateInput = Omit<Event, "id" | "organizer" | "category"> & {
  organizer_id: string;
  category_id: string;
};
