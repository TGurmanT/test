const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
//Класс, который представляет сам тест
class Quiz
{
   constructor(type, questions, results)
   {
       //Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
       this.type = type;
 
       //Массив с вопросами
       this.questions = questions;
 
       //Массив с возможными результатами
       this.results = results;
 
       //Количество набранных очков
       this.score = 0;
 
       //Номер результата из массива
       this.result = 0;
 
       //Номер текущего вопроса
       this.current = 0;
   }
 
   Click(index)
   {
       //Добавляем очки
       let value = this.questions[this.current].Click(index);
       this.score += value;
 
       let correct = -1;
 
       //Если было добавлено хотя бы одно очко, то считаем, что ответ верный
       if(value >= 1)
       {
           correct = index;
       }
       else
       {
           //Иначе ищем, какой ответ может быть правильным
           for(let i = 0; i < this.questions[this.current].answers.length; i++)
           {
               if(this.questions[this.current].answers[i].value >= 1)
               {
                   correct = i;
                   break;
               }
           }
       }
 
       this.Next();
 
       return correct;
   }
 
   //Переход к следующему вопросу
   Next()
   {
       this.current++;
      
       if(this.current >= this.questions.length)
       {
           this.End();
       }
   }
 
   //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
   End()
   {
       for(let i = 0; i < this.results.length; i++)
       {
           if(this.results[i].Check(this.score))
           {
               this.result = i;
           }
       }
   }
}
 
//Класс, представляющий вопрос
class Question
{
   constructor(text, answers)
   {
       this.text = text;
       this.answers = answers;
   }
 
   Click(index)
   {
       return this.answers[index].value;
   }
}
 
//Класс, представляющий ответ
class Answer
{
   constructor(text, value)
   {
       this.text = text;
       this.value = value;
   }
}
 
//Класс, представляющий результат
class Result
{
   constructor(text, value)
   {
       this.text = text;
       this.value = value;
   }
 
   //Этот метод проверяет, достаточно ли очков набрал пользователь
   Check(value)
   {
       if(this.value <= value)
       {
           return true;
       }
       else
       {
           return false;
       }
   }
}
//Массив с результатами
const results =
[
   new Result("U_U", 0),
   new Result("Т_Т", 1),
   new Result("Т_Т", 2),
   new Result("Т_т", 3),
   new Result("O_O", 4),
   new Result("^_^", 5)
];
 
//Массив с вопросами
const questions =
[
   new Question("К автоматизированным обучающим системам относятся",
   [
       new Answer("автоматизированные архивы", 0),
       new Answer("информационно-расчетные системы", 0),
       new Answer("системы автоматизации проектирования", 0),
       new Answer("тренажеры и тренажерные комплексы", 1)
   ]),
   new Question("Конкретный материальный продукт, реализующий информационно-коммуникационные технологии обучения",
   [
       new Answer("автоматизированные обучающие системы", 1),
       new Answer("информационные системы электронного обучения", 0),
       new Answer("электронный образовательный ресурс", 0),
       new Answer("электронный учебник", 0)
   ]),
   new Question("Образовательные ресурсы, обеспечивающие возможность доступа к любой информации в локальных и глобальных сетях, удаленное интерактивное взаимодействие субъектов учебного процесса",
   [
       new Answer("демонстрационные ЭОР", 0),
       new Answer("контролирующие ЭОР", 0),
       new Answer("коммуникативные ЭОР", 1),
       new Answer("диагностирующие ЭОР", 0)
   ]),
   new Question("Разновидность веб-конференции, проведение онлайн-встреч или презентаций через Интернет",
   [
       new Answer("онлайн-семинар", 0),
       new Answer("коучинг", 0),
       new Answer("вебкаст", 0),
       new Answer("вебинар", 1)
   ]),
   new Question("Тьютор - это",
   [
       new Answer("видеоролик, размещенный в сети, который можно посмотреть в удобное время на выбранном вами устройстве отображения", 0),
       new Answer("специалист по индивидуализации в образовании, посредник между учеником и образовательной системой", 1),
       new Answer("форма представления содержания учебного курса, основанная на использование современных информационных технологий", 0),
       new Answer("набор ИТ-сервисов, использующихся при проведении дистанционного обучения", 0)
   ]),
];
 
//Сам тест
const quiz = new Quiz(1, questions, results);
Update();
 
//Обновление теста
function Update()
{
   //Проверяем, есть ли ещё вопросы
   if(quiz.current < quiz.questions.length)
   {
       //Если есть, меняем вопрос в заголовке
       headElem.innerHTML = quiz.questions[quiz.current].text;
 
       //Удаляем старые варианты ответов
       buttonsElem.innerHTML = "";
 
       //Создаём кнопки для новых вариантов ответов
       for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
       {
           let btn = document.createElement("button");
           btn.className = "button";
 
           btn.innerHTML = quiz.questions[quiz.current].answers[i].text;
 
           btn.setAttribute("index", i);
 
           buttonsElem.appendChild(btn);
       }
      
       //Выводим номер текущего вопроса
       pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;
 
       //Вызываем функцию, которая прикрепит события к новым кнопкам
       Init();
   }
   else
   {
       //Если это конец, то выводим результат
       buttonsElem.innerHTML = "";
       headElem.innerHTML = quiz.results[quiz.result].text;
       pagesElem.innerHTML = "Очки: " + quiz.score;
   }
}
 
function Init()
{
   //Находим все кнопки
   let btns = document.getElementsByClassName("button");
 
   for(let i = 0; i < btns.length; i++)
   {
       //Прикрепляем событие для каждой отдельной кнопки
       //При нажатии на кнопку будет вызываться функция Click()
       btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
   }
}
 
function Click(index)
{
   //Получаем номер правильного ответа
   let correct = quiz.Click(index);
 
   //Находим все кнопки
   let btns = document.getElementsByClassName("button");
 
   //Делаем кнопки серыми
   for(let i = 0; i < btns.length; i++)
   {
       btns[i].className = "button button_passive";
   }
 
   //Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
   if(quiz.type == 1)
   {
       if(correct >= 0)
       {
           btns[correct].className = "button button_correct";
       }
 
       if(index != correct)
       {
           btns[index].className = "button button_wrong";
       }
   }
   else
   {
       //Иначе просто подсвечиваем зелёным ответ пользователя
       btns[index].className = "button button_correct";
   }
 
   //Ждём секунду и обновляем тест
   setTimeout(Update, 1000);
}