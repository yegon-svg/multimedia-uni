
(function () {
  'use strict';

  // Backend API URL - change this if running backend on different server
  const API_URL = 'http://localhost:3001/api';

  /* ---------- Storage helpers ---------- */
  const storage = {
    get(key, def = null) {
      try { return JSON.parse(localStorage.getItem(key) || 'null') ?? def; } catch { return def; }
    },
    set(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
    remove(key) { localStorage.removeItem(key); }
  };

  /* ---------- API Fetch Helpers ---------- */
  async function apiCall(endpoint, options = {}) {
    try {
      const url = `${API_URL}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API Call Error (${endpoint}):`, error);
      throw error;
    }
  }

  /* ---------- Seed sample data if missing ---------- */
  function seedIfNeeded() {
    if (!storage.get('users')) storage.set('users', []);
    if (!storage.get('rentals')) storage.set('rentals', []);
    if (!storage.get('transactions')) storage.set('transactions', []);
    if (!storage.get('messages')) storage.set('messages', []);
  }

  /* ---------- Utilities ---------- */
  function q(id) { return document.getElementById(id); }
  function escapeHtml(s = '') { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }
  function nextId(list) { return list && list.length ? Math.max(...list.map(i => i.id)) + 1 : 1; }
  function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
  function validatePhone(phone) { return /^(\+254|0)[1-9]\d{8}$/.test(phone.replace(/\s/g, '')); }

  /* ---------- Auth (users) ---------- */
  function getCurrentUser() { return storage.get('currentUser', null); }
  function setCurrentUser(u) { storage.set('currentUser', u); }
  function clearCurrentUser() { storage.remove('currentUser'); }
  function updateUserInList(u) {
    const users = storage.get('users', []);
    const idx = users.findIndex(x => x.email === u.email);
    if (idx > -1) { users[idx] = u; storage.set('users', users); }
  }

  function signupUser({ fullname, email, password, phone }) {
    const users = storage.get('users', []);
    const normalizedEmail = (email||'').toString().trim().toLowerCase();
    if (!fullname || fullname.length < 3) throw new Error('Full name must be at least 3 characters');
    if (!validateEmail(normalizedEmail)) throw new Error('Invalid email format');
    if (password.length < 6) throw new Error('Password must be at least 6 characters');
    // phone is optional; validate only if provided
    if (phone && !validatePhone(phone)) throw new Error('Invalid phone format (use format: 0712345678)');
    if (users.find(u => (u.email||'').toString().trim().toLowerCase() === normalizedEmail)) throw new Error('Email already registered');

    const user = {
      id: Date.now(),
      fullname,
      email: normalizedEmail,
      password: btoa(password),
      phone: phone || '',
      profilePhoto: null,
      createdAt: new Date().toISOString(),
      rentals: 0
    };
    users.push(user);
    storage.set('users', users);
    setCurrentUser({ id: user.id, fullname: user.fullname, email: user.email, phone: user.phone, profilePhoto: user.profilePhoto });
    return user;
  }

  function loginUser({ email, password }) {
    const users = storage.get('users', []);
    const normalizedEmail = (email||'').toString().trim().toLowerCase();
    const u = users.find(x => (x.email||'').toString().trim().toLowerCase() === normalizedEmail);
    if (!u) throw new Error('Invalid email or password');

    // Support both base64-encoded passwords and plain stored passwords
    let storedPassword;
    try { storedPassword = atob(u.password); } catch (err) { storedPassword = u.password; }
    if (storedPassword !== password) throw new Error('Invalid email or password');

    setCurrentUser({ id: u.id, fullname: u.fullname, email: u.email, phone: u.phone, profilePhoto: u.profilePhoto, rentals: u.rentals || 0 });
    return u;
  }

  /* ---------- Admin auth (using backend API) ---------- */
  function getAdmins() { return storage.get('admins', []); }
  function setAdmins(a) { storage.set('admins', a); }
  function getCurrentAdmin() { return storage.get('currentAdmin', null); }
  function setCurrentAdmin(a) { storage.set('currentAdmin', a); }
  function clearCurrentAdmin() { storage.remove('currentAdmin'); }

  async function registerAdmin(email, password) {
    try {
      const admin = await apiCall('/admins/register', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      return admin;
    } catch (error) {
      throw error;
    }
  }

  async function loginAdmin(email, password) {
    try {
      const admin = await apiCall('/admins/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      return admin;
    } catch (error) {
      throw error;
    }
  }

  /* ---------- Bikes management (using backend API) ---------- */
  let bikesCache = [];
  
  async function getBikes() { 
    try {
      bikesCache = await apiCall('/bikes');
      return bikesCache;
    } catch (error) {
      console.warn('Failed to fetch bikes from backend:', error);
      return bikesCache;
    }
  }
  
  async function setBikes(list) { 
    bikesCache = list;
  }

  async function addBike(bike) {
    if (!bike.name || !bike.type) throw new Error('Bike name and type required');
    if (bike.price < 0) throw new Error('Invalid price');
    
    const newBike = await apiCall('/bikes', {
      method: 'POST',
      body: JSON.stringify(bike)
    });
    
    bikesCache.push(newBike);
    return newBike;
  }

  async function updateBike(updated) {
    const bike = await apiCall(`/bikes/${updated.id}`, {
      method: 'PUT',
      body: JSON.stringify(updated)
    });
    
    const idx = bikesCache.findIndex(b => b.id === updated.id);
    if (idx > -1) bikesCache[idx] = bike;
    
    return bike;
  }

  async function removeBike(id) {
    await apiCall(`/bikes/${id}`, {
      method: 'DELETE'
    });
    
    bikesCache = bikesCache.filter(b => b.id !== id);
  }

  /* ---------- Rentals & Transactions ---------- */
  function getRentals() { return storage.get('rentals', []); }
  function saveRental(r) {
    const rentals = getRentals();
    r.id = 'RNT' + Date.now();
    r.createdAt = new Date().toISOString();
    rentals.push(r);
    storage.set('rentals', rentals);
    localStorage.setItem('rentals_update_ts', Date.now());
    return r;
  }

  function saveTransaction(tx) {
    const txs = storage.get('transactions', []);
    tx.createdAt = new Date().toISOString();
    txs.push(tx);
    storage.set('transactions', txs);
  }

  function processMobilePayment(provider, mobile, pin, amount, userEmail) {
    return new Promise((resolve, reject) => {
      if (!provider || !mobile || !pin) return reject(new Error('Missing payment details'));
      if (!/^\d{4,6}$/.test(pin)) return reject(new Error('Invalid PIN format'));

      setTimeout(() => {
        if (pin === '0000') return reject(new Error('❌ Invalid PIN. Please try again.'));

        const tx = {
          id: 'TXN' + Math.floor(Math.random() * 900000 + 100000),
          provider,
          mobile: mobile.replace(/\s/g, ''),
          amount,
          userEmail,
          status: 'success',
          timestamp: new Date().toISOString()
        };
        saveTransaction(tx);
        resolve(tx);
      }, 1200);
    });
  }

  /* ---------- Messages/Contact ---------- */
  function getMessages() { return storage.get('messages', []); }
  function saveMessage(msg) {
    const messages = getMessages();
    msg.id = Date.now();
    msg.status = 'pending';
    msg.createdAt = new Date().toISOString();
    messages.unshift(msg);
    storage.set('messages', messages);
    localStorage.setItem('messages_update_ts', Date.now());
    return msg;
  }

  function replyToMessage(msgId, response) {
    const messages = getMessages();
    const idx = messages.findIndex(m => m.id === msgId);
    if (idx === -1) return false;
    messages[idx].response = response;
    messages[idx].status = 'replied';
    messages[idx].repliedAt = new Date().toISOString();
    storage.set('messages', messages);
    localStorage.setItem('messages_update_ts', Date.now());
    return true;
  }

  /* ---------- UI helpers ---------- */
  function showNotificationBar(msg, type = 'success', timeout = 2500) {
    const bar = q('notificationBar');
    if (!bar) return;
    bar.textContent = msg;
    bar.style.display = 'block';
    bar.className = 'notification-bar ' + type;
    setTimeout(() => bar.style.display = 'none', timeout);
  }

  /* ---------- Profile photo upload ---------- */
  function wireProfilePhotoUpload() {
    const input = q('profilePhotoInput');
    if (!input) return;
    input.addEventListener('change', function (e) {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (file.size > 100* 1024 * 1024) { showNotificationBar('❌ File too large (max 5MB)', 'error'); return; }
      if (!file.type.startsWith('image/')) { showNotificationBar('❌ Please upload an image file', 'error'); return; }

      const reader = new FileReader();
      reader.onload = function (ev) {
        const dataUrl = ev.target.result;
        const user = getCurrentUser();
        if (!user) return showNotificationBar('❌ Please login first', 'error');
        user.profilePhoto = dataUrl;
        setCurrentUser(user);
        updateUserInList({ ...user, profilePhoto: dataUrl });
        const photoEl = q('profilePhoto');
        if (photoEl) photoEl.src = dataUrl;
        showNotificationBar('✅ Profile photo updated successfully', 'success');
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    });
  }

  /* ---------- Admin page ---------- */
  function wireAdminPage() {
    const adminRegisterForm = q('adminRegisterForm');
    const adminLoginForm = q('adminLoginForm');

    if (adminRegisterForm) {
      adminRegisterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
          const email = q('regEmail').value.trim();
          const pw = q('regPassword').value;
          await registerAdmin(email, pw);
          q('registerMessage').style.color = '#10b981';
          q('registerMessage').textContent = '✅ Admin created! Please login.';
          setTimeout(() => { q('registerMessage').textContent = ''; }, 2000);
          adminRegisterForm.reset();
        } catch (err) {
          q('registerMessage').style.color = '#ef4444';
          q('registerMessage').textContent = '❌ ' + err.message;
        }
      });
    }

    if (adminLoginForm) {
      adminLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
          const email = q('loginEmail').value.trim();
          const pw = q('loginPassword').value;
          const admin = await loginAdmin(email, pw);
          setCurrentAdmin(admin);
          showAdminDashboard();
          showNotificationBar('✅ Admin login successful', 'success');
        } catch (err) {
          if (q('loginMessage')) q('loginMessage').textContent = '❌ ' + err.message;
        }
      });
    }

    const addBikeForm = q('addBikeForm');
    if (addBikeForm) {
      const fileInput = q('bikeImageFile');
      const hiddenImage = q('bikeImage');
      const preview = q('bikeImagePreview');

      if (fileInput && preview && hiddenImage) {
        fileInput.addEventListener('change', (ev) => {
          const file = ev.target.files && ev.target.files[0];
          if (!file) { preview.innerHTML = ''; hiddenImage.value = ''; return; }
          const reader = new FileReader();
          reader.onload = function (fe) {
            hiddenImage.value = fe.target.result;
            preview.innerHTML = `<img src="${fe.target.result}" style="width:100%;height:120px;object-fit:cover;border-radius:8px;">`;
          };
          reader.readAsDataURL(file);
        });
      }

      addBikeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
          const name = q('bikeName').value.trim();
          const type = q('bikeType').value.trim();
          const price = Number(q('bikePrice').value) || 0;
          const description = q('bikeDescription') ? q('bikeDescription').value.trim() : '';
          const imageData = q('bikeImage').value || 'images/placeholder.png';
          const available = q('bikeAvail').value === 'true';
          await addBike({ name, type, price, description, image: imageData, available });
          showNotificationBar('✅ Bike added successfully', 'success');
          addBikeForm.reset();
          if (preview) preview.innerHTML = '';
          await loadAdminTables();
        } catch (err) {
          showNotificationBar('❌ ' + err.message, 'error');
        }
      });
    }

    document.addEventListener('click', async (ev) => {
      const el = ev.target;
      if (el.matches('[data-action="delete-user"]')) {
        const email = el.dataset.email;
        if (!confirm('Delete user and their rentals?')) return;
        let users = storage.get('users', []);
        users = users.filter(u => u.email !== email);
        storage.set('users', users);
        let rentals = storage.get('rentals', []);
        rentals = rentals.filter(r => r.userEmail !== email);
        storage.set('rentals', rentals);
        showNotificationBar('✅ User deleted', 'success');
        await loadAdminTables();
      }
      if (el.matches('[data-action="delete-bike"]')) {
        const id = Number(el.dataset.id);
        if (!confirm('Delete bike?')) return;
        try {
          await removeBike(id);
          showNotificationBar('✅ Bike deleted', 'success');
          await loadAdminTables();
        } catch (err) {
          showNotificationBar('❌ ' + err.message, 'error');
        }
      }
      if (el.matches('[data-action="toggle-bike"]')) {
        const id = Number(el.dataset.id);
        const bikes = await getBikes();
        const b = bikes.find(x => x.id === id);
        if (!b) return;
        b.available = !b.available;
        try {
          await updateBike(b);
          showNotificationBar(`✅ Bike marked as ${b.available ? 'available' : 'unavailable'}`, 'success');
          await loadAdminTables();
        } catch (err) {
          showNotificationBar('❌ ' + err.message, 'error');
        }
      }
      if (el.matches('[data-action="edit-bike"]')) {
        const id = Number(el.dataset.id);
        const bikes = await getBikes();
        const b = bikes.find(x => x.id === id);
        if (!b) return alert('Bike not found');
        const name = prompt('Name:', b.name);
        if (!name) return;
        const type = prompt('Type:', b.type) || b.type;
        const price = parseFloat(prompt('Price/hour (KES):', b.price) || b.price);
        b.name = name;
        b.type = type;
        b.price = price;
        try {
          await updateBike(b);
          showNotificationBar('✅ Bike updated', 'success');
          await loadAdminTables();
        } catch (err) {
          showNotificationBar('❌ ' + err.message, 'error');
        }
      }
    });
  }

  function showAdminAuth() {
    const authArea = q('authArea');
    const dash = q('dashboard');
    if (authArea) authArea.style.display = '';
    if (dash) dash.style.display = 'none';
  }

  function showAdminDashboard() {
    const authArea = q('authArea');
    const dash = q('dashboard');
    if (authArea) authArea.style.display = 'none';
    if (dash) dash.style.display = '';
    loadAdminTables();
  }

  async function loadAdminTables() {
    const users = storage.get('users', []);
    const bikes = await getBikes();
    const rentals = storage.get('rentals', []);

    const userTbody = document.querySelector('#userTable tbody');
    if (userTbody) {
      userTbody.innerHTML = users.map(u => `
        <tr>
          <td>${escapeHtml(u.fullname || '')}</td>
          <td>${escapeHtml(u.email || '')}</td>
          <td>${escapeHtml(u.phone || '')}</td>
          <td>${u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
          <td>
            <button class="btn" data-action="delete-user" data-email="${u.email}">Delete</button>
          </td>
        </tr>
      `).join('') || '<tr><td colspan="5">No users</td></tr>';
    }

    const bikesTbody = document.querySelector('#bikesTable tbody');
    if (bikesTbody) {
      bikesTbody.innerHTML = bikes.map(b => `
        <tr>
          <td><img src="${b.image}" alt="${escapeHtml(b.name)}" style="width:60px;height:40px;object-fit:cover;border-radius:6px"></td>
          <td>${escapeHtml(b.name)}</td>
          <td>${escapeHtml(b.type)}</td>
          <td>KES ${b.price.toLocaleString()}/hr</td>
          <td><span style="color:${b.available ? '#10b981' : '#ef4444'}">${b.available ? '✓ Available' : '✗ Unavailable'}</span></td>
          <td>
            <button class="btn" data-action="toggle-bike" data-id="${b.id}">Toggle</button>
            <button class="btn" data-action="edit-bike" data-id="${b.id}">Edit</button>
            <button class="btn danger" data-action="delete-bike" data-id="${b.id}">Delete</button>
          </td>
        </tr>
      `).join('') || '<tr><td colspan="6">No bikes</td></tr>';
    }

    const rentTbody = document.querySelector('#rentalsTable tbody');
    if (rentTbody) {
      rentTbody.innerHTML = rentals.map(r => `
        <tr>
          <td>${r.id}</td>
          <td>${escapeHtml(r.userName || '')}</td>
          <td>${escapeHtml(r.bikeName || '')}</td>
          <td>${r.hours || '1'} hour(s)</td>
          <td>${r.startDate}</td>
          <td>${r.paid ? '✓ Paid' : '✗ Pending'}</td>
        </tr>
      `).join('') || '<tr><td colspan="6">No rentals</td></tr>';
    }
  }

  /* ---------- Rent page ---------- */
  function wireRentPage() {
    const bikesListEl = q('bikesList');
    const rentalDetailsEl = q('rentalDetails');
    const checkoutFormEl = q('checkoutForm');
    if (!bikesListEl) return;

    async function renderBikes() {
      try {
        bikesListEl.innerHTML = '<p style="text-align: center; color: #5b0be5; font-weight: 600; padding: 40px 20px;">⏳ Loading bikes...</p>';
        
        const bikes = await getBikes();
        
        if (!bikes || bikes.length === 0) {
          bikesListEl.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
              <p style="color: #ef4444; font-weight: 600; margin-bottom: 15px;">No bikes available</p>
              <button onclick="location.reload()" style="padding: 10px 20px; background: #5b0be5; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">🔄 Refresh</button>
            </div>
          `;
          return;
        }
        
        bikesListEl.innerHTML = bikes.map(b => `
          <div class="bike-card" data-id="${b.id}" style="border:${b.available ? '' : '2px dashed #cbd5e1'}">
            <div class="bike-image"><img src="${b.image}" alt="${escapeHtml(b.name)}" /></div>
            <div class="bike-info">
              <h3>${escapeHtml(b.name)}</h3>
              <p class="small">${escapeHtml(b.type)}</p>
              <p class="small" style="color:#64748b">${escapeHtml(b.description || '')}</p>
              <div class="bike-price">KES ${b.price.toLocaleString()}/hour</div>
              <button class="btn rent-btn" data-id="${b.id}" ${b.available ? '' : 'disabled'} style="width:100%">${b.available ? '🚴 Rent Now' : '❌ Unavailable'}</button>
            </div>
          </div>
        `).join('');
        bikesListEl.querySelectorAll('.rent-btn').forEach(btn => btn.addEventListener('click', onRentClick));
      } catch (err) {
        console.error('Error rendering bikes:', err);
        bikesListEl.innerHTML = `
          <div style="text-align: center; padding: 40px 20px;">
            <p style="color: #ef4444; font-weight: 600; margin-bottom: 10px;">⚠️ Failed to load bikes</p>
            <p style="color: #64748b; font-size: 0.9em; margin-bottom: 15px;">Make sure the backend server is running:</p>
            <code style="background: #f7f7fa; padding: 10px; border-radius: 6px; display: inline-block; color: #222; font-family: monospace;">npm start</code>
            <div style="margin-top: 15px;">
              <button onclick="location.reload()" style="padding: 10px 20px; background: #5b0be5; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">🔄 Retry</button>
            </div>
          </div>
        `;
      }
    }

    function onRentClick(e) {
      const id = Number(e.currentTarget.dataset.id);
      const bike = bikesCache.find(x => x.id === id);
      if (!bike) return showNotificationBar('❌ Bike not found', 'error');
      const currentUser = getCurrentUser();
      if (!currentUser) {
        showNotificationBar('❌ Please login to rent', 'error');
        setTimeout(() => window.location.href = 'login.html', 800);
        return;
      }

      // Redirect to checkout page with bike ID
      window.location.href = `checkout.html?bikeId=${bike.id}`;
    }

    // Call renderBikes without await to display loading state, then re-call after bikes load
    renderBikes();
    
    window.addEventListener('storage', (ev) => {
      if (ev.key === 'bikes' || ev.key === 'bikes_update_ts' || ev.key === 'rentals_update_ts') renderBikes();
    });
  }

  /* ---------- Auth forms ---------- */
  function wireAuthForms() {
    const signupForm = q('signupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
          const fullname = q('signupName').value.trim();
          const email = (q('signupEmail').value || '').trim().toLowerCase();
          const pw = q('signupPassword').value;
          const phone = q('signupPhone') ? q('signupPhone').value.trim() : '';

          // create user
          const user = signupUser({ fullname, email, password: pw, phone });

          // If there are fewer than 2 admins and this user is among the first two registered users, offer admin registration
          const admins = getAdmins();
          const users = storage.get('users', []);
          if ((admins.length < 2) && (users.length <= 2)) {
            if (confirm('You are among the first two registered users. Would you like to register as an admin now?')) {
              try {
                registerAdmin(email, pw);
                const admin = getAdmins().find(a => a.email === email);
                if (admin) setCurrentAdmin({ id: admin.id, email: admin.email });
                showNotificationBar('✅ Admin account created! Redirecting to admin portal...', 'success');
                setTimeout(() => window.location.href = 'admin.html', 1200);
                return;
              } catch (err) {
                showNotificationBar('❌ Admin registration failed: ' + err.message, 'error', 3500);
              }
            }
          }

          showNotificationBar('✅ Account created! Redirecting...', 'success');
          setTimeout(() => window.location.href = 'index.html', 1500);
        } catch (err) {
          showNotificationBar('❌ ' + err.message, 'error', 3500);
        }
      });
    }

    const loginForm = q('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
          const email = q('loginEmail').value.trim();
          const pw = q('loginPassword').value;
          loginUser({ email, password: pw });
          updateUserUIIndex();
          showNotificationBar('✅ Login successful!', 'success');
          setTimeout(() => window.location.href = 'index.html', 800);
        } catch (err) {
          showNotificationBar('❌ ' + err.message, 'error', 3500);
        }
      });
    }
  }

  /* ---------- Index page ---------- */
  function updateUserUIIndex() {
    const user = getCurrentUser();
    const userDisplay = q('userDisplay');
    const logoutBtn = q('logoutBtn');
    const rentNav = q('rentNav');
    const profileSection = q('profileSection');
    if (!userDisplay || !logoutBtn || !rentNav || !profileSection) return;

    if (user) {
      userDisplay.textContent = `👋 Welcome, ${escapeHtml(user.fullname || user.email)}!`;
      logoutBtn.style.display = 'inline-block';
      rentNav.style.display = 'inline-block';
      profileSection.style.display = 'block';
      const photoEl = q('profilePhoto');
      const detailsEl = q('profileDetails');
      if (photoEl) photoEl.src = user.profilePhoto || 'mesh.jpeg';
      if (detailsEl) {
        detailsEl.innerHTML = `
          <strong>${escapeHtml(user.fullname || 'User')}</strong>
          <div style="color:#64748b;font-size:0.9rem;margin:4px 0">
            📧 ${escapeHtml(user.email)}<br>
            📱 ${escapeHtml(user.phone || 'N/A')}
          </div>
        `;
      }
    } else {
      userDisplay.textContent = '';
      logoutBtn.style.display = 'none';
      rentNav.style.display = 'none';
      profileSection.style.display = 'none';
    }
  }

  function wireIndexPage() {
    const logoutBtn = q('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        // Prefer global logout if defined to keep behavior consistent
        if (typeof logout === 'function') { logout(); return; }
        clearCurrentUser();
        updateUserUIIndex();
        showNotificationBar('✅ Logged out successfully', 'success');
        setTimeout(() => location.href = 'login.html', 600);
      });
    }
    wireProfileControls();
    updateUserUIIndex();
  }

  // Refresh index UI when a logout occurs elsewhere (e.g., auth.js)
  window.addEventListener('user:logout', () => {
    clearCurrentUser();
    updateUserUIIndex();
  });

  function wireProfileControls() {
    wireProfilePhotoUpload();
  }

  window.editProfile = function () {
    const u = getCurrentUser();
    if (!u) return showNotificationBar('❌ Please login first', 'error');
    const name = prompt('Edit your name:', u.fullname);
    if (name === null) return;
    const phone = prompt('Edit your phone:', u.phone || '');
    if (phone === null) return;
    if (!name.trim()) return showNotificationBar('❌ Name cannot be empty', 'error');
    if (!validatePhone(phone)) return showNotificationBar('❌ Invalid phone format', 'error');
    u.fullname = name;
    u.phone = phone;
    setCurrentUser(u);
    updateUserInList(u);
    updateUserUIIndex();
    showNotificationBar('✅ Profile updated successfully', 'success');
  };

  window.triggerPhotoUpload = function () {
    const el = q('profilePhotoInput');
    if (el) el.click();
  };

  /* ---------- Initialization ---------- */
  function init() {
    seedIfNeeded();
    wireAuthForms();
    wireIndexPage();
    wireAdminPage();
    wireRentPage();

    if (q('authArea') && q('dashboard')) {
      if (getCurrentAdmin()) showAdminDashboard();
      else showAdminAuth();
    }

    updateUserUIIndex();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  window.app = {
    getBikes,
    addBike,
    updateBike,
    removeBike,
    getRentals,
    getCurrentUser,
    loginUser,
    signupUser,
    getMessages,
    saveMessage,
    replyToMessage
  };

  // Initialize bikes cache on page load
  getBikes().catch(err => {
    console.warn('Failed to load bikes on startup:', err);
  });

})();

