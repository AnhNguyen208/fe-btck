import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(
    private router: Router,
  ) { }

  scrollTop() {
    console.log("asdgasdgasd");
    
    // Cuộn lên đầu trang
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Tạo hiệu ứng cuộn mượt
    });
  }

  logout() {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['login']);
    return false;
  }
}