const forms = () => {
  const formPopup = document.querySelector(".popup--request");
  const form = document.querySelector('form');
  const inputs = form.querySelectorAll('input');
  let formData = new FormData(form);

  // Ответы для пользователя
  const answers = {
    loading: 'Загрузка...',
    success: 'Спасибо! Мы ответим Вам в течении 5 минут',
    fail: 'Извините! Что-то пошло не так...',
  };

  // Очистка полей формы после отправки
  const clearFields = () => {
    inputs.forEach((input) => {
      input.value = '';
    });
  };

  //Функция отправки запроса
  function request(event) {
    event.preventDefault();

    //Создаем блок ответа
    let answerBlock = document.createElement("p");
    answerBlock.classList.add('answer');
    answerBlock.textContent = answers.loading;
    form.appendChild(answerBlock);

    pushResources("./server.php", formData)
    // Успешное выполнение
        .then(response => {
          console.log(response);
          answerBlock.textContent = answers.success;
        })
        // Обработка ошибки
        .catch(err => {
          console.error(err);
          answerBlock.textContent = answers.fail;
        })
        .finally(() => {
          clearFields();
          setTimeout(() => {
            answerBlock.remove();
            formPopup.classList.remove('show');
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px';
          }, 3000);
        })
  }

  async function pushResources(url, data) {
    const result = await fetch(`${url}`, {
      method: "POST",
      body: data
    });

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }
    return await result.text();
  }

  form.addEventListener('submit', request);
};

export default forms;