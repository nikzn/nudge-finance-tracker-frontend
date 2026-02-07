import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from "../sidemenu/navbar/navbar";
import { NavbarConfig } from '../../shared/interfaces/navbar.interface';
import { Authenticationservice } from '../../shared/services/authenticationservice';
import { SettingsService } from '../../shared/services/settings-service';
import { Toasterservice } from '../../shared/services/toasterservice';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, Navbar],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings implements OnInit {

  config: NavbarConfig = {
      title: 'Settings',
      subtitle: `Configure your settings.`,
      actions: []
    }

    constructor(private authenticationService:Authenticationservice,private settingService:SettingsService,private toaster:Toasterservice){}

   ngOnInit(): void {
     this.getUserDetails()
   } 

// Profile Information
  fullName:string|unknown=''
  email:string|unknown=""


  getUserDetails(){
    const userData= this.authenticationService.getUserFromStorage()
    this.fullName=userData?.full_name
        this.email =userData?.email
  } 



  
  // Change Password
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  saveProfileChanges() {
    const request ={
      "full_name":this.fullName,
      "email":this.email
    }
   this.settingService.updateName(request).subscribe({
   next:res=>{ this.toaster.success("Updated")
  }})
  }

  updatePassword() {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    console.log('Updating password');
    // Add your password update logic here
    alert('Password updated successfully!');
    
    // Clear password fields
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  triggerFileInput() {
    // Trigger file input for avatar upload
    const fileInput = document.getElementById('avatarUpload') as HTMLInputElement;
    fileInput?.click();
  }

  onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log('Avatar file selected:', file.name);
      // Add your file upload logic here
    }
  }
}
