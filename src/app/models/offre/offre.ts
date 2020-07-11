import { Adresse } from '../adresse';

export class Offre {
  /** titre */
  public titre: string;

  /** Description de l'offre */
  public description: string;

  /** adresse de l'offre */
  public adresse: Adresse;

  /** Prix de l'offre */
  public prix: number;

  /** date publication */
  public createAt: Date;

  /** date mise a jour publication */
  public updateAt: Date;

  /** type d'offre */
  public typeOffre: TypeOffreEnum;

  /** type annonce [Particulier, Professionnel] */
  public typeAnnonce: string;

  /** type service offre [Location, Vente] */
  public typeServiceOffre: TypeServiceEnum;

  /** photos offres */
  public photosOffres: Array<string>;

  /** Symboles monetaires */
  public symboleMonetaire: string;
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
  sanitaire: string;
  type_de_bien: TypeBienImmobilierEnum;
  parking: String;
  nombre_pieces: number;
  piscine: boolean;
  electricite: boolean;
  eau: boolean;
  service_menage: boolean;
  autre_service: String;
  zone_geographique: String
  

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
Immobilier,
Mobile
}

export enum TypeServiceEnum {
  Location,
  Vente
}

export enum TypeBienImmobilierEnum {
  Appartement,
  Studio,
  Villa,
  Maison,
  Salle,
  Terrain


}

export enum TypeSanitaireEnum {
  Exterieur,
  Interieur
}

