import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = "Moo's Currency Converter";

  mxn: number;
  usd: number;
  crc: number;

  mxnInput: number;
  usdInput: number;
  crcInput: number;

  // http://apilayer.net/api/live?access_key=9effac8a25c6fc6740c7f27838acdf45&currencies=CRC,MXN&source=USD&format=1
  accessKey = "9effac8a25c6fc6740c7f27838acdf45";
  apiUrl = "http://apilayer.net/api/live";

  constructor(private http: HttpClient) {}

  // Init
  ngOnInit() : void {
    this.getInfo("USD", "CRC,MXN");
  }

  // Http request function
  getInfo(source: String, currencies: String) : void {

    var url = this.apiUrl 
      + "?access_key=" + this.accessKey
      + "&source" + source
      + "&format=1"
      + "&currencies=" + currencies;

    var request = this.http.get(url, { responseType: 'json' });
    
    request.subscribe(
      (data) => {
        this.usd = 1;
        this.crc = data["quotes"]["USDCRC"];
        this.mxn = data["quotes"]["USDMXN"];

        this.timer();
      }
    );
  }

  // Function to handle UI actions
  resetFields() : void {
    this.usdInput = 0;
    this.crcInput = 0;
    this.mxnInput = 0;
  }

  calculateFromUSD() : void {
    
    //if (this.usdInput == null) {
    //  this.resetFields();
    //}

    this.crcInput = (this.crc * this.usdInput);
    this.mxnInput = (this.mxn * this.usdInput);
  }

  calculateFromCRC() : void {
    
    //if (this.crcInput == null) {
    //  this.resetFields();
    //}

    this.usdInput = (this.crcInput / this.crc);
    this.mxnInput = (this.mxn * this.usdInput);
  }

  calculateFromMXN() : void {
    
    //if (this.mxnInput == null) {
    //  this.resetFields();
    //}
    
    this.usdInput = (this.mxnInput / this.mxn);
    this.crcInput = (this.crc * this.usdInput);
  }

  // timer for refreshing currency data
  timer() : void {
    setTimeout(
      () => {
        this.getInfo("USD", "CRC,MXN");
    }, 60000);
  }

}
