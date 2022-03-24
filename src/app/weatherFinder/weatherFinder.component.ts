import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CityWeather {
  name: string;
  weather: string;
  status: string[];
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: CityWeather[];
}

@Component({
  selector: 'weather-finder',
  templateUrl: './weatherFinder.component.html',
  styleUrls: ['./weatherFinder.component.scss']
})
export class WeatherFinder implements OnInit {

  weather_details_link: string = 'https://jsonmock.hackerrank.com/api/weather?name=';
  cityDetails: CityWeather;
  showNoResult: Boolean = false;
  temperature: any; 

  constructor(private http:HttpClient){

  }

  ngOnInit(): void {
    
  }

  cityChange(value:string){

    if(value){
      this.http.get<any>(this.weather_details_link + value).subscribe((res:ApiResponse) =>
      { 
       if(res.data.length > 0){
         this.cityDetails = res.data[0];
         this.temperature = parseFloat(this.cityDetails.weather.split(" ")[0])
         this.showNoResult = false;
        }else{
          this.cityDetails = null;
          this.temperature = null;
          this.showNoResult = true;
        }
      });
      
    }else{
      this.showNoResult = false
    }
    
  }


}
