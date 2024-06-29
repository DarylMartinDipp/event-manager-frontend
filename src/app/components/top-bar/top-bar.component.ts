import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: "app-top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.scss"],
})
export class TopBarComponent {
  loggedUser: any;

  constructor(private router: Router) {
    const localUser = localStorage.getItem('loggedUser');
    if (localUser != null) {
      this.loggedUser = JSON.parse(localUser)
    }
  }

  onLogOut() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/signIn']);
  }
}
