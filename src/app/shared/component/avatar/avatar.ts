import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, Signal, signal } from '@angular/core';
import { Authenticationservice } from '../../services/authenticationservice';
import { userDetails } from '../../interfaces/authResponse.interface';

@Component({
  selector: 'app-avatar',
  imports: [CommonModule],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar {
 

  authService = inject(Authenticationservice);

  currentUser = this.authService.getCurrentUser();

  fullName = computed(() => this.currentUser?.full_name ?? '');
  email = computed(() => this.currentUser?.email ?? '');

  initial = computed(() => {
    const name = this.fullName().trim();
    if (!name) return '??';

    const parts = name.split(' ');
    return parts.length === 1
      ? parts[0][0] + parts[0][parts[0].length - 1]
      : parts[0][0] + parts[parts.length - 1][0];
  });

  isExpanded = input<boolean>();

}
