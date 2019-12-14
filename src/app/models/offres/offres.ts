import { Adresse } from '../adresse';

export class Offres {
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