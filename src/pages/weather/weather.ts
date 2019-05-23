import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { WeatherService } from '../../services/weather.service';
import { Geolocation } from '@ionic-native/geolocation';
import { WeatherModel } from '../../models/weather.model';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'weather',
  templateUrl: 'weather.html'
})

export class WeatherPage {

  model: WeatherModel;

  noInternet: boolean = false;

  latitude: number = 0;

  longitude: number = 0;

  constructor(private weatherService: WeatherService,
    private geolocation: Geolocation, public loadingController: LoadingController, public network: Network) {
      this.model = new WeatherModel();  
      if(this.checkIfNoInternet()){
        this.noInternet = true;
      }
      else{
        this.noInternet = false;
        this.geolocation.getCurrentPosition().then((response) => {
          console.log(response);
          this.getCurrentWeather(response.coords.latitude, response.coords.longitude);
        })
        .catch((error) => {
          console.log(error);
          //this.getCurrentWeather(0, 0);
        })
      }
  }

  doRefresh(refresher){
    if(this.checkIfNoInternet()){
      this.noInternet = true;
      refresher.complete();
    }
    else{
      this.noInternet = false;
      this.weatherService.getCurrentWeather(this.latitude, this.longitude).subscribe(response => {
        this.model.name = response.name;
        this.model.main = response.main;
        this.model.coord.lat = response.coord.lat;
        this.model.coord.lon = response.coord.lon;
        this.model.sys.country = response.sys.country;
        this.latitude = response.coord.lat;
        this.longitude = response.coord.lon;
        this.model.wind = response.wind.speed;

        if(response.weather && response.weather.length > 0){
          this.model.cloudiness = response.weather[0].description;
        }
        
        refresher.complete();
  
        console.log(this.model);
      },
        error => {
          refresher.complete();
          console.log(error);
        });
    }
   
  }

  getCurrentWeather(lat: number, lon: number) {

    //  let testLat = 50.0368074;
    //  let testLon = 36.2171461;

    const loading = this.loadingController.create({
      content: 'Please wait...'
    });

    loading.present();

    this.weatherService.getCurrentWeather(lat, lon).subscribe(response => {
      this.model.name = response.name;
      this.model.main = response.main;
      this.model.coord.lat = lat;
      this.model.coord.lon = lon;
      this.model.sys.country = response.sys.country;
      this.model.wind = response.wind.speed;
      if(response.weather && response.weather.length > 0){
        this.model.cloudiness = response.weather[0].description;
      }
      this.latitude = lat;
      this.longitude = lon;

      loading.dismiss();
      console.log(this.model);
    },
      error => {
        loading.dismiss();
        console.log(error);
      });
  }

  checkIfNoInternet(){
    return this.network.type === 'none';
  }

}