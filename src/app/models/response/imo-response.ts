export class ImoResponse <T> {
    /** champs obligatoires */
    public champsObligatoires: string[];

    /** message reponse */
    public messageResponse: string;

    /** resultat de la reponse */
    public result: Array<T>;

    /** code http */
    public statut: number;
}
