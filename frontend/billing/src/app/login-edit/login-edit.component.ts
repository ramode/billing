import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login-edit',
  template: `
    <p>
      login-edit works!
    </p>
  `,
  styles: []
})
export class LoginEditComponent implements OnInit {

  constructor(    private api: ApiService) { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-login-list',
  template: `
    <p>
      login-list works!
    </p>
  `,
  styles: []
})
export class LoginListComponent implements OnInit {

  constructor(    private api: ApiService) { }

  ngOnInit() {

    this.api.call('login/list',{}).subscribe(data => {console.log(data)});

  }

}
