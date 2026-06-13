import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storage = inject(StorageService);
  private readonly KEY = 'cine-explorer-tema';
  private temaActual: string;

  constructor() {
    this.temaActual = this.obtenerTemaInicial();
    this.aplicarTema(this.temaActual);
  }

  obtenerTema(): string {
    return this.temaActual;
  }

  cambiarTema(tema: string): void {
    this.temaActual = tema;
    this.aplicarTema(tema);
    this.storage.set(this.KEY, tema);
  }

  toggle(): void {
    const nuevoTema = this.temaActual === 'light' ? 'dark' : 'light';
    this.cambiarTema(nuevoTema);
  }

  private obtenerTemaInicial(): string {
    const guardado = this.storage.get<string | null>(this.KEY, null);
    if (guardado) return guardado;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  private aplicarTema(tema: string): void {
    document.documentElement.setAttribute('data-theme', tema);
  }
}