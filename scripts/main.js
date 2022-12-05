// INSERTAR ITEM
// agregar event listener al boton add
// obtener el valor del input
// crear elemento html con texto del input 
    //Recordar agregar event listener al icono borrar
    // crear btn borrar and completed
// insertar elemento html

const addEventItem = e => {
    e.preventDefault();
    const eventFormTitle = eventInputForm.newEventTitle.value.trim();
    const eventFormDescription = eventInputForm.newEventDescription.value.trim();
  
    if (eventFormTitle == "" || eventFormDescription == "") {
        errorMsg.classList.add('invalid')
        // alert('please fill out the form')
    } else {
        createAndAddItem(eventFormTitle, eventFormDescription);
        errorMsg.classList.remove('invalid');
        eventInputForm.reset();
    }
}

const createAndAddItem = (itemTitle, itemDesc) => {
    const newItem = `
    <div class="shopping-wrapper list-container" data-item="${itemTitle}">
        <div class="shopping-item line-item">
            <div class="item-content">
                <input type="text" class="text item-title" value="${itemTitle}" readonly>
                <textarea type="text" class="text item-description" readonly>${itemDesc}</textarea>
            </div>
            <div class="btn-cta-actions">
                <button class="edit"><i class="far fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
    `;

    myEventList.innerHTML += newItem;

    editBtn.addEventListener('click', e => {
        e.target
    });
}

// Borrar Item
// cuando haga click en caneca eliminar elemento html
    // Events tab: if for events (concerts, cinema, etc) it's old add class disabled
    // if disabled add class completed to btn and in css add pointer-events: none; 
    // links help: https://www.youtube.com/watch?v=XtEs0SZ_4Y0 / https://www.youtube.com/watch?v=cTe5vQAm2So


const removeItem = () => {

}

// const textAreaResize = () => {
//     descArea.addEventListener("keyup", e => {
//         let descHeight = e.target.scrollHeight;
//         descArea.style.height = "70px";
//         descArea.style.height = `${descHeight}px`
//     });
// }


const myEventList = document.querySelector('.event-list-container');
const addEventBtn = document.querySelector('#new-event-submit');
const eventInputForm = document.querySelector('.event-items-form');
const removeBtn = document.querySelector('.delete');
const editBtn = document.querySelector('.edit');
const errorMsg = document.querySelector('.error-msg');
const descArea = document.querySelector('.item-description');

addEventBtn.addEventListener('click', addEventItem);
