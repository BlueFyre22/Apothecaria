
const colorConfig = {
  confirmButtonColor: 'var(--bs-success, #00b894)',
  cancelButtonColor: 'var(--bs-danger, #d63031)',
  background: 'var(--bs-body-bg, #f5f6fa)',
  success: 'var(--bs-success, #00b894)',
  error: 'var(--bs-danger, #d63031)',
  info: 'var(--bs-primary, #0984e3)',
  warning: 'var(--bs-warning, #fdcb6e)',
  default: 'var(--bs-body-bg, #f5f6fa)',
}

export class Pop {
  static createDialog(content) {
    if (typeof document === 'undefined') return null

    const dialog = document.createElement('dialog')
    dialog.innerHTML = content
    dialog.style.background = colorConfig.background
    dialog.classList.add('custom-dialog')
    document.body.appendChild(dialog)
    dialog.showModal()

    dialog.addEventListener('close', () => {
      dialog.remove()
    })

    return dialog
  }

  static success(title, message) {
    this.toast(title ?? 'Success!', message, 'check-bold', { color: 'success' });
  }

  static error(error, title, hint) {
    this.toast(
      title ?? 'Oh No!',
      error?.message
        ? `<div class="dialog-err-msg">${error.message}</div>`
        : 'Something went wrong',
      'alert-decagram',
      {
        footer: hint ?? 'Refresh the page and try again. If the issue persists, please let us know.',
        color: 'danger'
      }
    )
  }


  /**
   * @typedef toastOptions
   * @property {string} [footer] tertiary text to appear in the bottom of the toast
   * @property {number} [timer] Time for toast to dismiss itself
   * @property {string[]} [classesToAdd] array of classes that will be added to the toast. Can be used to customize the toast notification 
   * @property {('primary'|'secondary'|'info'|'warning'|'danger'|'success'|'blue'|'red'|'yellow'|'orange'|'purple'|'pink'|'purple'|'indigo'|'green'|'teal'|'light'|'dark'|'cyan'|'gray'|'black')} [color] color based off the bootstrap extended colors
   * 
   * @param {string} title 
   * @param {string} text 
   * @param {string} icon mdi icon without including the 'mdi-'
   * @param {toastOptions} [options] 
   * @returns {HTMLElement} the toast element draw to page
   */
  static toast(title = 'Toast is ready', text = '', icon = 'information', options = {}) {
    let { footer = '', color = '', timer = 5000, classesToAdd = [] } = options
    if (typeof document === 'undefined') return null
    if (color) color = 'bg-' + color
    const toast = document.createElement('div')
    toast.setAttribute('role', 'alert')
    toast.classList.add('custom-toast', 'border-0', 'text-' + color, 'toast', 'show', color || undefined)
    if (classesToAdd) classesToAdd.forEach(c => toast.classList.add(c))
    toast.setAttribute('style', '--bs-bg-opacity: .4;')

    if (title && text) {
      toast.innerHTML = `
      <div class="toast-header text-${color}" ${color ? `style="--bs-bg-opacity: .8;"` : ''}>
        <i class="mdi mdi-${icon} me-2"></i>
        <b>${title}</b>
        <button type="button" class="btn-close ms-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body" >
        <div>${text}</div>
        ${footer ? `<hr class="my-1"/><small class="text-body-secondary">${footer}</small>` : ''}
      </div>
    `
    } else {
      toast.setAttribute('style', '--bs-bg-opacity: 1;')
      toast.innerHTML = `
      <div class="toast-body d-flex">
        <span>
          <i class="mdi mdi-${icon} me-2"></i><span>${title}</span>
        </span>
        <button type="button" class="btn-close ms-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      `
    }

    const toastContainer = document.getElementById('pop-toast-container') ?? this.createToastContainer()
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove()
    }, timer);
    return toast
  }


  static async confirm(title = 'Are you sure?', text = '', confirmText = 'yes', cancelText = 'no') {
    return new Promise((resolve) => {
      const dialog = this.createDialog(`
        <div class="dialog-body">
          <h2>${title}</h2>
          <hr/>
          <p>${text}</p>
          <div class="dialog-buttons d-flex gap-3">
            <button id="cancel-button" class="btn w-100" > ${cancelText} </button>
            <button id="confirm-button" class="btn btn-primary w-100" > ${confirmText} </button>
          </div>
        </div>
      `);

      dialog.querySelector('#confirm-button').addEventListener('click', () => {
        resolve(true);
        dialog.close();
      });

      dialog.querySelector('#cancel-button').addEventListener('click', () => {
        resolve(false);
        dialog.close();
      });
    });
  }

  /**
   * @typedef promptOptions
   * @property  {number} [min] minimum number
   * @property  {number} [max] maximum number
   * @property  {number} [minLength] min string length
   * @property  {number} [maxLength] max string length
   * @property  {number} [step] step amount for range
   * @property  {number} [required] is this required to submit prompt
   * @property  {*} [placeholder] placeholder for input
   * @property  {*} [value] starting value for input
   * @property  {boolean} [showValue] draw the value of the input above it
   * @property  {string} [confirmText] text to appear in confirm button
   * @property  {string} [cancelText] text to appear in cancel button
   * @property  {boolean} [parseType] will the prompt attempt to parse the input into a more JS friendly type
   * 
   * @param {('number'|'text'| 'color'|'checkbox'|'range'|'date'|'datetime-local'|'radio'|'file'|'url'|'password')} type input type for prompt  
   * @param {string} title 
   * @param {string} text 
   * @param {promptOptions} options 
   * @returns {Promise} promise fulfilled with the value of the input or null after prompt is submitted
   */
  static async prompt(type = 'text', title = 'Please Enter a value', text = '', options = {}) {
    let inputClass =
      type == 'checkbox' ? 'form-check-input' :
        type == 'radio' ? 'form-check-input' :
          type == 'range' ? 'form-range' :
            type == 'color' ? 'form-control form-control-color' :
              'form-control'

    const { min, minLength, max, maxLength, step, required = true, showValue = true, confirmText = 'submit', cancelText = 'cancel', parseType = true, placeholder, value } = options
    return new Promise((resolve) => {
      const dialog = this.createDialog(`
        <div class="dialog-body d-flex flex-column gap-2">
          <h2>${title}</h2>
          <hr/>
          ${text ? `<p>${text}</p>` : ''}
          <form id="pop-prompt-form">
          ${showValue ? `<label class="form-label text-center w-100 fw-bold" id="pop-prompt-value">...</label>` : ''}
            <input id="pop-prompt-input" class="${inputClass}" type="${type}" 
            ${value ? `value="${value}"` : ''} 
            ${placeholder ? `placeholder="${placeholder}"` : ''} 
            ${min ? `min="${min}"` : ''} 
            ${max ? `max="${max}"` : ''} 
            ${minLength ? `minLength="${minLength}"` : ''} 
            ${maxLength ? `maxLength="${maxLength}"` : ''} 
            ${step ? `step="${step}"` : ''} 
            ${required ? `required` : ''} />
          </form >
        <div class="dialog-buttons d-flex">
          <button type="button" id="cancel-button" class="btn w-100" > ${cancelText} </button>
          <button disabled type="submit" id="confirm-button" form="pop-prompt-form" class="btn btn-primary w-100" > ${confirmText} </button>
        </div>
        </div >
        `);
      const dialogLabel = dialog.querySelector('#pop-prompt-value')
      const dialogInput = dialog.querySelector('#pop-prompt-input')
      const confirmButton = dialog.querySelector('#confirm-button')
      dialogInput.addEventListener('input', () => {
        // @ts-ignore
        if (dialogInput.checkValidity()) confirmButton.removeAttribute('disabled')
        else confirmButton.setAttribute('disabled', 'true')
        // @ts-ignore
        if (showValue) dialogLabel.textContent = dialogInput.value
      })
      dialog.querySelector('#pop-prompt-form').addEventListener('submit', (e) => {
        e.preventDefault()
        // @ts-ignore
        let input = document.getElementById('pop-prompt-input').value
        if (parseType) resolve(_tryParseInput(input, type))
        resolve(_tryParseInput(input, type))
        dialog.close();
      });

      dialog.querySelector('#cancel-button').addEventListener('click', () => {
        resolve(null)
        dialog.close()
      });
    });

  }

  static createToastContainer() {
    const container = document.createElement('div')
    container.id = 'pop-toast-container'
    document.body.appendChild(container)
    return container
  }
}


function _tryParseInput(value, type) {
  switch (type) {
    case 'range':
    case 'number': return parseFloat(value)
    case 'checkbox': return value == 'on' ? true : false
    case 'datetime-local':
    case 'date': return new Date(value)
    default: return value
  }
}
