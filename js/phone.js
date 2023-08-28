const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAll = document.getElementById('show-all');
    if (phones.length > 12 && !isShowAll) {
        showAll.classList.remove('hidden');
    } else {
        showAll.classList.add('hidden');
    }
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        // console.log(phone);
        const phoneCart = document.createElement('div');
        phoneCart.classList = `card bg-base-100 p-4 shadow-xl`;
        phoneCart.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
        <h2 class="card-title">${phone['phone_name']}</h2>
        <p>There are many variations of passages of available, but the majority have suffered</p>
        <h2 class="card-title">$999</h2>
        <div class="card-actions mt-4">
            <button onclick="handelShowDetails('${phone.slug}')"  class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCart);
    });
    loadSpin(false);

}

const handelShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    console.log(data);
    displayPhoneDetails(phone);
}
const displayPhoneDetails = (phone) => {
    my_modal_5.showModal()
    const showModal = document.getElementById('show-modal');
    showModal.innerHTML = `
    <img class="p-4 w-52 mx-auto" src="${phone.image}" alt="">
    <p class="text-4xl font-bold">${phone.name}</p>
    <p class="text-sm text-[#706F6F] mt-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p class="text-sm text-[#706F6F] mt-4"><span class="text-[#403F3F] font-bold">Storage: </span>${phone.mainFeatures.storage}</p>
    <p class="text-sm text-[#706F6F] mt-4"><span class="text-[#403F3F] font-bold">Display size: </span>${phone.mainFeatures.displaySize}</p>
    <p class="text-sm text-[#706F6F] mt-4"><span class="text-[#403F3F] font-bold">ChipSet: </span>${phone.mainFeatures.chipSet}</p>
    <p class="text-sm text-[#706F6F] mt-4"><span class="text-[#403F3F] font-bold">Memory: </span>${phone.mainFeatures.memory}</p>
    <p class="text-sm text-[#706F6F] mt-4"><span class="text-[#403F3F] font-bold">Slug: </span>${phone.slug}</p>
    <p class="text-sm text-[#706F6F] mt-4"><span class="text-[#403F3F] font-bold">Release date: </span>${phone?.releaseDate}</p>
    <p class="text-sm text-[#706F6F] mt-4"><span class="text-[#403F3F] font-bold">Brand: </span>${phone.brand}</p>
    <p class="text-sm text-[#706F6F] mt-4"><span class="text-[#403F3F] font-bold">GPS: </span>${phone?.others?.GPS || 'No GPS'}</p>
    <div class="modal-action">
        <button class="btn btn-primary">Close</button>
    </div>
    `;
}

const handelSearch = (isShowAll) => {
    loadSpin(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const loadSpin = (isLoading) => {
    const loading = document.getElementById('load-spin');
    if (isLoading) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}

const handelShowAll = () => {
    handelSearch(true);
}

// loadPhone()