import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DataState } from '../models/DataState';
import { Olympic } from '../models/Olympic';
import { OlympicSummary } from '../models/OlympicSummary';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<DataState<Olympic[]>>({
    loading: true,
    error: null,
    data: null
  });

  constructor(private http: HttpClient) { }

  loadInitialData(): Observable<Olympic[] | null> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => {
        this.olympics$.next({
          loading: false,
          error: null,
          data: value
        })
      }),
      catchError((error) => {
        this.olympics$.next({
          loading: false,
          error: this.formatError(error),
          data: null
        });

        return of(null);
      })
    );
  }

  getOlympics(): Observable<DataState<Olympic[]>> {
    return this.olympics$.asObservable();
  }

  private formatError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return `Erreur côté client : ${error.error.message}`;
    } else {
      return `Erreur côté serveur ${error.status}: ${error.message}`;
    }
  }

  getOlympicByCountry(country: string): Observable<DataState<OlympicSummary | null>> {
    return this.olympics$.pipe(
      map(state => {
        if (!state.data) {
          return {
            loading: state.loading,
            error: state.error,
            data: null
          };
        }

        const olympic = state.data.find(o => o.country === country) || null;

        if (!olympic) {
          return {
            loading: state.loading,
            error: "No data was found for this country. Please return to the homepage.",
            data: null
          };
        }

        const nbEntries: number = olympic.participations.length;
        const totalNbMedals: number = olympic.participations.reduce((sum, p) => sum + p.medalsCount, 0);
        const totalNbAthletes: number = olympic.participations.reduce((sum, p) => sum + p.athleteCount, 0);

        const summary: OlympicSummary = {
          ...olympic,
          nbEntries,
          totalNbMedals,
          totalNbAthletes
        };

        return {
          loading: state.loading,
          error: state.error,
          data: summary
        };
      })
    );
  }

}
