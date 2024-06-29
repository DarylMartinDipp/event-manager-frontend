import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {UserCreateInput} from "../../data/user";
import Swal from "sweetalert2";

@Component({
  selector: 'app-sign-in-user',
  templateUrl: './sign-in-user.component.html',
  styleUrls: ['./sign-in-user.component.css']
})
export class SignInUserComponent {
  isSignInVisible: boolean = true;

  signInForm = this.formBuilder.group({
    username: ['', {
      validators: [Validators.required],
      updateOn: 'blur',
    }],
    hashed_password: ['', {
      validators: [Validators.required],
      updateOn: 'blur',
    }],
  });

  signUpForm = this.formBuilder.group({
    username: ['', {
      validators: [Validators.required, Validators.minLength(3)],
      updateOn: 'blur',
    }],
    userEmail: ['', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }],
    hashed_password: ['', {
      validators: [Validators.required, Validators.minLength(6)],
      updateOn: 'blur',
    }],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {}

  onSignUp() {
    if (this.signUpForm.valid) {

      // Check if the userEmail already exists
      this.userService.getUserByEmail(this.signUpForm.get('userEmail')!.value!).subscribe(
        user => {
          if (user) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Email already exists.",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            // Check if the username already exists
            this.userService.getUserByUsername(this.signUpForm.get('username')!.value!).subscribe(
              user => {
                if (user) {
                  Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Username already exists.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                } else {
                  // Create the user
                  const userToCreate: UserCreateInput = {
                    userEmail: this.signUpForm.get('userEmail')!.value!,
                    username: this.signUpForm.get('username')!.value!,
                    hashed_password: this.signUpForm.get('hashed_password')!.value!,
                  }

                  this.userService.createUser(userToCreate).subscribe(
                    () => this.router.navigate(['/home'])
                  );

                  //Alert the user
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Welcome!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              }
            )
          }
        }
      )
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please Check Your User Details.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  onSignIn() {
    if (this.signInForm.valid) {
      this.userService.getUserByUsername(this.signInForm.get('username')!.value!).subscribe(
        user => {
          if (user) {
            if (user.hashed_password === this.signInForm.get('hashed_password')!.value!) {
              localStorage.setItem('loggedUser', JSON.stringify(user))
              this.router.navigate(['/home']);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Welcome back!",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "The password is not matching.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "This username doesn't exist.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      )
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please Check Your Credential Details.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  get usernameIn() {
    return this.signInForm.get("username");
  }

  get hashed_passwordIn() {
    return this.signInForm.get("hashed_password");
  }

  get usernameUp() {
    return this.signUpForm.get("username");
  }

  get userEmailUp() {
    return this.signUpForm.get("userEmail");
  }

  get hashed_passwordUp() {
    return this.signUpForm.get("hashed_password");
  }
}
