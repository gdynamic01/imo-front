import { Adresse } from '../adresse';


export class Offre {

	
    /** titre */
    public titre: string;

	/** Description de l'offre */
	public description: string;

	/** adresse de l'offre */
	public adresse: Adresse = new Adresse();

	/** Prix de l'offre */
	public prix: number;

	/** date publication */
	public createAt: Date;

	/** date mise a jour publication */
	public updateAt: Date;

	/** type d'offre */
	public typeOffre: string;

	/** type annonce [Particulier, Professionnel] */
	public typeAnnonce: string;

	/** type service offre [Location, Vente] */
	public typeServiceOffre: string;

	/** photos offres */
	public photosOffres: Array<string>;

	/** Symboles monetaires */
	public symboleMonetaire: string;
}


export class Mobile extends Offre{

	/** moteur*/
	public motoriser: boolean;

	/** Kilometrage */
	public  kilometrage:number;

	/** Nombre de roue */
	public  nbRoue: number;

	/** model */
	public  model:string;

	/** date publication de l'offre */
	public  nbPorte: number;

	/** date mise en circulation du vehicule */
	public dateMiseEnCircualtion: Date;

	/** type_moteur */
	public typeMobileMoteur: string;

	/** batterie*/
	public batterie: string;

	/** duree*/
	public  dureeBaterie: Date;


}


export class Immobilier extends Offre{

    //la surface
    public surface: number;

}



export class Photo {

    public pathPhotos:string;
    
}

export class OffreGlobal{

  
    /** mobileDto */

    public  mobile: Mobile =new Mobile();
    
	/** immobilierDto */
    public  immobilier:Immobilier = new Immobilier();
    
	/** email utilisateur */
	public  email: string;



}