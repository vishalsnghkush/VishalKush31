const contactEndpoint = "https://formspree.io/f/meaavkyo";

export function contactFormMarkup() {
  return `
    <div class="contact-compose">
      <div class="contact-form-intro"><span class="contact-eyebrow">A CONVERSATION STARTS HERE</span><h3>What's on your mind?</h3><p>Have a project in mind, a question, or just want to say hello? Leave me a note.</p></div>
      <form id="contact-form" action="${contactEndpoint}" method="POST" aria-label="Send Vishal a message">
        <input type="hidden" name="_subject" value="New message from your portfolio">

        <div class="contact-honeypot" aria-hidden="true"><label for="contact-website">Leave this field empty</label><input id="contact-website" name="_gotcha" type="text" tabindex="-1" autocomplete="off"></div>
        <div class="contact-form-row">
          <div class="contact-field"><label for="contact-name">Your name</label><input id="contact-name" name="name" type="text" autocomplete="name" placeholder="What should I call you?" required maxlength="100"></div>
          <div class="contact-field"><label for="contact-email">Email address</label><input id="contact-email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required maxlength="254"></div>
        </div>
        <div class="contact-field"><label for="contact-message">Your message</label><textarea id="contact-message" name="message" rows="5" placeholder="Tell me a little about it…" required minlength="10" maxlength="5000"></textarea></div>
        <p class="contact-form-privacy">Your name, email, and message are sent via <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">Formspree</a> to my inbox. Please don't include sensitive information.</p>
        <button class="button button-dark contact-submit" type="submit">Send message <span aria-hidden="true">↗</span></button>
        <p id="contact-form-status" role="status" aria-live="polite" aria-atomic="true"></p>
      </form>
    </div>`;
}

export function setupContactForm() {
  const form = document.querySelector("#contact-form");
  const button = form.querySelector("button[type='submit']");
  const status = document.querySelector("#contact-form-status");
  let submitting = false;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitting || !form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    if (data._gotcha) return;
    if (!data.name.trim() || data.message.trim().length < 10) {
      status.textContent = "Please enter your name and a message of at least 10 characters.";
      status.dataset.state = "error";
      return;
    }
    submitting = true;
    button.disabled = true;
    button.textContent = "Sending…";
    form.setAttribute("aria-busy", "true");
    status.textContent = "Sending your message…";
    delete status.dataset.state;
    let failureDetail = "";
    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        failureDetail = Array.isArray(result?.errors)
          ? result.errors.map(error => error.message).filter(message => typeof message === "string").join(" ")
          : "";
        if (!failureDetail) failureDetail = `Form service returned HTTP ${response.status}.`;
        throw new Error("Submission failed");
      }
      status.textContent = "Message submitted — thank you for reaching out!";
      status.dataset.state = "success";
      form.reset();
    } catch {
      status.textContent = "Couldn't send your message. " +
        (failureDetail ? failureDetail + " " : "Check your connection or try again shortly. ") +
        "Your text is still here — please try again, or use the email link below.";
      status.dataset.state = "error";
    } finally {
      submitting = false;
      button.disabled = false;
      button.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
      form.removeAttribute("aria-busy");
    }
  });
}
