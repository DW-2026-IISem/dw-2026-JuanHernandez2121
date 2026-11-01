import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export abstract class CrudApi<T, P> {
  protected readonly http = inject(HttpClient);
  protected abstract readonly endpoint: string;

  constructor(
    private readonly collectionKey: string,
    private readonly itemKey: string
  ) {}

  list(): Observable<T[]> {
    return this.http
      .get<Record<string, T[]>>(this.endpoint)
      .pipe(map(response => response[this.collectionKey] ?? []));
  }

  get(id: number): Observable<T> {
    return this.http
      .get<Record<string, T>>(`${this.endpoint}/${id}`)
      .pipe(map(response => response[this.itemKey]));
  }

  create(payload: P): Observable<T> {
    return this.http
      .post<Record<string, T>>(this.endpoint, payload)
      .pipe(map(response => response[this.itemKey]));
  }

  update(id: number, payload: Partial<P>): Observable<T> {
    return this.http
      .patch<Record<string, T>>(`${this.endpoint}/${id}`, payload)
      .pipe(map(response => response[this.itemKey]));
  }

  replace(id: number, payload: P): Observable<T> {
    return this.http
      .put<Record<string, T>>(`${this.endpoint}/${id}`, payload)
      .pipe(map(response => response[this.itemKey]));
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}

export abstract class ActivatableCrudApi<T, P> extends CrudApi<T, P> {
  deactivate(id: number): Observable<unknown> {
    return this.http.patch(`${this.endpoint}/${id}/deactivate`, {});
  }
}
