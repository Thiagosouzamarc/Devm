import { Oferta } from './shared/oferta.model';
import { promise } from 'protractor';
import { promised } from 'q';
import { resolveRendererType2 } from '@angular/core/src/view/util';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {URL_API} from './app.api'
import { Observable, from, pipe } from 'rxjs';
import { map, retry } from 'rxjs/operators';


@Injectable()
export class OfertasService{

    //private url_api = 'http://localhost:3000/ofertas'

    constructor(private http: Http){

    }

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: Response) => resposta.json())
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
        .toPromise()
        .then((resposta: Response) => resposta.json())
    }
     
    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
        .toPromise()
        .then((resposta: Response) => resposta.json()[0])
    }

    public getComoUsarOfertaPorId(id: number): Promise<string>{
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
        .toPromise()
        .then((resposta: Response) => {
            return resposta.json()[0].descricao
        })
    }

    public getOndeFicaOfertaPorId(id: number): Promise<string>{
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
        .toPromise()
        .then((resposta: Response) => {
            return resposta.json()[0].descricao
        })
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]>{
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`).pipe(retry(10),
            map((resposta: Response) => resposta.json())
        )
    }
}