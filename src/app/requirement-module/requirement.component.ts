import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../_service/http.service';

@Component({
  selector: 'requirement-root',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})

export class RequirementComponent implements OnInit {

  constructor(private _httpService: HttpService){

  }

  ngOnInit(): void {
  }

}
