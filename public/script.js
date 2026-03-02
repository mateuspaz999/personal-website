document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const status = document.getElementById('form-status');
  const btn = this.querySelector('button');
  const formData = new FormData(this);

  btn.textContent = 'Sending...';
  btn.disabled = true;
  status.textContent = '';

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      })
    });

    const data = await res.json();

    if (res.ok) {
      status.textContent = data.message;
      this.reset();
    } else {
      status.textContent = data.error || 'Something went wrong.';
    }
  } catch (err) {
    status.textContent = 'Could not send message. Please try again.';
  }

  btn.textContent = 'Send message';
  btn.disabled = false;
  setTimeout(() => { status.textContent = ''; }, 4000);
});
