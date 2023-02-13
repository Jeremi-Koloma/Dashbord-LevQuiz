import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {

    console.log("MOn url: " + this.router.url);

    //if(this.route.snapshot)

    var nav = document.querySelector('nav');

    if(this.router.url == "/accueil"){
      window.addEventListener('scroll', function(){
        if (window.pageYOffset > 100) {
  
            nav!.classList.add('bgscrollBar');
            nav!.style.backgroundColor='#000000';
            nav!.style.opacity='0.8'
            
        }else{
            nav!.classList.remove('bgscrollBar');
            nav!.style.backgroundColor='transparent';
        }
    })
    }else{
      var nav = document.querySelector('nav');
      nav!.style.backgroundColor='red';

    }

  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
