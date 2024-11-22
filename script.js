/* СЛАЙДЕР */

let CurrentSlide= 0;
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider__slide');
const radioButtons = document.querySelectorAll('.slider__buttons')

// Смена слайда и перерасчет текущего слайда при его переключении колесом мыши
function ChangeCurrentSlide (direction) {
    CurrentSlide = (CurrentSlide + direction + slides.length) % slides.length;
    UpdateSlide();
    UpdateRadioButtons();
}

// Обновление слайда путем применения css transform для смещения по оси X
function UpdateSlide () {
    let translateX = -CurrentSlide * 324 + 'px';
    slider.style.transform = 'translateX(' + translateX + ')'

}

// Переключение макркера радиокнопки при смене слайда
function UpdateRadioButtons () {
    radioButtons.forEach((radio, index) => {
        radio.checked = CurrentSlide === index;
    })
}

// Обработчик события для смены слайда прокруткой колеса
slider.addEventListener('wheel', (event) => {
    event.preventDefault();
    if (event.deltaY > 0) {
        ChangeCurrentSlide(1);
    } else {
        ChangeCurrentSlide(-1)
    }
})

//Обработчик события по смене слайда по нажатию на радиокнопку
radioButtons.forEach ((radio, index) => {
    radio.addEventListener('change', () => {
        CurrentSlide = index;
        UpdateSlide();
    })
}
)



/* POPUP окно */

const popupCloseButton = document.querySelector('.popup__close')
const popupOpenButton = document.querySelectorAll('.popup__open')
const popup = document.querySelector('.popup')
const popupInner = document.querySelector('.popup__inner')

// Обработчик события для кнопки открытия popup окна
popupOpenButton.forEach((button) => {
    button.addEventListener('click', () => {
        popup.classList.add('active');
        popupInner.classList.add('active');
    })
})

// Обработчик события для кнопки закрытия popup окна
popupCloseButton.addEventListener('click', () => {
    popup.classList.remove('active');
    popupInner.classList.remove('active');
})


// Обработчик события для закрытия popup окна нажатием на фон
document.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.classList.remove('active');
        popupInner.classList.remove('active');
    }
})




/* ЧАТ */

massages = [
    {from: 'user', to: 'admin', message: 'user user user'},
    {from: 'admin', to: 'user', message: 'admin admin admin'}
]

// Отправка сообщения от имени пользователя
function SendUserMessage() {
    const message = document.querySelector('.user-input').value
    massages.push(
        {
            from: 'user',
            to: 'admin',
            message
        }
        )
    AddMessage('admin', 'user', message);
    AddMessage('admin', 'admin', message);

    document.querySelector('.user-input').value = ''
}

// Отправка сообщения от имени администратора
function SendAdminMessage() {
    const message = document.querySelector('.admin-input').value
    massages.push(
        {
            from: 'admin',
            to: 'user',
            message
        }
    )

    AddMessage('user', 'admin', message);
    AddMessage('user', 'user', message);

    document.querySelector('.admin-input').value = ''
}

// Добавление сообщения в HTML разметку
function AddMessage (from, to, message) {
    const messageElement = document.createElement('div');
    messageElement.className = `chat__message message message-from__${from}`;
    messageElement.innerHTML =
                        `<img src="images/avatars/${from}.png" alt="" class="message__avatar">
                        <div class="message__text-block ">
                            <div class="message__text">
                                ${message}
                            </div>
                            <div class="message__time">
                                Вчера в 17:45
                            </div>
                        </div>`;

    console.log(messageElement.innerHTML);
    document.getElementById(`${to}-chat`).appendChild(messageElement);
    document.getElementById(`${to}-chat`).scrollTop = document.getElementById(`${to}-chat`).scrollHeight
}

