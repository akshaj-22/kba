const readline=require("readline");
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
const inventory=new Map();
function askcommand(){
    console.log("Library");
    console.log("available commands: add,remove,search,update,summary,exit");
    rl.question("Enter a command : ",function(command){
        switch(command.trim().toLowerCase()){
            case "add":
                addbookprompt();
                break;
            case "remove":
                removebookprompt();
                break;
            case "search":
                searchbookprompt();
                break;
            case "update":
                updatebookprompt();
                break;
            case "summary":
                printsummary();
                askcommand();
                break;
            case "exit":
                rl.close();
                break;
            default:
                console.log("invalid command please try again!");
                askcommand();
                break;
        }
    })
}
function addbookprompt(){
    rl.question("enter book id : ",function(id){
        rl.question("enter book title : ",function(title){
            rl.question("enter author name : ",function(author){
                addbook(id,title,author);
                askcommand();
            })
        })
    })
}
function addbook(id, title, author) {
    if (inventory.has(id)) {
        console.log(`error book with id ${id} already exist.`);
    }
    else {
        inventory.set(id, { title, author });
        console.log(`book with id ${id} added`)
    }
}
function removebook(id) {
    if (inventory.has(id)) {
        inventory.delete(id);
        console.log(`book with id ${id} removed`);
    }
    else {
        console.log(`error book with id ${id} not found`);
    }
}
function removebookprompt() {
    rl.question("enter id : ",function(id){
        removebook(id);
        askcommand();
    })
}
function searchbooks(searchterm) {
    const results = [];
    for (const [id, book] of inventory) {
        if (id.includes(searchterm) || book.title.includes(searchterm) || book.author.includes(searchterm)) {
            results.push({ id, ...book });
        }
    }
    if (results.length > 0) {
        console.log("search result:", results);
    }
    else {
        console.log("book not found");
    }
}
function searchbookprompt() {
    rl.question("enter search term : ",function(searchterm){
        searchbooks(searchterm);
        askcommand();
    })
}
function updatebook(id,newtitle,newauthor){
    if(inventory.has(id)){
        const book=inventory.get(id);
        book.title=newtitle || book.title;
        book.author=newauthor || book.author;
        inventory.set(id,book);
        console.log(`book with id ${id} updated`);
    }
    else{
        console.log(`error book with id ${id} not found`);
    }
}
function updatebookprompt(){
    rl.question("enter book id : ",function(id){
        rl.question("enter book title : ",function(title){
            rl.question("enter author name : ",function(author){
                updatebook(id,title,author);
                askcommand();
            })
        })
    })
}
function printsummary(){
    if(inventory.size>0){
        console.log("book summary");
        for(const [id,book] of inventory){
            console.log(`id : ${id},title: ${book.title}, author : ${book.author}`);
        }
    }
    else{
        console.log("book inventory is empty.")
    }
}


askcommand()