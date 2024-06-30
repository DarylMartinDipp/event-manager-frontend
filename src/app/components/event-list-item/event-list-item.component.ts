import {Component, Input} from "@angular/core";
import {Event} from "../../data/event";
import {RegistrationService} from "../../services/registration.service";
import {Registration} from "../../data/registration";

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.css']
})
export class EventListItemComponent {
  @Input()
  event!: Event;

  registeredUsers: string[] = [];

  constructor(private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.loadRegistrations();
  }

  loadRegistrations(): void {
    this.registrationService.getRegistrationsByEventId(this.event.id).subscribe((registrations: Registration[]) => {
      this.registeredUsers = registrations.map(registration => registration.user_id.username);
    });
  }

  categoryColors: { [key: string]: string } = {
    'd074dd98-d416-4c33-952f-2bcff3592c36': '#FF5733', // Arts & Culture
    '98c7cd3d-edc0-4343-9341-a6514bc2eb9c': '#33FF57', // Business & Professional
    'd336792f-e4cf-43b3-855a-aa046c9455cf': '#3357FF', // Charity & Causes
    '7887caeb-60a5-4dd3-a5c1-bf47cb10e301': '#FF33A5', // Education & Training
    'ec49d469-f272-402d-bf3a-2bf23bd7f217': '#FFA533', // Food & Drink
    'be3dfde3-816e-469e-a4d3-a9847df992e9': '#A533FF', // Health & Wellness
    '9dd94d85-a1a0-4dfb-98c1-3fba26c69076': '#33FFF1', // Music & Entertainment
    '3bbb69d5-f832-4108-9d64-65f61bee61aa': '#F1FF33', // Social & Networking
    '4126b1d4-e417-4ae3-8e25-210c180332fa': '#FF5733', // Sports & Recreation
    '1c6c18e3-bf43-4c7e-a92e-ff4a8b1b3571': '#FF3357'  // Technology & Innovation
  };

  categoryImages: { [key: string]: string } = {
    'd074dd98-d416-4c33-952f-2bcff3592c36': 'https://plus.unsplash.com/premium_photo-1664475769298-bd708ef6ac48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Arts & Culture
    '98c7cd3d-edc0-4343-9341-a6514bc2eb9c': 'https://images.unsplash.com/photo-1573164574511-73c773193279?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Business & Professional
    'd336792f-e4cf-43b3-855a-aa046c9455cf': 'https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Charity & Causes
    '7887caeb-60a5-4dd3-a5c1-bf47cb10e301': 'https://plus.unsplash.com/premium_photo-1682284353484-4e16001c58eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Education & Training
    'ec49d469-f272-402d-bf3a-2bf23bd7f217': 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Food & Drink
    'be3dfde3-816e-469e-a4d3-a9847df992e9': 'https://images.unsplash.com/photo-1603206004639-22635b71ac08?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Health & Wellness
    '9dd94d85-a1a0-4dfb-98c1-3fba26c69076': 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZW50ZXJ0YWlubWVudHxlbnwwfHwwfHx8MA%3D%3D', // Music & Entertainment
    '3bbb69d5-f832-4108-9d64-65f61bee61aa': 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Social & Networking
    '4126b1d4-e417-4ae3-8e25-210c180332fa': 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Sports & Recreation
    '1c6c18e3-bf43-4c7e-a92e-ff4a8b1b3571': 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Technology & Innovation
  };

  getCategoryColor(category: any): string {
    return this.categoryColors[category.id] || '#007bff';
  }

  getCategoryImage(category: any): string {
    return this.categoryImages[category.id] || 'path/to/default-image.jpg';
  }
}
