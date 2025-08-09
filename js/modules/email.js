export function initEmailJS(config) {
  emailjs.init({ publicKey: config.publicKey });
}

export function handleContactFormSubmit(e, config, elements) {
  e.preventDefault();
  elements.btnText.classList.add("hidden");
  elements.btnLoading.classList.remove("hidden");
  elements.submitBtn.disabled = true;

  const templateParams = {
    to_name: config.toName,
    to_email: config.toEmail,
    from_name: elements.contactForm.name.value,
    from_email: elements.contactForm.email.value,
    reply_to: elements.contactForm.email.value,
    message: elements.contactForm.message.value,
    subject: elements.contactForm.subject.value,
  };

  emailjs
    .send(config.serviceID, config.templateID, templateParams)
    .then(() => {
      elements.formMessage.innerHTML =
        '<div class="p-4 bg-green-100 border border-green-400 text-green-700 rounded"><i class="fas fa-check-circle mr-2"></i>Message sent successfully!</div>';
      elements.contactForm.reset();
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      elements.formMessage.innerHTML = `<div class="p-4 bg-red-100 border border-red-400 text-red-700 rounded"><i class="fas fa-exclamation-circle mr-2"></i>${
        error.text || "Unable to send message."
      }</div>`;
    })
    .finally(() => {
      elements.formMessage.classList.remove("hidden");
      elements.btnText.classList.remove("hidden");
      elements.btnLoading.classList.add("hidden");
      elements.submitBtn.disabled = false;
      setTimeout(() => elements.formMessage.classList.add("hidden"), 5000);
    });
}
