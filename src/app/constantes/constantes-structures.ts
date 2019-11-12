// Champs form connexion
export const CHAMPS_FORM_CONNEXION = [
  {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      minlength: 8
    }
  },
  // customisation des messages d'erreurs
  {
    email: {
      required: 'Champ obligatoire'
    },
    password: {
      required: 'Champ obligatoire',
      minlength: 'Il faut au minimum 8 caractères'
    },
  }
];

// Champs form inscription
export const CHAMPS_FORM_INSCRIPTION = [
    // champs formulaires obligatoires
    {
      sexe: {
        required: true
      },
      type_user: {
        required: true
      },
      nom: {
        required: true
      },
      prenom: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 8
      },
      siret: {
        required: true
      }
    },
    // customisation des messages d'erreurs
    {
      sexe: 'Champ obligatoire',
      type_user: 'Champ obligatoire',
      nom: 'Champ obligatoire',
      prenom: 'Champ obligatoire',
      email: {
        required: 'Champ obligatoire'
      },
      password: {
        required: 'Champ obligatoire',
        minlength: 'Il faut au minimum 8 caractères'
      },
      siret: 'Champ obligatoire '
    }]