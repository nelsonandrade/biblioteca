class Validator {

    constructor() {
      this.validations = [
        'data-min-length',
        'data-max-length',
        'data-only-letters',
        'data-email-validate',
        'data-required',
        'data-equal',
        'data-password-validate',
      ]
    }
  
    // valider tous les champs
    validate(form) {
  
      // supprimer tous les champs
      let currentValidations = document.querySelectorAll('form .error-validation');
  
      if(currentValidations.length) {
        this.cleanValidations(currentValidations);
      }
  
      // prendre les inputs
      let inputs = form.getElementsByTagName('input');
      // transformar HTMLCollection em arr
      let inputsArray = [...inputs];
  
      // boucle dans les entrées et validation par les attributs trouvés
      inputsArray.forEach(function(input, obj) {
  
        // faire la validation en fonction de l'attribut d'entrée
        for(let i = 0; this.validations.length > i; i++) {
          if(input.getAttribute(this.validations[i]) != null) {
  
            // clear string pour connaitre la méthode
            let method = this.validations[i].replace("data-", "").replace("-", "");
  
            // valeur  input
            let value = input.getAttribute(this.validations[i])
  
            // faire appel à la méthode
            this[method](input,value);
  
          }
        }
  
      }, this);
  
    }
  
    // méthode pour valider si elle a un minimum de caractères
    minlength(input, minValue) {
  
      let inputLength = input.value.length;
  
      let errorMessage = `Le champ doit comporter au moins ${minValue} caractères`;
  
      if(inputLength < minValue) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // méthode pour valider si elle a dépassé le nombre maximum de caractères
    maxlength(input, maxValue) {
  
      let inputLength = input.value.length;
  
      let errorMessage = `Le champ doit comporter moins de ${maxValue} caractères`;
  
      if(inputLength > maxValue) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    //méthode pour valider les chaînes qui ne contiennent que des lettres
    onlyletters(input) {
  
      let re = /^[A-Za-z]+$/;;
  
      let inputValue = input.value;
  
      let errorMessage = `Ce champ n'accepte ni chiffres ni caractères spéciaux`;
  
      if(!re.test(inputValue)) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    //valider e-mail
    emailvalidate(input) {
      let re = /\S+@\S+\.\S+/;
  
      let email = input.value;
  
      let errorMessage = `Entrez une adresse e-mail dans le modèle ---@--.--`;
  
      if(!re.test(email)) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // vérifier si un champ est identique à l'autre
    equal(input, inputName) {
  
      let inputToCompare = document.getElementsByName(inputName)[0];
  
      let errorMessage = `Ce champ doit être le même que le champ ${inputName}`;
  
      if(input.value != inputToCompare.value) {
        this.printMessage(input, errorMessage);
      }
    }
    //méthode pour afficher les entrées nécessaires
    required(input) {
  
      let inputValue = input.value;
  
      if(inputValue === '') {
        let errorMessage = `Ce champ est obligatoire`;
  
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // validation du champ mot de passe
    passwordvalidate(input) {
  
      // changer string en array
      let charArr = input.value.split("");
  
      let uppercases = 0;
      let numbers = 0;
  
      for(let i = 0; charArr.length > i; i++) {
        if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
          uppercases++;
        } else if(!isNaN(parseInt(charArr[i]))) {
          numbers++;
        }
      }
  
      if(uppercases === 0 || numbers === 0) {
        let errorMessage = `Le mot de passe doit être composé d'une majuscule et d'un chiffre`;
  
        this.printMessage(input, errorMessage);
      }
  
    }
  
    // mensage d'erreur
    printMessage(input, msg) {
    
      // verifier erreurs dans input
      let errorsQty = input.parentNode.querySelector('.error-validation');
  
      // afficher erreurs
      if(errorsQty === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);
  
        template.textContent = msg;
    
        let inputParent = input.parentNode;
    
        template.classList.remove('template');
    
        inputParent.appendChild(template);
      }
  
    }
  
    // supprimer toutes les validations pour vérifier à nouveau
    cleanValidations(validations) {
      validations.forEach(el => el.remove());
    }
  
  }
  
  let form = document.getElementById('register-form');
  let submit = document.getElementById('btn-submit');
  
  let validator = new Validator();
  
  // événement d'envoi de formulaire, qui valide les entrées
  submit.addEventListener('click', function(e) {
    e.preventDefault();
  
    validator.validate(form);
  });
  