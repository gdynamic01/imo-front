
export const pointEntries = 'http://localhost:8686/loumos';  // url
export const httpOptions = {
    headers: ({'Content-Type': 'application/json; charset=utf-8', Accept: 'application/json'}),
    withCredentials: true
};
export const API = {
    profInscription: pointEntries + '/professionnel',  // api inscription user professionnel
    parInscription: pointEntries + '/particulier', // api inscription user particulier
    auth: pointEntries + '/authentification/', // api authentification
    offreUri: pointEntries, // api creation offre
    checkEmail: pointEntries + '/email/' // api verification email
};
