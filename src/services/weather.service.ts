import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherService {

    constructor(private http: HttpClient) {
        
    }
    apiUrl: string = "https://api.openweathermap.org/data/2.5/weather?";

    apiKey: string = "&appid=c3b9f3f392249712182f4b7a619b35fd";
    
    getParametersString(lat: number, lon: number): string{
        return "lat=" + lat + "&lon=" + lon + "&units=metric";
    }

    getCurrentWeather(lat: number, lon: number): Observable<any>{
        let url = this.apiUrl + this.getParametersString(lat, lon) + this.apiKey;

        return this.http.get(url);
    }
}