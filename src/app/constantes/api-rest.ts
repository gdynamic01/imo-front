import { HttpHeaders } from '@angular/common/http';

export const pointEntries = 'http://localhost:8686/loumos';  // url
export const httpOptions = {
    headers: new HttpHeaders ({'Content-Type': 'application/json; charset=utf-8', 
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*'}),
    withCredentials: true
};
export const API = {
    profInscription: pointEntries + '/professionnel',  // api inscription user professionnel
    parInscription: pointEntries + '/particulier', // api inscription user particulier
    auth: pointEntries + '/authentification/', // api authentification
    offreUri: pointEntries + '/offre', // api creation offre
    getOffres: pointEntries + '/offres',
    checkEmail: pointEntries + '/email/', // api verification email
    getRoles: pointEntries + '/roles/'
};
