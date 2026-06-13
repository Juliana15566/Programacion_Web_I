import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieCard } from '../../shared/components/movie-card/movie-card'
import { FavoritesService } from '../../core/services/favorites.service';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MovieCard, RouterLink],
  templateUrl: './favorites.html'
})
export class Favorites {
  private favoritesService = inject(FavoritesService);

  get favoritas(): Movie[] {
    return this.favoritesService.obtenerTodas();
  }

  toggleFavorito(movie: Movie): void {
    this.favoritesService.toggle(movie);
  }
}