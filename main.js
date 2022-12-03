// INSERTAR ITEM
// agregar event listener al boton add
// obtener el valor del input
// crear elemento html con texto del input 
    //Recordar agregar event listener al icono borrar
    // crear btn borrar and completed
// insertar elemento html

const addItem = e => {
    e.preventDefault();
    const textInput = textItemInput.value;
    createAndAddItem(textInput);
}

const createAndAddItem = item => {
    const newItem = `
    <li class="list-group-item line-item pending" data-item="${item}">
        <span class="line-item-name">${item}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `

    myUlList.innerHTML += newItem
}

// Borrar Item
// cuando haga click en caneca eliminar elemento html
    // Events tab: if for events (concerts, cinema, etc) it's old add class disabled
    // if disabled add class completed to btn and in css add pointer-events: none; 
    // links help: https://www.youtube.com/watch?v=XtEs0SZ_4Y0 / https://www.youtube.com/watch?v=cTe5vQAm2So


const remove = () => {

}

const removeItem = () => {

}

const myUlList = document.querySelector('.parcel-list-container');
const addItemBtn = document.querySelector('.add-item-button');
const textItemInput = document.querySelector('.input-text-item');
const removeBtn = document.querySelector('.delete');
const itemList = document.querySelectorAll('.line-item');
console.log(itemList);

addItemBtn.addEventListener('click', addItem)

