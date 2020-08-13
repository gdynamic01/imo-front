import { Adresse } from '../adresse';

export class Offre {
  titre: string;
  description: string;
  adresse: Adresse = new Adresse();
  prix: number;
  createAt: Date;
  updateAt: Date;
  typeOffre: TypeOffreEnum;
  typeAnnonce: string;
  typeServiceOffre: TypeServiceEnum;
  photosOffres: Array<string>;
  symboleMonetaire: string;
  dateDebut: Date;
  dateFin: Date;
  nombreDeJour: number;
}

export class Mobile extends Offre {
  motoriser: boolean;
  kilometrage: number;
  nbRoue: number;
  model: string;
  nbPorte: number;;
  dateMiseEnCircualtion: Date;
  typeMobileMoteur: TypeMobileMoteurEnum;
  batterie: string;
}

export class Immobilier extends Offre {
  surface: number;
  typeDeBien: TypeBienImmobilierEnum;
  nbrePieces: number;
  piscine: boolean;
  sanitaire: TypeSanitaireEnum;
  eau: boolean;
  autreService: string;
  serviceMenage: boolean;
  zoneGeographique: string;
  parking: boolean;
  electricite: boolean;
}

export class OffreGlobal {
  mobile: Mobile = new Mobile();
  immobilier: Immobilier = new Immobilier();
  email: string;
}

export enum TypeMobileMoteurEnum {
  Electrique,
  Hybride,
  Vapeur,
  Sans_moteur
}

export enum TypeOffreEnum {
  Mobile,
  Immobilier
}

export enum TypeBienImmobilierEnum {
  Appartement,
  Maison,
  Villa,
  Studio,
  Immeuble,
  Bureau,
  Salle,
  Terrain
}

export enum TypeBienMobileEnum {
  Voiture,
  Velo,
  Moto
}

export enum TypeServiceEnum {
  Location,
  Vente
}

export enum TypeSanitaireEnum {
  Exterieur,
  Interieur
}

