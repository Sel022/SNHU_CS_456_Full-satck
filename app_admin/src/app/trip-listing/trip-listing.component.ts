import { Component, OnInit } from '@angular/core';
// import { trips } from '../data/trips';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService } from '../services/trip-data.service';
import {Trip} from '../models/trips'
import { Router } from '@angular/router';
@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css',
  providers:[TripDataService]
})
export class TripListingComponent implements OnInit {
  trips!: Trip[];
  message : string = '';
  constructor(
    private tripDataService : TripDataService,
    private router: Router
  ) { }
  public addTrip():void{
    this.router.navigate(['add-trip'])
  }
  private getStuff():void{
    this.tripDataService.getTrip()
    .subscribe({
      next:(value:any)=>{
        this.trips=value;
        if(value.length>0){
          this.message = `There are `+ value.length + `Trips available`
        }else{
          this.message = 'There were no trips retrieve from database'
        }
        console.log(this.message)
      },
      error: (error:any)=>{
        console.log(error)
      }
    })
  }
  ngOnInit(): void {
    this.getStuff()
  }
}
