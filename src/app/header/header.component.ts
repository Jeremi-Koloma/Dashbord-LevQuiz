import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { AlertService } from '../services/alert.service';
import { LoadingService } from '../services/loading.service';
import { AlertType } from '../_Enum/alert-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  user = new User();
  private subscriptions: Subscription[] = [];
  userphoto!: string;
  
  constructor(
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
    ) {}

  ngOnInit(): void {
    
    this.getUserInfo(this.accountService.loggInUsername)

    this.userphoto = this.accountService.userHost;
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
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

    // Une fonction Click pour Déconnexion
    logOut(): void {
      // on appel la fonction logOut() qui se trouve dans nore service pour déconnecter l'utilisateur
      this.accountService.logOut();
      // on le redirige vers la page de connexion
      this.router.navigateByUrl('/login');
      // On l'affiche un message
      this.alertService.showAlert(
        "Déconnecter avec succès !",
        AlertType.DANGER
      );
    }


}
