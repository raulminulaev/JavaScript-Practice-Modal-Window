let companies = [
  {id: 1, title: 'Apple', capital: 1.5, img: 'https://cdn.wccftech.com/wp-content/uploads/2013/09/Apple-logo1.jpg'},
  {id: 2, title: 'Google', capital: 1, img: 'https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip'},
  {id: 3, title: 'Xiaomi', capital: 800, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/480px-Xiaomi_logo.svg.png'},
]

const toHTML = company => `
<div class="col">
  <div class="card">
    <img src="${company.img}" class="card-img-top" style="height:340px" alt="${company.title}">
    <div class="card-body">
      <h5 class="card-title">${company.title}</h5>
      <a href="#" class="btn btn-primary" data-btn="capital" data-id="${company.id}">Узнать капитал</a>
      <a href="#" class="btn btn-danger" data-btn="remove" data-id="${company.id}">Удалить</a>
    </div>
  </div>
</div>
`

function render() {
  const html = companies.map(company => toHTML(company)).join('')
  document.querySelector('#companies').innerHTML = html
}

render()

const capitalModal = $.modal({
  title: 'Капитал компании',
  closable: true,
  width: '400px',
  footerButtons: [
    {text: 'Закрыть', type: 'primary', handler() {
      capitalModal.close()
    }}
  ]
})

//метод map создает новый массив с результатом вызова функции(указанной внутри этого метода) для каждого элемента массива.

document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn;
  const id = +event.target.dataset.id;
  const company = companies.find(c => c.id === id)

  if(btnType === 'capital') {
    capitalModal.setContent(`
        <p>Капитал компании ${company.title}: <strong>${company.capital} млн $</strong></p>
      `)
    capitalModal.open()
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Вы уверены?',
      content: `<p>Вы удаляете компанию: <strong>${company.title}</strong></p>`
    }).then(() => {
      companies = companies.filter(c => c.id !== id)
      render()
    }).catch(() => {
      console.log('Cancel');
    })
  }
})

// Т.к then может использоваться в случаях для исполнения и отклонения промиса с результатом value, то мы его используем для выполнения операции.
// Метод catch используем только в случае отклонения обещания, т.е reject
//
