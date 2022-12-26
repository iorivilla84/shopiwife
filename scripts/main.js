// INSERTAR ITEM
// agregar event listener al boton add
// obtener el valor del input
// crear elemento html con texto del input 
    //Recordar agregar event listener al icono borrar
    // crear btn borrar and completed
// insertar elemento html

const addEventItem = (e) => {
    e.preventDefault();
    const eventInputTitle = eventInputForm.eventTitleInput.value.trim();
    // const eventInputDescription = eventInputForm.eventDescriptionInput.value.trim();

    if (!eventInputTitle) {
        errorMsg.classList.add('invalid')
        // alert('please fill out the form')
    } else {
        createAndAddItem(eventInputTitle);
        errorMsg.classList.remove('invalid');
        eventInputForm.reset();
        updateEventCounter();
    };
};

const deleteEventElement = e => {
    const mainCardContainer = e.target.parentNode.parentNode;
    console.log(mainCardContainer);
    myEventContainer.removeChild(mainCardContainer);
    updateCounter();
};

const createEventItem = (title) => {
    /* Creating Elements */
    // main wrapper
    const mainCardContainer = document.createElement('div');
    mainCardContainer.classList.add('shopping-item', 'line-item');
    mainCardContainer.setAttribute('data-item', title);

    // event Card Text Content
    const cardTextContent = document.createElement('div');
    cardTextContent.classList.add('item-content');

    // input title
    const inputTitle = document.createElement('input');
    inputTitle.setAttribute('type', 'text');
    inputTitle.classList.add('text', 'item-title');
    inputTitle.setAttribute('value', title);
    inputTitle.setAttribute('readonly', '');

    // input description
    // const inputDescription = document.createElement('textarea');
    // inputDescription.setAttribute('type', 'text');
    // inputDescription.classList.add('text', 'item-description');
    // inputDescription.setAttribute('readonly', 'readonly');
    // inputDescription.innerText = eventDescription;

    // CTA's container
    const ctaContainer = document.createElement('div');
    ctaContainer.classList.add('btn-cta-actions');

    // Button Edit
    const btnEdit = document.createElement('button');
    btnEdit.classList.add('edit');
    // fa icon edit
    const faIconEdit = document.createElement('i');
    faIconEdit.classList.add('far','fa-edit');

    // Button Delete
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('delete');
    // fa icon Delete
    const faIconDelete = document.createElement('i');
    faIconDelete.classList.add('fas','fa-trash-alt');

    /* APPEND ELEMENTS TO CARD ITEM */
    myEventContainer.appendChild(mainCardContainer);
    mainCardContainer.appendChild(cardTextContent);
    cardTextContent.appendChild(inputTitle);
    // cardTextContent.appendChild(inputDescription);
    mainCardContainer.appendChild(ctaContainer);
    ctaContainer.appendChild(btnEdit);
    btnEdit.appendChild(faIconEdit);
    ctaContainer.appendChild(btnDelete);
    btnDelete.appendChild(faIconDelete);

    /* ADD EVENT LISTENER TO CTA's */
    removeBtn.addEventListener('click', deleteEventElement);
    console.log(removeBtn);
    // btnEdit.addEventListener('click', editEventElement);
    // console.log(inputTitle);

    // textAreaResize();
    return mainCardContainer;
};

// const editEventElement = e => {
//     const cardItem = e.target.parentNode.parentNode;
//     const getFormInputs = cardItem.firstElementChild.children;

//     for (let i = 0; i < getFormInputs.length; i++) {
//         console.log('clicked', getFormInputs[i]);
//     }
// };

// const textAreaResize = () => {
//     descArea.addEventListener("keyup", e => {
//         let descHeight = e.target.scrollHeight;
//         descArea.style.height = "70px";
//         descArea.style.height = `${descHeight}px`
//     });
// };

const updateEventCounter = () => {
    const eventNumber = document.querySelector('.counter');
    eventNumber.textContent = myEventContainer.children.length;
};

const createAndAddItem = (title) => {
    // const newItem = `
    // <div class="shopping-wrapper list-container" data-item="${itemTitle}">
    //     <div class="shopping-item line-item">
    //         <div class="item-content">
    //             <input type="text" class="text item-title" value="${itemTitle}" readonly>
    //             <textarea type="text" class="text item-description" readonly>${itemDesc}</textarea>
    //         </div>
    //         <div class="btn-cta-actions">
    //             <button class="edit"><i class="far fa-edit"></i></button>
    //             <button class="delete"><i class="fas fa-trash-alt"></i></button>
    //         </div>
    //     </div>
    // `;

    // myEventList.innerHTML += newItem;

    const mainCardContainer = createEventItem(title);
    myEventContainer.prepend(mainCardContainer);
};

// Borrar Item
// cuando haga click en caneca eliminar elemento html
    // Events tab: if for events (concerts, cinema, etc) it's old add class disabled
    // if disabled add class completed to btn and in css add pointer-events: none; 
    // links help: https://www.youtube.com/watch?v=XtEs0SZ_4Y0 / https://www.youtube.com/watch?v=cTe5vQAm2So

const myEventList = document.querySelector('.event-list-container');
const addEventBtn = document.querySelector('#new-event-submit');
const eventInputForm = document.querySelector('.event-items-form');
const removeBtn = document.querySelector('.delete');
const editBtn = document.querySelector('.edit');
const errorMsg = document.querySelector('.error-msg');
const descriptionInput = document.querySelector('.item-description');
const myEventContainer = document.querySelector('.card-body');

addEventBtn.addEventListener('click', addEventItem);
