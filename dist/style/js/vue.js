var app = new Vue({
    el: '#steps',
    data: {
        steps: [{
                abonent: "Вы предоставляете ТЗ",
                client: "Клиент связывается с нами"
            },
            {
                abonent: "Мы оцениваем количество работы",
                client: "Подключается к абоненской оплате"
            },
            {
                abonent: "Мы с вами согласовываем стоимость и сроки",
                client: "Оплачивает счет"
            },
            {
                abonent: "Мы выполняем задачи согласно ТЗ",
                client: "Обращается с проблемой, описанной в ТЗ"
            },
            {
                abonent: "Вами производится проверка работы",
                client: "Мы решаем проблему"
            },
            {
                abonent: "Производится оплата работы",
                client: "Клиент производит приемку работ"
            },
        ],
        bool: false
    },
    methods: {
        fff: function() {
            this.bool = !this.bool;
            let boofer = '';
            this.steps.forEach(function(value) {
                boofer = value.client;
                value.client = value.abonent;
                value.abonent = boofer;
            });
        }
    }
})

var faq = new Vue({
    el: '#faq',
    data: {
        toggle1: false,
        toggle2: false,
        toggle3: false,
        toggle4: false,
    },
})