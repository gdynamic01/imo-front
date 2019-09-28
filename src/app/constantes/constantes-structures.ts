// Champs form inscription
export const CHAMPS_FORM_INSCRIPTION = [
    // champs formulaires obligatoires
    {
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
        siret: {
          required: 'Champ obligatoire '
        }
    }]