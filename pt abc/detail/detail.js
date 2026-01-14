(function(){
  const passengerList = document.getElementById('passengerList');
  const addBtn = document.getElementById('addPassengerBtn');

  let idx = 0;
  function createPassengerFields(name = '') {
    idx++;
    const wrapper = document.createElement('div');
    wrapper.className = 'passenger-item';
    wrapper.innerHTML = `
      <div class="pi-row">
        <div class="field small">
          <label>Nama Penumpang</label>
          <input type="text" name="passengerName[]" placeholder="Nama lengkap" required value="${name}">
        </div>
        <div class="field small">
          <label>Jenis Kelamin</label>
          <select name="passengerGender[]">
            <option value="M">Laki-laki</option>
            <option value="F">Perempuan</option>
          </select>
        </div>
        <div class="remove-wrap">
          <button type="button" class="btn remove">Hapus</button>
        </div>
      </div>
    `;
    wrapper.querySelector('.remove').addEventListener('click', () => {
      wrapper.remove();
    });
    passengerList.appendChild(wrapper);
  }

  createPassengerFields();

  addBtn.addEventListener('click', () => createPassengerFields());
})();