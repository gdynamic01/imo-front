export class ImoResponse <T> {
    /** champs obligatoires */
    public champsObligatoires: string[];

    /** message reponse */
    public messageResponse: string;

    /** resultat de la reponse */
    public result: Array<T>;

    /** code http */
    public status: number;

    /** nb element dans list */
    public nbOffre: number;

    /** taille offre particulier */
    public nbOffreParticulier: number;

    /** taille offre professionnel */
    public nbOffreProfessionnel: number;
}
