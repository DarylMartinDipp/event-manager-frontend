import {Component, OnInit} from "@angular/core";
import {Category} from "../../data/category";
import {FormBuilder, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {EventService} from "../../services/event.service";
import {Router} from "@angular/router";
import {EventCreateInput} from "../../data/event";

import Swal from 'sweetalert2'
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  loggedUser: any;

  categoriesAvailable: Category[] = [];
  countries: string[] = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
    "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the",
    "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland",
    "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala",
    "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
    "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast" , "Jamaica",
    "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South",
    "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
    "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
    "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia",
    "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru",
    "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
    "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
    "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private eventService: EventService,
    private userService: UserService,
    private router: Router,
  ) {
    const localUser = localStorage.getItem('loggedUser');
    if (localUser != null && localUser !== "undefined")
      this.loggedUser = JSON.parse(localUser);
  }

  createEventForm = this.formBuilder.group({
    eventTitle: ['', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      updateOn: 'blur',
    }],
    eventDescription: ['', {
      validators: [Validators.required, Validators.maxLength(2000)],
      updateOn: 'blur',
    }],
    eventCategory: ['', {
      validators: [Validators.required],
      updateOn: 'blur',
    }],
    eventNumberStreet: ['', {
      validators: [Validators.pattern('^[0-9]*$')],
      updateOn: 'blur',
    }],
    eventStreet: ['', {
      validators: [Validators.required],
      updateOn: 'blur',
    }],
    eventCity: ['', {
      validators: [Validators.required],
      updateOn: 'blur',
    }],
    eventCountry: ['', {
      validators: [Validators.required],
      updateOn: 'blur',
    }],
    eventDate: ['', {
      validators: [Validators.required],
      updateOn: 'blur',
    }],
  });

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(categoriesAvailable => {
      this.categoriesAvailable = categoriesAvailable;
    });
  }

  protected submitCreatedEvent(): void {
    if (this.createEventForm.valid) {
      this.userService.getUserByEmail(this.loggedUser.userEmail).subscribe(
        organizer => {
          // Create the event
          const eventToCreate: EventCreateInput = {
            eventTitle: this.createEventForm.get("eventTitle")!.value!,
            eventDescription: this.createEventForm.get("eventDescription")!.value!,
            categoryId: this.createEventForm.get("eventCategory")!.value!,
            eventNumberStreet: this.createEventForm.get("eventNumberStreet")!.value!,
            eventStreet: this.createEventForm.get("eventStreet")!.value!,
            eventCity: this.createEventForm.get("eventCity")!.value!,
            eventCountry: this.createEventForm.get("eventCountry")!.value!,
            eventDate: new Date(this.createEventForm.get("eventDate")!.value!),
            organizerId: organizer.id,
          };
          debugger;
          this.eventService.createEvent(eventToCreate).subscribe(
            () => this.router.navigate(['/home'])
          );

          // Alert the user
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Event Submitted Successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      )
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please Check Your Event Details.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  onNumberStreetInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
    this.createEventForm.get('eventNumberStreet')?.setValue(inputElement.value);
  }

  get eventTitle() {
    return this.createEventForm.controls['eventTitle'];
  }

  get eventDescription() {
    return this.createEventForm.controls['eventDescription'];
  }

  get eventCategory() {
    return this.createEventForm.controls['eventCategory'];
  }

  get eventNumberStreet() {
    return this.createEventForm.controls['eventNumberStreet'];
  }

  get eventStreet() {
    return this.createEventForm.controls['eventStreet'];
  }

  get eventCity() {
    return this.createEventForm.controls['eventCity'];
  }

  get eventCountry() {
    return this.createEventForm.controls['eventCountry'];
  }

  get eventDate() {
    return this.createEventForm.controls['eventDate'];
  }
}
