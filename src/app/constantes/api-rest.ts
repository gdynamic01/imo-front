
export const pointEntries = 'http://localhost:8686/immo/';  // url
export const httpOptions = {
    headers: ({'Content-Type': 'application/json; charset=utf-8', Accept: 'application/json'}),
    withCredentials: true
};
export const API = {
    profInscription: pointEntries + 'inscription/professionnel',  // api inscription user professionnel
    parInscription: pointEntries + 'inscription/particulier', // api inscription user particulier
    auth: pointEntries + 'authentification', // api authentification
    offreCrate: pointEntries + 'creation-offre' // api creation offre
};
