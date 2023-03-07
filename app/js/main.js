let signUp = document.querySelector('.sign-up__submit') // кнопка
let firstName = document.querySelector('.first input') // имя
let lastName = document.querySelector('.last input') // фамилия
let nation = document.querySelector('.nation input') // национальность
let email = document.querySelector('.email input') // email
let password = document.querySelector('.password input') // пароль
let confirm = document.querySelector('.confirm input') // проверка пароля
let inputs = [firstName, lastName, nation, email, password, confirm] // все инпуты
let info = [firstName, lastName, nation] // инпуты без регулярок
let content = document.querySelector('.sign-up__sign') // весь контент
let message = document.querySelector('.message')

let patterns = {
    email: /\w+@\w+\.\w+$/g,
    password: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/g
}
// (?=.* [0 - 9]) - строка содержит хотя бы одно число;
// (?=.* [a - z]) - строка содержит хотя бы одну латинскую букву в нижнем регистре;
// (?=.* [A - Z]) - строка содержит хотя бы одну латинскую букву в верхнем регистре;
// [0 - 9a - zA - Z]{ 8,} - строка состоит не менее, чем из 8 вышеупомянутых символов.

function checkNull() {
    for (let input of inputs) {
        if (input.value == '') {
            input.classList.add('error')
            return false
        }
    }
    return true
} // проверка что инпуты не пусты

email.addEventListener('input', function (e) {
    if (this.value.match(patterns.email)) {
        this.classList.remove('error')
    } else {
        this.classList.add('error')
    }
})

password.addEventListener('input', function (e) {
    if (this.value.match(patterns.password)) {
        this.classList.remove('error')
        this.nextElementSibling.classList.add('disabled')
    } else {
        this.classList.add('error')
        this.nextElementSibling.classList.remove('disabled')
    }
})

confirm.addEventListener('input', function (e) {
    if (this.value == password.value) {
        this.classList.remove('error')
    } else {
        this.classList.add('error')
    }
})

for (let input of info) {
    input.addEventListener('input', function () {
        if (this.value == '') {
            this.classList.add('error')
        } else {
            this.classList.remove('error')
        }
    })
}

let clicked = false
signUp.addEventListener('click', function (e) {
    e.preventDefault()
    if (!clicked) {
        if (checkNull() && !document.querySelector('.error')) {
            content.classList.add('disabled')
            message.classList.remove('disabled')
        } else {
            this.classList.add('animate__shakeX')
            setTimeout(() => {
                this.classList.remove('animate__shakeX')
                clicked = false
            }, 1500)
        }
    }
    clicked = true
})

