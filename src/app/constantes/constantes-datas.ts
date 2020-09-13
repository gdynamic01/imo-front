export const TYPE_SERVICE = ['LOCATION', 'VENTE'];
export const BIEN_IMMOBILIER = ['APPARTEMENT', 'MAISON', 'TERRAIN', 'VILLA', 'STUDIO', 'IMMEUBLE', 'BUREAU', 'SALLE'];
export const BIEN_MOBILE = ['VOITURE', 'VELO', 'MOTO'];
export const PAYS_SANS_ADRESSE_COMPLETE = ['Guinee'];
export const NONAUTHORIZED = 'Vous n\'êtes pas authorisés à acceder à cette resource!';
export const CATEGORIES = [
    {
       group: 'IMMOBILIERS',
       values: [
         {value: 'Appartement'},
         {value: 'Maison'},
         {value: 'Villa'},
         {value: 'Studio'},
         {value: 'Immeuble'},
         {value: 'Bureau'},
         {value: 'Salle'},
         {value: 'Terrain'}
       ]
    },
    {
      group: 'MOBILES',
      values: [
        {value: 'Voiture'},
        {value: 'Velo'},
        {value: 'Moto'}
      ]
    }
];
