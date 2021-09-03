let itemMainText = document.getElementById("itemMainText");
let addButton = document.getElementById("addButton");
let descriptionButton = document.getElementById("descriptionButton");
let itemDescription = document.getElementById("itemDescription");
let importantItemCheckbox = document.getElementById("importantItemCheckbox");

let listBlock = document.getElementById('listBlock');
let importantListBlock = document.getElementById('importantListBlock');
let deleteButtons = document.querySelectorAll(".deleteItemButton")

importantItemCheckbox.checked = false;

let itemIndex = localStorage.length;

let itemObject = {
	item: "",
	itemIsImportant: ""
};

let itemsMass = []


let clearAllButton = document.getElementById("clearAllButton");

function clearAll () 
	{
		 	itemsMass = [];
			localStorage.clear();
			listBlock.innerHTML ="";
			importantListBlock.innerHTML ="";
			itemIndex = 0;
	}

function addReloader () {
	let deleteButtons = document.querySelectorAll(".deleteItemButton")
	for (deleteButton of deleteButtons) 
	{
		deleteButton.addEventListener("click", deleteItem)
	}
	importantItemCheckbox.checked = false;
}

function toggleElement (el) 
	{
		el.classList.toggle("hiddenElement");
	}


function storageReloader ()
	{	
		for (var i = 0; i < itemsMass.length; i++) 
		{
			localStorage.setItem(i, itemsMass[i]);
		}
	}


function fromStorageLoader () {
	if (localStorage.length !=0) 
	{
		for( let i=0; i<localStorage.length; i++)
		{
		itemsMass[i] = localStorage.getItem(i);
		}
	}
		for( let i=0; i<localStorage.length; i++)
		{
			let itemObject = JSON.parse(localStorage.getItem(i))

			if (itemObject.itemIsImportant == false) 
			{
				listBlock.innerHTML =  listBlock.innerHTML + itemObject.item;
			}
			else
			{
				importantListBlock.innerHTML =  importantListBlock.innerHTML + itemObject.item;
			}
		}
}

function addItem () 
{
	if (itemMainText.value.length !== 0 ) 
	{
		let item = "<div class=listItemBlock data-number="+ itemIndex+"> <div class=itemConfig>  <h2>" + itemMainText.value + "</h2> <p>" + itemDescription.value + "</p></div> <button class=deleteItemButton>Delete</button></div>"
		if (importantItemCheckbox.checked == false) 
		{
			itemObject = {
				item: item,
				itemIsImportant: false
			}

			listBlock.innerHTML =  listBlock.innerHTML + item;

		}
		else 
		{
			itemObject = {
				item: item,
				itemIsImportant: true
			}
			importantListBlock.innerHTML =  importantListBlock.innerHTML + item;
		}
		
		
		itemsMass[itemIndex] =  JSON.stringify(itemObject);

		storageReloader();
		itemIndex++;
		addReloader();

		itemMainText.value = null;
		itemDescription.value = null;
	}
}

function deleteItem () 
{
	let deletedIndex = parseInt(event.target.closest(".listItemBlock").getAttribute("data-number"));
	event.target.closest(".listItemBlock").remove();


	itemsMass.splice(deletedIndex, 1);
	itemIndex--;
	localStorage.clear();
	storageReloader ()
}

clearAllButton.addEventListener("click", clearAll)

fromStorageLoader();

addReloader();

addButton.addEventListener("click", addItem)
descriptionButton.addEventListener("click",() => toggleElement(itemDescription) )
