(function () {
  const data = [
    { key: 'l-gdansk', value: 'Lechia Gdańsk' },
    { key: 'l-warszawa', value: 'Legia Warszawa' },
    { key: 'p-gliwice', value: 'Piast Gliwice' },
    { key: 'j-bialystok', value: 'Jagiellonia Białystok' },
    { key: 'w-krakow', value: 'Wisła Kraków' },
    { key: 'cracovia', value: 'KS Cracovia' },
    { key: 'k-kielce', value: 'Korona Kielce' },
    { key: 'l-poznan', value: 'Lech Poznań' },
    { key: 'p-szczecin', value: 'Pogoń Szczecin' },
    { key: 'a-gdynia', value: 'Arka Gdynia' },
    { key: 'z-lubin', value: 'Zagłębie Lubin' },
    { key: 's-wroclaw', value: 'Śląsk Wrocław' },
    { key: 'w-plock', value: 'Wisła Płock' },
    { key: 'm-legnica', value: 'Miedź Legnica' },
    { key: 'g-zabrze', value: 'Górnik Zabrze' },
    { key: 'z-sosnowiec', value: 'Zagłębie Sosnowiec' }
  ]

  let competitors;

  class Hashmap {
    constructor() {
      this.table = []
      this.total = 0
      this.size = 5
    }
    hashKey(key) {
      key.split('')
      .reduce((a, b) => a + b.charCodeAt(), 0) % this.size
    }
    get(key) {
      const index = this.hashKey(key)
      if (this.table[index] !== undefined) {
        return this.table[index].filter(item => item.key === key)
      } else {
        return null
      }
    }
    set(key, value) {
      const newTeam = { key, value }
      const index = this.hashKey(key, this.size)
      if (this.table[index] !== undefined) {
        if (this.table[index].filter(item => item.key !== key).length) {
          this.table[index].push(newTeam)
          ++this.total
        } else {
          updateTip('This key is already taken!', 'red')
        }
      } else {
        this.table[index] = [newTeam]
        ++this.total
      }
    }
    remove(key) {
      const index = this.hashKey(key, this.size)
      this.table[index] = this.table[index].filter(team => team.key !== key)
      --this.total
    }
    clear() {
      this.table = []
      this.total = 0
    }
  }

  function updateTotal() {
    const counter = document.querySelector('.counter')
    counter.innerHTML = competitors.total
  }

  function updateTip(message, color) {
    const searchTip = document.querySelector('.search__tip')
    searchTip.innerHTML = message
    searchTip.style.color = color
  }

  function handleClearTotal() {
    competitors.clear()
    setTimeout(() => updateTotal(), 0)
  }

  function handleSearchRequest(key) {
    const searchWrapper = document.querySelector('.search__wrapper')
    const team = competitors.get(key)
    if (team.length) {
      const removeTeamBtn = document.createElement('button')
      removeTeamBtn.classList.add('remove__team', 'btn')
      removeTeamBtn.addEventListener('click', function () {
        event.preventDefault()
        handleRemove(key)
      })
      updateTip(`Team: ${team[0].value}`, 'green')
      removeTeamBtn.innerHTML = 'Delete.'
      searchWrapper.appendChild(removeTeamBtn)
    } else {
      updateTip(`Key: '${key}' is not valid.`, 'red')
    }
  }

  function handleRemove(key) {
    competitors.remove(key)
    setTimeout(function () {
      const searchInput = document.querySelector('.search__input')
      const removeTeamBtn = document.querySelector('.remove__team')
      removeTeamBtn.parentNode.removeChild(removeTeamBtn)
      searchInput.value = ''
      updateTip('Team was succesfully deleted.', 'green')
      updateTotal()
    }, 0)
  }

  function sectionCreateToggler() {
    const sectionCreate = document.querySelector('.section-create')
    const sectionCreateActions = document.querySelectorAll('.section-create__action')
    if (sectionCreate.classList.contains('active')) {
      sectionCreate.classList.remove('active')
      setTimeout(() =>
        sectionCreateActions.forEach(input => input.classList.add('hidden'))
        , 300)
    } else {
      sectionCreateActions.forEach(input => input.classList.remove('hidden'))
      setTimeout(() =>
        sectionCreate.classList.add('active')
        , 0)
    }
  }

  function handleAddNew() {
    const newKeyInput = document.querySelector('.new-key')
    const newNameInput = document.querySelector('.new-name')
    if (newNameInput.value && newKeyInput.value) {
      const itemByNewKey = competitors.get(newKeyInput.value)
      if (!itemByNewKey.length) {
        competitors.set(newKeyInput.value, newNameInput.value)
        newNameInput.value = ''
        newKeyInput.value = ''
        updateTip('Team was succesfully added.', 'green')
        setTimeout(() => updateTotal(), 0)
      } else {
        updateTip('This key already exists.', 'red')
      }
    } else {
      updateTip('Complete both fields below.', 'red')
    }
  }

  const loadDataOnInit = new Promise(function (resolve, reject) {
    competitors = new Hashmap()
    data.forEach(function (item) {
      competitors.set(item.key, item.value)
    })
    setTimeout(() => {
      updateTotal()
      resolve()
    }, 0)
  })

  loadDataOnInit.then(function () {
    const spinner = document.querySelector('.spinner')
    const actions = document.querySelector('.actions')
    const totalClearBtn = document.querySelector('.total-clear')
    const searchInput = document.querySelector('.search__input')
    const sectionCreateText = document.querySelector('.section-create__text')
    const sectionCreateBtn = document.querySelector('.section-create__btn')

    searchInput.oninput = function () {
      const key = this.value
      handleSearchRequest(key)
    }
    spinner.style.opacity = 0
    actions.style.display = 'flex'
    totalClearBtn.addEventListener('click', function () {
      event.preventDefault()
      handleClearTotal()
    })
    sectionCreateText.addEventListener('click', function (event) {
      event.preventDefault()
      sectionCreateToggler()
    });
    sectionCreateBtn.addEventListener('click', function (event) {
      event.preventDefault()
      handleAddNew()
    })
    setTimeout(() => {
      spinner.parentNode.removeChild(spinner)
      actions.style.opacity = 1
    }, 300)
  })
})()