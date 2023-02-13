import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { AlertService } from '../services/alert.service';
import { LoadingService } from '../services/loading.service';
import { AlertType } from '../_Enum/alert-type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{


  // une variable pour la validation de type FormGroup
  loginForm!: FormGroup

  // une variable pour la validation de type FormGroup
  registerForm!: FormGroup

  // C'est-à-dire que par defaut le formulaire n'est pas valider
  submitted = false;

  // un Object d'utilisateur
  user = new User();

  persoconnecter: any;

  // Déclarons une variable liste de subscriptions
  private subscriptions: Subscription[] = [];

  private subscriptionsRegister: Subscription[] = [];

  // Injections des dépendances
  constructor(
    private router: Router, // pour la redirection
    private accountService: AccountService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private formBulder: FormBuilder
  ) { }

  ngOnInit() {
    /* *********************** LOGIN
    Quand ce composant est initialiser, 
     Une fois que la connexion à reussi
     nous ne voulons pas qu'il reste sur la même page, on veut l'envoyé vers la page qu'il démande ou l'Accueil
    ************************* */

    // Vérifions si l'utilisateur s'est authentifier
    if (this.accountService.isLoggedIn()) {
      // on le laisse aller là ou il veut
      if (this.accountService.redirectUrl) {
        this.router.navigateByUrl(this.accountService.redirectUrl);
      } else { // sinon il s'est authentifier mais l'url n'existe pas, on le redirige à la page d'Accueil
        this.router.navigateByUrl('/home');
      }
    }
    // Sinon si la connexion n'a pas réussi, on le redirige vers la page de connexion
    else {
      this.router.navigateByUrl('/login');
    }

    /* ***********************
    validation des formulaire LOGIN
  ************************* */
    // Lorsque le component est initialiser, on utilise notre loginForm pour avoir accèss aux Groupe de FormBuilder qui est dans le constructeur;
    this.loginForm = this.formBulder.group({
      // Déclarons les champs ou validations qu'on souhaite avoir
      // Le première validation est required
      // maintenant d'éclarons les variables qui seront binder avec le formulaire avec formControlName puis ngClass dans le html au niveau des input
      username: ["", Validators.required],
      password: ["", Validators.required]
    })


  }




  /* *********************** LOGIN
      Une fonction pour le Login
      Qui va prendre un user son username and password
  ************************* */
  // Quand on appel cette fonction onLogin
  onLogin(user: User): void {
    // on appel le service loadingService le chargement de la page
    //this.loadingService.presentLoading();
    // Affichons les informations de l'utilisateur dans la console
    console.log(user);
    // On l'ajout dans la liste de subscriptions
    this.subscriptions.push(
      // on envoie les identifiants de l'utilisateur à méthode login dans notre serviceAccount
      this.accountService.login(user).subscribe(
        // On prend la reponse dans le body
        response => {
          // on déclare une constante pour acceder à la response, puis le header pour recupérer le token
          const token: any = response.headers.get('Authorization');
          // on appel la méthode saveToken dans le serviceAccount pour enregister le token dans app front
          this.accountService.saveToken(token);
          this.accountService.getUserInformation(user.username).subscribe(data => {
            this.persoconnecter = data;
            console.log("--- User Recupérer ---")
            console.log(this.persoconnecter)
            // Vérifier si l'utilisateur a un compte formateur et si son status est activé
            if (this.persoconnecter.status == true) {
              // On vérifie s'il a un bon url de la page qu'il veut acceder et que l'authentification a réussi
              if (this.accountService.redirectUrl) {
                // on le redirige vers la page demande si elle existe
                this.router.navigateByUrl(this.accountService.redirectUrl);
              }
              // Sinon on le redirige vers la page d'Accueil si l'authentification a réussi
              else {
                this.router.navigateByUrl('/home');
              }
              this.loadingService.isLoading.next(false);

            }
            // Sinon si l'utilisateur a un compte APPRENANT
            else {
              // Parcourons les roles de user
              for (let j = 0; j < this.persoconnecter.userRoles.length; j++) {
                if (this.persoconnecter.userRoles[j].role.name.includes("APPRENANT")) {
                  // On vérifie s'il a un bon url de la page qu'il veut acceder et que l'authentification a réussi
                  if (this.accountService.redirectUrl) {
                    // on le redirige vers la page demande si elle existe
                    this.router.navigateByUrl(this.accountService.redirectUrl);
                  }
                  // Sinon on le redirige vers la page d'Accueil si l'authentification a réussi
                  else {
                    this.router.navigateByUrl('/home');
                  }
                  this.loadingService.isLoading.next(false);
                }
              }

            }
          });

        },
        error => {
          // sinon s'il ya erreur, on l'affiche dans la console
          console.log(error);
          this.loadingService.isLoading.next(false);
          // on appel la fonction de message
          this.alertService.showAlert(
            "Nom d'utilisateur ou le mots de passe est incorrect !",
            AlertType.DANGER
          );
        }
      )
    );




  }


  // Boutons qui de validation login
  onSubmitLogin() {
    // changeons la variable de submitted à true;
    this.submitted = true

    // Vérions si les champs sont invalid
    if (this.loginForm.invalid) {
      return
    }
    else {
      // sinon si tous les champs sont remplis,
      // Quand le formualire est rempli, appelons la méthode onLogin(), on passe le formulaire
      this.onLogin(this.loginForm.value);
    }
  }





  // On le Désinscrit
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe);

    //Register
    this.subscriptionsRegister.forEach(sub => sub.unsubscribe());
  }



}
