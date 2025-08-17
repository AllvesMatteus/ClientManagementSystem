const SUPABASE_URL = "https://lmmjgjueorbpehrspslm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtbWpnanVlb3JicGVocnNwc2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMDA2NzYsImV4cCI6MjA3MDY3NjY3Nn0.Cm1wObpbVF2kpo3qJy3jEvcd3woI1QvL67OJQ2TgD4g";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const customerForm = document.getElementById('customerForm');
const customerTableBody = document.getElementById('customerTableBody');
const mobileCustomerList = document.getElementById('mobileCustomerList');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const phoneInput = document.getElementById('phone');

let allCustomers = [];
let editingCustomerId = null;

phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) {
        value = value.slice(0, 16);
    }

    let formatted = '';
    if (value.length > 0) {
        formatted = '(' + value.substring(0, 2);
    }
    if (value.length > 2) {
        formatted += ') ' + value.substring(2, 3);
    }
    if (value.length > 3) {
        formatted += ' ' + value.substring(3, 7);
    }
    if (value.length > 7) {
        formatted += '-' + value.substring(7, 16);
    }

    e.target.value = formatted;
});

async function loadCustomers(searchTerm = "") {
    let query = supabaseClient
        .from('clientes')
        .select('*')
        .order('id', { ascending: false });

    if (searchTerm) {
        query = query.ilike('nome', `%${searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error(error);
        return;
    }

    allCustomers = data || [];
    renderCustomers(allCustomers, searchTerm);
}

function renderCustomers(customers, searchTerm = "") {
    customerTableBody.innerHTML = '';
    mobileCustomerList.innerHTML = '';

    let filtered = customers;
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = customers.filter(c =>
            (c.nome || '').toLowerCase().includes(term) ||
            (c.telefone || '').toLowerCase().includes(term) ||
            (c.email || '').toLowerCase().includes(term) ||
            (c.status || '').toLowerCase().includes(term)
        );
    }

    if (filtered.length === 0) {
        noResults.classList.remove('hidden');
        return;
    } else {
        noResults.classList.add('hidden');
    }

    filtered.forEach(c => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 transition';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${c.nome}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${c.telefone || ''}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${c.email || ''}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${c.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${c.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="editCustomer(${c.id})" class="text-blue-600 hover:text-blue-900 transition mr-2">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button onclick="deleteCustomer(${c.id})" class="text-red-600 hover:text-red-900 transition">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        customerTableBody.appendChild(row);
    });

    filtered.forEach(c => {
        const card = document.createElement('div');
        card.className = 'mobile-card bg-white p-4 rounded-lg shadow-xs hover:shadow-sm transition cursor-pointer';
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="font-medium text-gray-900">${c.nome}</h3>
                    <p class="text-sm text-gray-500 mt-1">${c.telefone || ''}</p>
                    <p class="text-sm text-gray-500">${c.email || ''}</p>
                </div>
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${c.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${c.status}
                </span>
            </div>
            <div class="mt-3 flex justify-end">
                <button onclick="editCustomer(${c.id})" class="text-blue-600 hover:text-blue-900 transition px-3 py-1 rounded-md text-sm font-medium">
                    <i class="fas fa-pencil-alt mr-1"></i> Editar
                </button>
                <button onclick="deleteCustomer(${c.id})" class="text-red-600 hover:text-red-900 transition px-3 py-1 rounded-md text-sm font-medium">
                    <i class="fas fa-trash-alt mr-1"></i> Excluir
                </button>
            </div>
        `;
        mobileCustomerList.appendChild(card);
    });
}

function showToast(message, type = 'success') {
    const toastNotification = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = toastNotification.querySelector('svg');

    toastMessage.textContent = message;

    toastNotification.classList.remove('bg-green-100', 'bg-red-100', 'text-green-500', 'text-red-500');
    toastIcon.classList.remove('text-green-500', 'text-red-500');
    toastNotification.querySelector('div:first-child').classList.remove('bg-green-100', 'bg-red-100');

    if (type === 'success') {
        toastNotification.querySelector('div:first-child').classList.add('bg-green-100');
        toastIcon.classList.add('text-green-500');
        toastIcon.innerHTML = '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>';
    } else if (type === 'error') {
        toastNotification.querySelector('div:first-child').classList.add('bg-red-100');
        toastIcon.classList.add('text-red-500');
        toastIcon.innerHTML = '<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>';
    }

    toastNotification.classList.remove('hidden');

    setTimeout(() => {
        toastNotification.classList.add('hidden');
    }, 3000);
}

document.querySelector('#toast-notification button[data-dismiss-target="#toast-notification"]').addEventListener('click', () => {
    document.getElementById('toast-notification').classList.add('hidden');
});

async function saveCustomer(event) {
    event.preventDefault();
    const nome = document.getElementById('name').value;
    const telefone = document.getElementById('phone').value.replace(/\D/g, '');
    const email = document.getElementById('email').value;
    const status = document.getElementById('status').value;

    if (editingCustomerId) {
        const { data, error } = await supabaseClient
            .from('clientes')
            .select('id')
            .or(`nome.eq.${nome},email.eq.${email},telefone.eq.${telefone}`)
            .not('id', 'eq', editingCustomerId);

        if (error) {
            showToast('Erro ao verificar duplicados!', 'error');
            console.error(error);
            return;
        }

        if (data.length > 0) {
            showToast('Cliente com mesmo nome, e-mail ou telefone já existe!', 'error');
            return;
        }

        const { updateError } = await supabaseClient
            .from('clientes')
            .update({ nome, telefone, email, status })
            .eq('id', editingCustomerId);

        if (updateError) {
            showToast('Erro ao atualizar cliente!', 'error');
            console.error(updateError);
        } else {
            customerForm.reset();
            loadCustomers();
            showToast('Cliente atualizado com sucesso!', 'success');
            editingCustomerId = null;
            document.getElementById('formSubmitButton').innerHTML = '<i class="fas fa-user-plus mr-2"></i> Adicionar Cliente';
        }
    } else {
        const { data, error } = await supabaseClient
            .from('clientes')
            .select('id')
            .or(`nome.eq.${nome},email.eq.${email},telefone.eq.${telefone}`);

        if (error) {
            showToast('Erro ao verificar duplicados!', 'error');
            console.error(error);
            return;
        }

        if (data.length > 0) {
            showToast('Cliente com mesmo nome, e-mail ou telefone já existe!', 'error');
            return;
        }

        const { error: insertError } = await supabaseClient
            .from('clientes')
            .insert([{ nome, telefone, email, status }]);

        if (insertError) {
            showToast('Erro ao cadastrar cliente!', 'error');
            console.error(insertError);
        } else {
            customerForm.reset();
            loadCustomers();
            showToast('Cliente cadastrado com sucesso!', 'success');
        }
    }
}

function editCustomer(id) {
    const customer = allCustomers.find(c => c.id === id);
    if (customer) {
        document.getElementById('name').value = customer.nome;
        document.getElementById('phone').value = customer.telefone;
        document.getElementById('email').value = customer.email;
        document.getElementById('status').value = customer.status;

        editingCustomerId = id;
        document.getElementById('formSubmitButton').innerHTML = '<i class="fas fa-save mr-2"></i> Atualizar Cliente';
        window.scrollTo(0, 0);
    }
}

async function deleteCustomer(id) {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;
    const { error } = await supabaseClient
        .from('clientes')
        .delete()
        .eq('id', id);

    if (error) {
        showToast('Erro ao excluir cliente!', 'error');
        console.error(error);
    } else {
        loadCustomers();
        showToast('Cliente excluído com sucesso!', 'success');
    }
}

searchInput.addEventListener('input', function () {
    const searchTerm = this.value.trim();
    renderCustomers(allCustomers, searchTerm);
});

customerForm.addEventListener('submit', saveCustomer);
loadCustomers();

document.getElementById('mobileMenuButton').addEventListener('click', function () {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('hidden');
});

document.getElementById('closeMobileMenuButton').addEventListener('click', function () {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.add('hidden');
});