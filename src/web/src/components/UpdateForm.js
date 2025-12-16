// UpdateForm.js - Form component for submitting weekly updates

export function createUpdateForm(projectId, onSubmit) {
  const form = document.createElement('form');
  form.className = 'update-form card';
  form.innerHTML = `
    <h3>Submit Weekly Update</h3>
    
    <div class="form-group">
      <label for="status">Status *</label>
      <select name="status" id="status" required>
        <option value="">Select status...</option>
        <option value="On Track">On Track</option>
        <option value="At Risk">At Risk</option>
        <option value="Blocked">Blocked</option>
      </select>
    </div>

    <div class="form-group">
      <label for="percent_complete">Progress % *</label>
      <input 
        type="range" 
        name="percent_complete" 
        id="percent_complete" 
        min="0" 
        max="100" 
        value="0" 
        required
      />
      <output id="percent-output">0%</output>
    </div>

    <div class="form-group">
      <label for="blockers">Blockers</label>
      <textarea 
        name="blockers" 
        id="blockers" 
        rows="3" 
        placeholder="Any blocking issues..."
      ></textarea>
    </div>

    <div class="form-group">
      <label for="next_steps">Next Steps</label>
      <textarea 
        name="next_steps" 
        id="next_steps" 
        rows="3" 
        placeholder="What's planned next..."
      ></textarea>
    </div>

    <div class="error-message" style="display: none; color: var(--color-danger); margin: var(--spacing-md) 0;"></div>

    <button type="submit" class="btn btn-primary">Submit Update</button>
  `;

  // Update progress display
  const percentInput = form.querySelector('#percent_complete');
  const percentOutput = form.querySelector('#percent-output');
  percentInput.addEventListener('input', (e) => {
    percentOutput.textContent = `${e.target.value}%`;
  });

  // Handle submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errorDiv = form.querySelector('.error-message');
    errorDiv.style.display = 'none';

    const formData = new FormData(form);
    const data = {
      status: formData.get('status'),
      percent_complete: parseInt(formData.get('percent_complete'), 10),
      blockers: formData.get('blockers') || null,
      next_steps: formData.get('next_steps') || null,
    };

    try {
      await onSubmit(data);
      form.reset();
      percentOutput.textContent = '0%';
    } catch (error) {
      errorDiv.textContent = error.message;
      errorDiv.style.display = 'block';
    }
  });

  return form;
}

export default { createUpdateForm };
