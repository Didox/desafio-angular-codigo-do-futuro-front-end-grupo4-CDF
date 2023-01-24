import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeocoderResponse } from '../models/geocoder-response';

import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  constructor(private http: HttpClient) {}


 public async getLocationPromise(term: string): Promise<GeocoderResponse> {
    const url = `https://maps.google.com/maps/api/geocode/json?address=${term}&sensor=false&key=${environment.googleApiKey}`;
    const responseApi:GeocoderResponse = await firstValueFrom(this.http.get<GeocoderResponse>(url))
    return responseApi;
  }
}