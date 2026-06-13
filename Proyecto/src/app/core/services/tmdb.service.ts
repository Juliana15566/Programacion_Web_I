import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, MovieResponse, MovieDetail, Credits, Genre } from '../models/movie';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private http = inject(HttpClient);
  private apiUrl = environment.tmdbBaseUrl;
  private apiKey = environment.tmdbApiKey;

  obtenerPopulares(page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}/movie/popular`,
      {
        params: {
          api_key: this.apiKey,
          language: 'es-ES',
          page: page.toString()
        }
      }
    );
  }

  obtenerTopRated(page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}/movie/top_rated`,
      {
        params: { api_key: this.apiKey, language: 'es-ES', page: page.toString() }
      }
    );
  }

  obtenerDetalle(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(
      `${this.apiUrl}/movie/${id}`,
      {
        params: { api_key: this.apiKey, language: 'es-ES' }
      }
    );
  }

  buscar(query: string, page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}/search/movie`,
      {
        params: {
          api_key: this.apiKey,
          query: query,
          language: 'es-ES',
          page: page.toString()
        }
      }
    );
  }

  obtenerCreditos(id: number): Observable<Credits> {
    return this.http.get<Credits>(
      `${this.apiUrl}/movie/${id}/credits`,
      {
        params: { api_key: this.apiKey }
      }
    );
  }

  obtenerGeneros(): Observable<{ genres: Genre[] }> {
    return this.http.get<{ genres: Genre[] }>(
      `${this.apiUrl}/genre/movie/list`,
      {
        params: { api_key: this.apiKey, language: 'es-ES' }
      }
    );
  }
}