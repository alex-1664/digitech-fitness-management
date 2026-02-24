<!DOCTYPE html>
<html>
<head>
  <title>Digitech Fitness Management</title>
</head>
<body style="font-family: Arial; text-align:center; padding:40px;">
  <h1>🏋️ Digitech Fitness Management System</h1>
  <h2>Ishiara Branch</h2>
  <p>Status: <b>System Running</b></p>

  <h3>Register New Member</h3>
  <input type="text" id="name" placeholder="Member Name">
  <input type="text" id="plan" placeholder="Plan (Weekly/Monthly)">
  <button onclick="addMember()">Add Member</button>

  <h3>Members List</h3>
  <button onclick="loadMembers()">View Members</button>
  <div id="members"></div>

  <script>
    async function loadMembers() {
      const res = await fetch('/api/members');
      const data = await res.json();
      let html = "<ul>";
      data.forEach(m => {
        html += `<li>${m.name} (${m.plan}) 
                 <button onclick="deleteMember('${m.id}')">Delete</button>
                 </li>`;
      });
      html += "</ul>";
      document.getElementById('members').innerHTML = html;
    }

    async function addMember() {
      const name = document.getElementById('name').value;
      const plan = document.getElementById('plan').value;
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, plan })
      });
      if (res.ok) {
        document.getElementById('name').value = '';
        document.getElementById('plan').value = '';
        loadMembers();
      } else {
        alert("Failed to add member");
      }
    }

    async function deleteMember(id) {
      const res = await fetch(`/api/members/${id}`, { method: 'DELETE' });
      if (res.ok) loadMembers();
    }
  </script>
</body>
</html>
