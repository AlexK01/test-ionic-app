export class WeatherModel {
    constructor(
    public name: string = "",
    public id: number = 0,
    public coord: Coord = new Coord(),
    public main: Main = new Main(),
    public sys: System = new System(),
    public cloudiness: string = "",
    public wind: number = 0){
    
    }
}

export class Coord {
    constructor(
    public lat: number = 0,
    public lon: number = 0){

    }
}

export class Main {
    constructor(
    public temp: number = 0,
    public pressure: number = 0,
    public humidity: number = 0,
    public temp_min: number = 0,
    public temp_max: number = 0){

    }
}

export class System{
    constructor(
        public country: string = ""
    ){}
}
