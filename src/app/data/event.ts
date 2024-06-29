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

/*
    The Event interface uses attribute names that match our database schema, such as "id" and "title".
    However, our backend requires different attribute names when creating an event
    (e.g., "eventTitle" and "eventDescription").

    To resolve this, the EventCreateInput type is created not only to remove the "created_at" attribute
    or change the types of "organizer_id" and "category_id", but also to map the attribute names to
    match the expected backend format.
*/
export type EventCreateInput = Omit<Event, "id" | "title" | "description" | "number_street" |
  "street" | "city" | "country" | "event_date" | "organizer_id" | "category_id" | "created_at"> & {
  eventTitle: string;
  eventDescription: string;
  eventNumberStreet: string;
  eventStreet: string;
  eventCity: string;
  eventCountry: string;
  eventDate: Date;
  organizerId: string;
  categoryId: string;
};