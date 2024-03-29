// INSERTAR ITEM
// agregar event listener al boton add
// obtener el valor del input
// crear elemento html con texto del input 
    //Recordar agregar event listener al icono borrar
    // crear btn borrar and completed
// insertar elemento html

const addEventItem = e => {
    e.preventDefault();
    const eventInputTitle = eventInputForm.eventTitleInput.value.trim();
    const eventInputDescription = eventInputForm.eventDescriptionInput.value.trim();

    if (!eventInputTitle || !eventInputDescription) {
        errorMsg.classList.add('invalid')
        // alert('please fill out the form')
    } else {
        createAndAddItem(eventInputTitle, eventInputDescription);
        errorMsg.classList.remove('invalid');
        eventInputForm.reset();
    };
};

const deleteEventElement = e => {
    const eventCardItem = e.target.parentNode.parentNode;
    try {
        currentEventContainer.removeChild(eventCardItem);
        removeEventDetailsFromLocalStorage();
        updateEventCounter();
    } catch {
        completedEventContainer.removeChild(eventCardItem);
        if (completedEventContainer.childElementCount === 0) {
            completeTitle.classList.add('d-none');
        }
    }
}

const markEventAsCompleted = (card) => {
    const eventCompleted = card.target.parentNode.parentNode.firstChild.children;
    const eachCardCompleted = card.target.parentNode.parentNode;
    const btnCompleted = card.target;
    const btnEditDisabled = card.target.parentNode.firstChild;
    
    for (let i = 0; i < eventCompleted.length; i++) {
        btnCompleted.classList.add('is-completed');
        eachCardCompleted.classList.add('is-completed');
        eventCompleted[i].style.textDecoration = "line-through";
        btnEditDisabled.classList.add('is-completed');
    };

    deleteEventElement(card);
    if (completedEventContainer.childElementCount === 0) {
        completeTitle.classList.remove('d-none');
    }
    completedEventContainer.append(eachCardCompleted);

    // completedEventContainer.childNodes.length <= 3 ? completeTitle.classList.add('d-none') : completeTitle.classList.remove('d-none');
}

const editEventElement = e => {
    let eachCardContent = e.target.parentNode.parentNode.firstChild.children;
    const btnEdit = e.target;
    const editLabelText = e.target.firstChild;
    
    for (let i = 0; i < eachCardContent.length; i++) {
        if (eachCardContent[i].hasAttribute('readonly')) {
            eachCardContent[i].removeAttribute('readonly');
            btnEdit.classList.add('active');
            editLabelText.classList.remove('is-saved');
        } else {
            btnEdit.classList.remove('active');
            eachCardContent[i].setAttribute('readonly', 'readonly');
            editLabelText.classList.add('is-saved');
            setTimeout(() => {
                editLabelText.classList.remove('is-saved');
            }, 2000);
        }
    };
};

const purchasedDate = () => {
    // Get formated date
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth()+1;
    const yyyy = today.getFullYear();
    
    const purchasedDate = `${dd}/${mm}/${yyyy}`;
    return purchasedDate;
};
// store date in a variable
const currentDate = purchasedDate();

const createEventItem = (title, description) => {
    /* Creating Elements */
    // main wrapper
    const mainCardContainer = document.createElement('div');
    mainCardContainer.classList.add('shopping-item', 'line-item');
    mainCardContainer.setAttribute('data-item', title);

    // event Card Text Content
    const cardTextContent = document.createElement('div');
    cardTextContent.classList.add('item-content');

    //date of purchase
    const dateOfPurchase = document.createElement('p');
    dateOfPurchase.classList.add('text-secondary', 'purchase-date');
    dateOfPurchase.setAttribute('data-date', currentDate);
    dateOfPurchase.innerHTML = 'Date: ' + currentDate;

    // input title
    const inputTitle = document.createElement('input');
    inputTitle.setAttribute('type', 'text');
    inputTitle.classList.add('text', 'item-title');
    inputTitle.setAttribute('value', title);
    inputTitle.setAttribute('readonly', 'readonly');

    // input description
    const inputDescription = document.createElement('textarea');
    inputDescription.setAttribute('type', 'text');
    inputDescription.classList.add('text', 'item-description');
    inputDescription.setAttribute('readonly', 'readonly');
    inputDescription.setAttribute('rows', '1');
    inputDescription.textContent = description;
    // inputDescription.style.height = "35px";
    inputDescription.addEventListener('keyup', textAreaResize);

    // CTA's container
    const ctaContainer = document.createElement('div');
    ctaContainer.classList.add('btn-cta-actions');

    // Button Edit
    const btnEdit = document.createElement('i');
    btnEdit.classList.add('edit', 'fa-regular', 'fa-pen-to-square', 'fa-fw');
    btnEdit.addEventListener('click', editEventElement);
    const labelEdit = document.createElement('label');
    labelEdit.textContent = 'saved';
    labelEdit.classList.add('edit-label');

    // Button Completed
    const btnComplete = document.createElement('i');
    btnComplete.classList.add('complete', 'fa-solid', 'fa-check');
    btnComplete.addEventListener('click', markEventAsCompleted);

    // Button Delete
    const btnDelete = document.createElement('i');
    btnDelete.classList.add('delete', 'fa-solid', 'fa-trash', 'fa-fw');
    btnDelete.addEventListener('click', deleteEventElement);

    mainCardContainer.append(cardTextContent);
    cardTextContent.append(dateOfPurchase);
    cardTextContent.append(inputTitle);
    cardTextContent.append(inputDescription);
    mainCardContainer.append(ctaContainer);
    ctaContainer.append(btnEdit);
    btnEdit.append(labelEdit);
    ctaContainer.append(btnComplete);
    ctaContainer.append(btnDelete);
    return mainCardContainer;
};

const updateEventCounter = () => {
    const eventNumber = currentEventContainer.children.length;
    eventCounter.textContent = eventNumber;
};

const createAndAddItem = (title, description) => {
    const mainCardContainer = createEventItem(title, description, currentDate);
    currentEventContainer.prepend(mainCardContainer);
    createEventDetailsInLocalStorage(title, description, currentDate);
    updateEventCounter();
};

const textAreaResize = e => {
    const descArea = e.target;
    descArea.style.height = "auto";
    let textAreaHeight = e.target.scrollHeight;
    descArea.style.height = `${textAreaHeight}px`;
};

// Local Storage Start
const createEventDetailsInLocalStorage = () => {
    const eventDetails = getEventContentFromLocalStorage();
    eventDetails.push(eachEventData);
    localStorage.setItem('Event Details', JSON.stringify(eventDetails));
};

const getEventContentFromLocalStorage = () => {
    const eventDetails = localStorage.getItem('Event Details');
    if (eventDetails) {
        return JSON.parse(eventDetails);
    } else {
        return [];
    }
};

const displayEventDetailsFromLocalStorage = () => {
    const eventDetails = getEventContentFromLocalStorage();
    const dataDate = document.getElementsByClassName('purchase-date');
    for (let i =0; i < eventDetails.length; i++) {
        const mainCardContainer = createEventItem(eventDetails[i].title, eventDetails[i].description);
        currentEventContainer.prepend(mainCardContainer);
    }

    for (let i = 0; i < dataDate.length; i++) {
        dataDate[i].innerHTML = 'Date: ' + eventDetails[i].date;
    }
    updateEventCounter();
};

const removeEventDetailsFromLocalStorage = (eventDetail) => {
    const eventDetails = getEventContentFromLocalStorage();
    const filteredEventDetails = eventDetails.filter(eachEvent => eachEvent != eventDetail);

    localStorage.setItem('Event Details', JSON.stringify(filteredEventDetails));
}

// Borrar Item
// cuando haga click en caneca eliminar elemento html
    // Events tab: if for events (concerts, cinema, etc) it's old add class disabled
    // if disabled add class completed to btn and in css add pointer-events: none; 
    // links help: https://www.youtube.com/watch?v=XtEs0SZ_4Y0 / https://www.youtube.com/watch?v=cTe5vQAm2So

const eventCounter = document.querySelector('.ev-counter');
const eventInputForm = document.querySelector('.event-items-form');
const addEventBtn = document.querySelector('#new-event-submit');
const inputEventTitle = document.querySelector('.title');
const inputEventDescription = document.querySelector('.description');
const errorMsg = document.querySelector('.error-msg');
const currentEventContainer = document.querySelector('.card-body');
const completedEventContainer = document.querySelector('.completed-events');
const completeTitle = document.querySelector('.shopping-title-completed');

const eachEventData = {
    date: currentDate,
    title: eventInputForm.eventTitleInput.value,
    description: eventInputForm.eventDescriptionInput.value
}

displayEventDetailsFromLocalStorage();

// Event Details Data
addEventBtn.addEventListener('click', () => {
    const title = eventInputForm.eventTitleInput.value;
    const description = eventInputForm.eventDescriptionInput.value;
    eachEventData.title = title
    eachEventData.description = description
});

addEventBtn.addEventListener('click', addEventItem);
