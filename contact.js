window.onload = () => {
  window.ContactPage = (function () {
    const nameInput = document.getElementById("name");
    const mobileInput = document.getElementById("mobile");
    const emailInput = document.getElementById("email");
    
     

    // Found this hacky solution for JS email validation at
    // https://emailregex.com/
    // Javascript tho... ¯\_(ツ)_/¯
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //form validation 
    function validate() {
      let canSubmit = true;
      let validationMessage = "";
      let focusElement = null;

      // Check for empty case
      if (emailInput.value === "") {
        validationMessage +=
          "No email provided, please provide your email address! \n";
        focusElement = emailInput;
        canSubmit = false;
      } else if (!emailRegex.test(emailInput.value)) {
        validationMessage += "The email you have provided is invalid. \n";
        focusElement = emailInput;
        canSubmit = false;
      }

      // Check for empty case
      if (mobileInput.value === "") {
        validationMessage += "Please provide your mobile number! \n";
        focusElement = mobileInput;
        canSubmit = false;
      } else {
        // Check correct field type
        
        if (isNaN(mobileInput.value) || mobileInput.value.length !== 10) {
          validationMessage += "Please provide a real mobile number! \n";
          focusElement = mobileInput;
          canSubmit = false;
        }
      }

      // Check for empty case
      if (nameInput.value === "") {
        validationMessage += "Please enter your name \n";
        focusElement = nameInput;
        canSubmit = false;
      }
      //call the confirmDetails function that creates a new modal if details are valid
      if (canSubmit) {
        confirmDetails();
        return;
      }

      createModal([document.createTextNode(validationMessage)], () => {
        if (focusElement) {
          focusElement.focus();
        }
      });
    }

    // After validation passes, we ask user to confirm details in a new modal.
    function confirmDetails() {
      const heading = document.createElement("h2");
      heading.innerText = "Confirm Details";
      
      var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
      var array = [];
      for (var i = 0; i <checkboxes.length; i++) {
        if (checkboxes[i].checked)
        array.push(checkboxes[i].value)
      } 
     
      
      //lists all the details required before submitting
      const details = document.createTextNode(
`
Name: ${nameInput.value}
Mobile Number: ${mobileInput.value}
Email Address: ${emailInput.value}
Do you want to buy, sell or rent?: ${document.querySelector('input[name="buy-sell-rent"]:checked').value} 
Property types: ${array}
How many bedrooms?: ${document.getElementById("bedrooms").value}
Comments: \n${document.getElementById("comments").value}
`)
      
      //confirm button created for the modal
      const confirmButton = document.createElement("button");
      confirmButton.innerText = "Confirm and Submit";
      confirmButton.className = "confirm-modal__confirm-button";

      //cancel button created for modal
      const cancelButton = document.createElement("button");
      cancelButton.innerText = "Cancel";
      cancelButton.className = "confirm-modal__cancel-button";

      const closeModal = createModal([
        heading,
        details,
        confirmButton,
        cancelButton,
      ]);

      cancelButton.onclick = closeModal;

      //function that when all details are correct it gives an alert saying thanks and then submits the form and closes the modal
      confirmButton.onclick = () => {
        closeModal();
        document.getElementById("form3").submit();
        alert("Thank you for submitting your enquiry.")
      };
    }
    /**
     * Takes an html template string or some string content and puts it inside
     * a modal.
     */
    function createModal(htmlContent, onClose) {
      const modal = document.createElement("div");
      modal.className = "modal";

      //creates a text box that displayes the required information to be checked
      const modalContent = document.createElement("div");
      modalContent.className = "modal__content";
      htmlContent.forEach((element) => modalContent.appendChild(element));
      modal.appendChild(modalContent);

      //creates close button in top right corner
      const modalCloseButton = document.createElement("button");
      modalCloseButton.innerText = "x";
      modalCloseButton.className = "modal__close-button";
      modalContent.appendChild(modalCloseButton);

      //function that closes the modal
      function closeModal() {
        // clean up event listeners (GC probably does this fine.)
        modalCloseButton.onclick = undefined;
        // remove self from page.

        if (onClose) {
          onClose();
        }

        document.body.removeChild(modal);
      }

      modalCloseButton.onclick = closeModal;

      document.body.appendChild(modal);

      return closeModal;
    }

    return {
      validate,
    };
  })();
};
