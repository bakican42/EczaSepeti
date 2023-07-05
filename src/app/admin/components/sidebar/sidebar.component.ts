import { Component, OnInit } from '@angular/core';
// import { SIDEBAR, Sidebar } from 'src/app/graphql/sidebar.graphql';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
  providers: []
})
export class SidebarComponent implements OnInit {

//   public sidebar: Sidebar[] | undefined;

  constructor(
    // private getSidebar: SIDEBAR,
    public userService: UserService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.setSidebar()
    // }, 1000)
  }

//   setSidebar() {
//     this.getSidebar.fetch({
//       "where": {
//         "_and": [
//           { "link": { "_is_null": false } },
//           { "link": { "_neq": "" } },
//           { "parent_id": { "_is_null": true } },
//           { "active": { "_eq": true } },
//           { "owner": { "_eq": "admin" } },
//           {
//             "permission_profile_menus": {
//               "permission_profile_id": { "_eq": this.userService.get.permission_profile_id },
//               "active": { "_eq": true }
//             }
//           }
//         ]
//       },
//       "children": {
//         "_and": [
//           { "link": { "_is_null": false } },
//           { "link": { "_neq": "" } },
//           { "active": { "_eq": true } },
//           { "owner": { "_eq": "admin" } },
//           {
//             "permission_profile_menus": {
//               "permission_profile_id": { "_eq": this.userService.get.permission_profile_id },
//               "active": { "_eq": true }
//             }
//           }
//         ]
//       }
//     }, { fetchPolicy: 'no-cache' }).subscribe(result => {
//       if (result.data) {
//         this.sidebar = result.data.sidebar
//       }
//     })
//   }

  toggle($event: any) {
    const accList = document.getElementsByClassName('menu-accordion');
    if (!$event.currentTarget.classList.contains('show')) {
      if (accList.length > 0) {
        for (let i = 0; i < accList.length; i++) {
          accList[i].classList.remove('show')
        }
      }
      $event.currentTarget.classList.add('show')
    } else {
      $event.currentTarget.classList.remove('show')
    }
  }

  shrink() {
    this.userService.get.sidebarShrink = !this.userService.get.sidebarShrink
  }

}