import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { AlertService } from '../services/alert.service';
import { AlertType } from '../_Enum/alert-type';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  user = new User();
  private subscriptions: Subscription[] = [];
  userphoto!: string;


  constructor(
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    this.getUserInfo(this.accountService.loggInUsername)

    this.userphoto = this.accountService.userHost;
  }

  // Une fonctions qui va retourné les informations d'un utilisateur qui va prendre le nom de user en param
  getUserInfo(username: string): void {
    // On l'ajout dans la liste de subscriptions
    this.subscriptions.push(
      // on envoie l'utilisateur à méthode getUserInformation dans notre serviceAccount
      this.accountService.getUserInformation(username).subscribe(
        // on retourne une reponse de type User
        (response: User) => {
          // on affecte cet reponse à notre variable user qui represente l'utilisateur
          this.user = response;
          // comptons le nombre de notification de l'utilisateur
        },
        error => {
          // si ya erreur on affiche l'erreur dans la console
          console.log(error);
          //this.user = null;
          // on appel la fonction logOut() pour déconnecter l'utilisateur
          this.logOut();
          // et on le redirige vers la page de connexion
          this.router.navigateByUrl('/login');
        }
      ));
  }


  // une fonction pour permettre à l'utilisateur de voir son profil
  getUserProfile(username: string): void {
    // on appel le path qui permettre d'acceder au profil avec le nom d'utilisateur en paramètre
    this.router.navigate(['/profile', username]);
  }


  // Une fonction pour Déconnexion
  logOut(): void {
    // on appel la fonction logOut() qui se trouve dans nore service pour déconnecter l'utilisateur
    this.accountService.logOut();
    // on le redirige vers la page de connexion
    this.router.navigateByUrl('/login');
    // On l'affiche un message
    this.alertService.showAlert(
      "Vous devez vous connecter pour accéder à cette page !",
      AlertType.DANGER
    );
  }


}
