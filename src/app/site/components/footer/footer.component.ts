import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  templateUrl: './footer.component.html',
  styles: ['.footer{position:fixed;bottom:0px;width:100%}']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}