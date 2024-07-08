const readline=require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
});
const inventory = new Map();
function askCommand(){
    console.log('welcome');
    console.log('available commands : add , remove, update,search,summary,exit');
    rl.question('enter command : ',function(command){
        switch(command.trim().toLowerCase())
        {
            case 'add': additemPrompt();
            break;  
            case 'update': updateitemPrompt();
            break;
            case 'search': searchitemPrompt();
            break;
            case 'remove': removeitemPrompt();
            break;
            case 'summary': printsummary();
                            askCommand();
                            break;
            case 'exit': rl.close();
            break;
            default:console.log("Enter Valid Command");
            askCommand();
            break;
        }
    })
}
function additemPrompt(){
    rl.question('enter item id : ',function(id){
        rl.question('enter item name : ',function(name){
            rl.question('enter item category : ',function(category){
                rl.question('enter item quantity : ',function(quantity){
                    additem(id,name,category,parseInt(quantity))
                    askCommand();
                })

            })
    })
})
}
function additem(id,name,category,quantity){
    if(inventory.has(id)){
        console.log('item already exists');
    }
    else{
        inventory.set(id,{name,category,quantity});
        console.log(`element with id ${id} added`);
    }
}
function updateitemPrompt(){
    rl.question('enter item id : ',function(id){
        rl.question('enter item name : ',function(name){
            rl.question('enter item category : ',function(category){
                rl.question('enter item quantity : ',function(quantity){
                    updateitem(id,name,category,parseInt(quantity));
                    askCommand();
                })
            })
        })
    })
}

function updateitem(id,newname,newcategory,newquantity){
    if(inventory.has(id)){
        let item=inventory.get(id);
        item.name=newname || item.name;
        item.category=newcategory || item.category;
        item.quantity=newquantity || item.quantity;
        inventory.set(id,item);
        console.log(`element with id ${id} updated`);
    }
    else{
        console.log('item does not exist');
    }
}
function searchitemPrompt(){
    rl.question('Enter search term', function(searchterm){
        searchitem(searchterm);
        askCommand();
    })
}
function searchitem(searchterm){
    let result=[];
    console.log(searchterm);
    for(let [id,item] of inventory){
        if(id.includes(searchterm) || item.name.includes(searchterm) || item.category.includes(searchterm)){
            result.push({id,...item});
        }
    }
    if(result.length>0){
        console.log('search results:',result);
    }
    else{
        console.log('no results found');
    }
}
function removeitemPrompt(){
    rl.question('enter item id : ',function(id){
        removeitem(id);
    })
}
function removeitem(id){
    if(inventory.has(id)){
        inventory.delete(id);
        console.log(`item with id ${id} removed`);
    }
    else{
        console.log('item does not exist');
    }
}
function printsummary(){
    if(inventory.size>0){
        console.log('inventory summary:');
        for( let [id,item] of inventory){
            console.log(`id: ${id}, name: ${item.name}, category: ${item.category}, quantity: ${item.quantity}`);
        }
    }
    else{
        console.log('no items in inventory');
    }
}
askCommand();