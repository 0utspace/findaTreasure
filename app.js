// Давайте опробуем полученные знания
// в деле и напишем игру! Цель игры — найти
// клад. Веб-страница будет отображать карту,
//     на которой программа случайным образом выбирает точку, где спрятаны сокровища. Каждый раз, когда игрок кликает
// по карте, программа сообщает, насколько
// он близок к кладу. При клике по точке с кладом (или очень близко к ней) игра выводит поздравление и сообщает, сколько
// кликов ушло на поиски. На рис. 11.1
// показан экран игры после того, как игрок
// кликнул по карте.

// Проектирование игры
// Перед тем как писать код, давайте разберем общую структуру этой игры. Вот список задач, которые нужно выполнить для
// того, чтобы игра адекватно реагировала
// на клики по карте.
// 1. Создать страницу игры с картинкой (картой сокровищ) и местом, куда будут выводиться сообщения для игрока.
// 2. Выбрать на карте случайную точку, где спрятан клад.
// 3. Создать обработчик кликов. Каждый раз, когда игрок кликает по карте, обработчик кликов должен:
// • Увеличить счетчик кликов на 1.
// • Вычислить, насколько далеко место клика от места, где спрятан клад.
// • Отобразить на странице сообщение для игрока — «горячо» или «холодно».
// • Поздравить игрока, если он кликнул по кладу или вблизи него, и сообщить, сколько кликов ушло на поиски.

//ми створили елемент img та помістили в нього картинку з картою
//створили параграф, куди будем поміщати повідомлення з підказками
//створили заголовок з назвою гри

//тепер створимо функцію, яка буде повертати рандомне число в рамках розміру карти - до 400 пікселів (не включно)
let randomNumber = function (size) {
    return Math.floor(Math.random() * size)
};

//тепер створимо 2 змінних, що будуть означати висоту та ширину карти
let width = 800;
let height = 800;

//тепер створимо об'єкт "клад", який буде мати 2 ключа - вісь Х та вісь У, в які будуть генеруватись рандомні значення
// за допомогою функції randomNumber
let target = {
    x: randomNumber(width),
    y: randomNumber(height)
}
//при кожному запуску програми ці значення будуть різними - клад генерується в рандомне місце.

//для того, щоб рахувати к-сть кліків, створимо змінну clicks із значенням 0. Вона буде збільшуватись на 1 при кожній
// спробі знайти клад
let clicks = 0;

//створю змінну, яка буде означати к-сть кліків, які залишились (к-сть спроб). Вони будуть відніматись і виводитись в
// параграв к-сть спроб, які залишились
let takesLeft = 20

//створимо відслідковувач кліків по карті, який буде запускати всі подальші вкладені функції
// $("#map").click(function (action) {
//
// })

//створимо функція, яка буде вираховувати відстань від рандомно згенерованої точки до координат нашого кліку
let getDistance = function (action, target) {
    let differenceX = action.offsetX - target.x
    let differenceY = action.offsetY - target.y
    return Math.sqrt((differenceX * differenceX) + (differenceY * differenceY))
}
//функція за теоремою Піфагора вираховує довжину гіпотенузи (нашу відстань) як корінь з суми квадратів відомих сторін.

//створимо функцію, яка залежно від величини числа getDistance буде виводити в елемент <p> текстові підказки типу
// "холодно", "гаряче" і тд.
let getDistanceHint = function (getDistance) {
    if (getDistance < 40) {
        return "It`s burns!!! Takes left: " + takesLeft
    }
    else if (getDistance < 50) {
        return "It`s very hot!!! Takes left: " + takesLeft
    }
    else if (getDistance < 70) {
        return "It`s hot!!! Takes left: " + takesLeft
    }
    else if (getDistance < 90) {
        return "It`s almost hot!!! Takes left: " + takesLeft
    }
    else if (getDistance < 200) {
        return "It`s warm!!! Takes left: " + takesLeft
    }
    else if (getDistance < 300) {
        return "It`s almost warm!!! Takes left: " + takesLeft
    }
    else if (getDistance < 400) {
        return "You on right direction!!! Takes left: " + takesLeft
    }
    else if (getDistance < 500) {
        return "It`s cold!!! Takes left: " + takesLeft
    }
    else if (getDistance < 600) {
        return "It`s cold!!! Takes left: " + takesLeft
    }
    else if (getDistance < 700) {
        return "It`s very cold!!! Takes left: " + takesLeft
    }
    else if (getDistance < 800) {
        return "You risk to freeze!!! Takes left: " + takesLeft
    }
}


//створимо інструкцію, яка буде виклика діалогове вікно з привітанням про перемогу, якшо клікнути в радіусі 8 пікселів

// if (getDistance < 8) {
//     alert("Congratulations!!! You find a real treasures!!! You did it with: " + clicks + " clicks!")
// }

//тепер запишемо все разом

//тут умовно маємо написану вище функцію, що створює клад:
// let target = {
//     x: randomNumber(width),
//     y: randomNumber(height)
// }

//далі створюємо відслідковувач кліків і наповнюємо його функцію нашими готовими функціями
$("#map").click(function (action) {
    clicks++
    takesLeft--
    let distanceBetweenPoints = getDistance(action,target)
    let hintMessage = getDistanceHint(distanceBetweenPoints)
    $("#distance").text(hintMessage)
    if (distanceBetweenPoints < 30) {
        alert("Congratulations!!! You find a real treasures!!! You did it with: " + clicks + " clicks!")
    }
    if (clicks > 20) {
        alert("Game over! You have reached the clicks limit ")
    }
})
