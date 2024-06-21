document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const dataList = document.getElementById('dataList');
    const clearButton = document.getElementById('clearButton');
    const searchInput = document.getElementById('searchInput');

    // Função para carregar dados do Local Storage
    function loadData() {
        const storedData = JSON.parse(localStorage.getItem('formData')) || [];
        storedData.forEach(item => {
            renderListItem(item);
        });
    }

    // Função para salvar dados no Local Storage
    function saveData(data) {
        const storedData = JSON.parse(localStorage.getItem('formData')) || [];
        storedData.push(data);
        localStorage.setItem('formData', JSON.stringify(storedData));
    }

    // Função para renderizar um item na lista
    function renderListItem(item) {
        const li = document.createElement('li');
        li.textContent = `${item.date} - ${item.email} - ${item.name}`;

        // Botão para excluir o item
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            // Remove o item da lista visualmente
            dataList.removeChild(li);
            
            // Remove o item do Local Storage
            removeFromLocalStorage(item);
        });

        li.appendChild(deleteButton);
        dataList.appendChild(li);

        // Ajusta a visibilidade do item de acordo com a pesquisa
        const searchTerm = searchInput.value.toLowerCase();
        const text = li.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            li.style.display = 'block';
        } else {
            li.style.display = 'none';
        }
    }

    // Função para remover item do Local Storage
    function removeFromLocalStorage(itemToRemove) {
        let storedData = JSON.parse(localStorage.getItem('formData')) || [];
        storedData = storedData.filter(item => {
            return !(item.date === itemToRemove.date && 
                     item.email === itemToRemove.email && 
                     item.name === itemToRemove.name);
        });
        localStorage.setItem('formData', JSON.stringify(storedData));
    }

    // Evento de envio do formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário

        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const date = new Date().toLocaleString();

        const data = { email, name, date };

        // Adiciona os dados na lista
        renderListItem(data);

        // Salva os dados no Local Storage
        saveData(data);

        // Limpa os campos do formulário
        form.reset();
    });

    // Evento para limpar os campos do formulário e apagar todos os itens da lista
    clearButton.addEventListener('click', function() {
        // Remove todos os itens da lista visualmente
        while (dataList.firstChild) {
            dataList.removeChild(dataList.firstChild);
        }

     // Limpa os dados do Local Storage
     localStorage.removeItem('formData');
    });

    // Evento de pesquisa
    searchInput.addEventListener('keyup', function() {
        const items = dataList.getElementsByTagName('li');
        const searchTerm = searchInput.value.toLowerCase();
        
        Array.from(items).forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Carrega os dados do Local Storage ao carregar a página
    loadData();
});
