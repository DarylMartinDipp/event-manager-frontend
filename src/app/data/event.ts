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
  organizer_id: User;
  category_id: Category;
  created_at: Date;
}
