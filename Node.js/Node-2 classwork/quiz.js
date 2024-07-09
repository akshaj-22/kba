const quesans = [
    {
        q: "What was the name of the first president of the United States?",
        opt: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "Benjamin Franklin"],
        ans: "George Washington"
    },
    {
        q: "What is the largest planet in our solar system?",
        opt: ["Jupiter", "Saturn", "Earth", "Mars"],
        ans: "Jupiter"
    },
    {
        q: "Who wrote the famous novel 'To Kill a Mockingbird'",
        opt: ["F. Scott Fitzgerald", "Harper Lee", "Jane Austen", "J.K. Rowling"],
        ans: "Harper Lee"
    },
    {
        q: "Which of the following musicians is known as the 'King of Rock and Roll' ?",
        opt: ["Elvis Presley", "Chuck Berry", "Little Richard", "Jerry Lee Lewis"],
        ans: "Elvis Presley"
    }
]
let currentQuestionIndex = 0;
let score = 0;
let time = 60;

function showQuestion(currentQuestionIndex){
    setInterval(timer,1000)

    let question = quesans[currentQuestionIndex].q;
    document.getElementById('question').innerHTML=question;
    let answers=[];
    answers=[...quesans[currentQuestionIndex].opt];
    console.log(answers);
    document.getElementById('choices').innerHTML='';
    for(let i=0;i<answers.length;i++)
    {
    let radbtn = document.createElement('input');
    radbtn.type="radio";
    radbtn.name="option";
    radbtn.value=answers[i];
    let label = document.createElement('label');
    label.textContent=answers[i];
    document.getElementById('choices').appendChild(radbtn);
    document.getElementById('choices').appendChild(label);
    
    }

    timer=3;
    intervalId = setInterval(interval, 1000);

}

function submit(){
    clearInterval(intervalId);
    currentQuestionIndex+=1;
    if(currentQuestionIndex<quesans.length){
        showQuestion(currentQuestionIndex);
    }
    else{
        document.getElementById('question').innerHTML="";
        document.getElementById('choices').innerHTML="";
        document.getElementById('display1').innerHTML="";
        let rembtn=document.getElementById('submit');
        rembtn.remove();

        document.getElementById('score-head').textContent='YOUR SCORE';
        document.getElementById('score').textContent=`Your Score is ${score} out of ${quesans.length}`;
        for(let i=0;i<quesans.length;i++)
        {

            console.log('hi');
            let qn=document.createElement('p');
            //qn.id='qn';
            let ans=document.createElement('p');
            //ans.id='ans';
            
            qn.textContent = `Question ${i+1} : ${quesans[i].q}`;
            ans.textContent = `Answer ${i+1} : ${quesans[i].ans}`;
            document.getElementById('display').appendChild(qn);
            document.getElementById('display').appendChild(ans);
        }
    }
}
function select(){
    let selected = document.querySelector('input[name = "option"]:checked').value;
    console.log(selected);
    if(selected==quesans[currentQuestionIndex].ans){
        score+=1;
    }
}
let timer = 3;
function interval(){
    document.getElementById("display1").innerHTML = timer;
    timer = timer - 1;
    if(timer < 0){
        submit();
    }
}
showQuestion(currentQuestionIndex);