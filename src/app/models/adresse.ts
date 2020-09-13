export class Adresse {
  codePostal: number;
  complementAdresse: string;
  libelleRue: string;
  numeroRue: string;
  pays: string;
  ville: string;
}

export class Pays {
  nomPays: string;
  villes: Ville[] = [];
}

export class Ville {
  nomVille: string;
  codePostal: number;
}


