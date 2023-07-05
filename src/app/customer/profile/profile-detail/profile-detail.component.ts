import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserProfile } from '../models/profile-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: [],
  providers: [ApiService],
})
export class ProfileDetailComponent {
  constructor(private apiService: ApiService) {}

  public userProfile: UserProfile | undefined;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.apiService.getProfileData().subscribe((response) => {
      if (response.success) {
        this.userProfile = response.data;
      }
    });
  }

  formSubmit() {
    if (this.userProfile?.email && this.userProfile.mobile) {
      this.apiService
        .updateUserProfile(this.userProfile!.email, this.userProfile!.mobile)
        .subscribe((response) => {
          if (response.success) {
            this.fetchData()
            Swal.fire('İşlem başarılı', 'Profil Kayıt Edildi', 'success');
          }
        });
    }
  }
}
