import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-plan',
  templateUrl: './trip-plan.component.html',
  styleUrls: ['./trip-plan.component.css']
})
export class TripPlanComponent implements OnInit {

  constructor() { }
  startEnd=[];

  ngOnInit() {
    console.log(this.startEnd)
  }

add(){
  this.startEnd.push({"start":'',"end":''})
}
remove(index){
   this.startEnd.splice(index,1)

}
}
