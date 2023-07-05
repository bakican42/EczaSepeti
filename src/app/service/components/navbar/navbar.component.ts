import { Component, OnInit } from '@angular/core';
// import { TranslationService } from 'src/app/services/translation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-service-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {

  public profile: boolean = false
  public showDrawer: boolean = false
  public showChat: boolean = false
  public showLog: boolean = false
  public notification: boolean = false
  public search: boolean = false
  public drawerTitle: string = "Servis"

  constructor(
    // private translate: TranslationService,
    public userService: UserService
  ) { }

  ngOnInit(): void { }

  changeLang(lang: string) {
    // this.translate.setLanguage(lang)
  }

  toggleDrawer() {
    this.drawerTitle = "Çekmece"
    this.showChat = this.showLog = false
    this.showDrawer = false
  }

  chatToggle() {
    this.drawerTitle = "Chat"
    this.showChat = !this.showChat
    this.showDrawer = true
  }

  logToggle() {
    this.drawerTitle = "Log"
    this.showLog = !this.showLog
    this.showDrawer = true
  }

  profileToggle() {
    this.profile = !this.profile
  }

  profileOutside() {
    this.profile = false
  }

  notificationToggle() {
    this.notification = !this.notification
  }

  notificationOutside() {
    this.notification = false
  }

  searchToggle() {
    this.search = !this.search
  }

  searchOutside() {
    this.search = false
  }

}
