window.addEventListener('load', start);

var globalNames = ['Test 1', 'Test 2', 'Test 3', 'Test 4'];
var inputName = null;
var isEditing = false;
var currentIndex = false;

function start() {
    inputName = document.querySelector('#inputName');

    preventFormSubmit();
    activateInput();
    render();
}

function preventFormSubmit() {
    function handleFormSubmit(event) {
        event.preventDefault();
    }

    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
    function insertName(newName) {
        globalNames.push(newName);
        render();
    }
    function updateName(newName) {
        globalNames[currentIndex] = newName;
        render()
    }
    function handleTyping(event) {
        if (event.key === 'Enter' && event.target.value.trim() !== '') {
            if(isEditing) {
                updateName(event.target.value);
             } else {
            insertName(event.target.value);
            }

            isEditing = false
            clearInput();
        }
    }

    inputName.focus();
    inputName.addEventListener('keyup', handleTyping)

}

function render() {
    function createDeleteButton(index) {
        function deleteName() {
            globalNames.splice(index, 1);
            render();
        }
        var button = document.createElement('a');
        button.addEventListener('click', deleteName)
        
        var image = document.createElement('i')
        image.id = 'deleteButton'
        image.classList = "tiny material-icons"
        image.textContent = 'delete_forever'
        button.appendChild(image)
        return button;

    }

    function createSpan(name, index) {
        function editItem() {
            inputName.value = name;
            inputName.focus();
            isEditing = true;
            currentIndex = index;
        }

        var span = document.createElement('span');
        span.id = "word"
        span.classList.add('clickable')
        span.textContent = name;
        span.addEventListener('click', editItem);
        
        return span
    }

    var divNames = document.querySelector('#names');
    divNames.innerHTML = '';

    var ul = document.createElement('ul');

    for (var i = 0; i < globalNames.length; i++) {
        var currentName = globalNames[i];

        var li = document.createElement('li');
        var button = createDeleteButton(i);
        var span = createSpan(currentName, i)

        
        li.appendChild(button)
        li.appendChild(span)
        ul.appendChild(li);
    }

    divNames.appendChild(ul)
    clearInput();
}

function clearInput() {
    inputName.value = '';
    inputName.focus();
}