//Storage Controller
      
//Item Controller
const ItemCtrl = (function(){
    ///Item constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    //Data Structure / state
    const data = {
        items: [
           /* {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Cookie', calories: 400},
            {id: 2, name: 'Eggs', calories: 300},*/

        ],
        currentItem: null,
        totalCaories: 0
    }
    return{
        getItems: function(){
            return data.items;   
        },
        addItem: function(name, calories){ 
            let ID;
            //Create Id
            if(data.items.lenght > 0){
                 ID = data.items[data.items.length - 1].id + 1;
            } else{
                ID = 0;
            }
            //calories to number
            calories = parseInt(calories); 

            //create new item
            newItem = new Item(ID, name, calories);

            //Add to items array
            data.items.push(newItem); 
            return newItem;
            
        },
        getTotalCalories: function(){
            let total = 0;
            //loop through items and add calories
            data.items.forEach(function(item){
                total += item.calories;

            });
            //set total calories
            data.totalCaories = total;
            //return total
            return data.totalCaories;
        },
        logData: function(){
            return data; 
        }
    }


})();
//UI Controller
const UICtrl = (function(items){

    const UISelector = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemName: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }
//Public method
    return{
        populateItemList: function(items){
            let html = '';

            items.forEach(function(item){
                html += `
                    <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}</strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secodary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                    </li>
                `
            });
            //Insert list item
            document.querySelector(UISelector.itemList).innerHTML = html;
        },
        getItemInput: function(){
            return{
                name: document.querySelector(UISelector.itemName).value,
                calories: document.querySelector(UISelector.itemCaloriesInput).value
            }
        },
        addListItem: function(item){
            //show the list
            document.querySelector(UISelector.itemList).style.display = 'block'
            //create li element
            const li = document.createElement('li'); 
            //create class
            li.className = 'collection-item';
            //add ID
            li.id = `item-${item.id}`;
            //Add html
            li.innerHTML = `
                <strong>${item.name}</strong> <em>${item.calories} Calories</em>
                <a href="#" class="secodary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>  `;
                //Insert item
                document.querySelector(UISelector.itemList).insertAdjacentElement('beforeend', li)
        },
        clearInput: function(){
            document.querySelector(UISelector.itemName).value = '';
            document.querySelector(UISelector.itemCaloriesInput).value = '';
        },
        hideList: function(){
            document.querySelector(UISelector.itemList).getElementsByClassName.display = 'none';
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelector.totalCalories).textContent = totalCalories;
        },
        getSelectors: function(){
            return UISelector; 
        }
        
    }
    
})()

//App Controller
const App = (function(ItemCtrl, UICtrl){
    //Load event listerners 
    const loadEventListeners = function(){
        //Get UI Selector
        const UISelectors = UICtrl.getSelectors();

        //Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
    }
    //Add item submit
    const itemAddSubmit = function(e){
        //Get form input from UICtrl
        const input = UICtrl.getItemInput();
        //Check for calorie input
        if(input.name !== '' && input.calories !== ''){
            //Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            //add item to UI
            UICtrl.addListItem(newItem);

            // Get total calories 
            const totalCalories = ItemCtrl.getTotalCalories();
            //add total calores to the UI
            UICtrl.showTotalCalories(totalCalories);


            //clear fields
            UICtrl.clearInput();
            }

        e.preventDefault();
    }
    //Public methods
    return {
        Init: function(){
            //Fetch items from data Structure
            const items = ItemCtrl.getItems();

            //check if any items
            if(items.length === 0){
                UICtrl.hideList();
            }else{
                //Populate list with items
                UICtrl.populateItemList(items);
            }
             // Get total calories
             const totalCalories = ItemCtrl.getTotalCalories();
             //add total calores to the UI
             UICtrl.showTotalCalories(totalCalories);
 
            //LoadEventListeners
            loadEventListeners();
        }
    }
    
})(ItemCtrl, UICtrl);

App.Init();