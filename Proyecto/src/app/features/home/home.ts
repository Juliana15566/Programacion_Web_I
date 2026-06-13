import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { Spinner } from '../../shared/components/spinner/spinner';
import { TmdbService } from '../../core/services/tmdb.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCard, Spinner],
  templateUrl: './home.html'
})
export class Home implements OnInit {
  private tmdbService = inject(TmdbService);
  private favoritesService = inject(FavoritesService);
  private cdr = inject(ChangeDetectorRef);

  peliculas: Movie[] = [];
  cargando: boolean = true;
  error: string = '';

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    this.cargando = true;
    this.error = '';

    this.tmdbService.obtenerPopulares().subscribe({
      next: (response) => {
        this.peliculas = response.results;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar películas:', err);
        this.error = 'No se pudieron cargar las películas. Verifica tu conexión.';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  esFavorita(id: number): boolean {
    return this.favoritesService.esFavorita(id);
  }

  toggleFavorito(movie: Movie): void {
    this.favoritesService.toggle(movie);
  }
}