function loadServers() {
    // This will get the servers from data.json
    fetch('assets/json/data.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // This will get the servers from data.json
            var servers = data.servers;
            // Add the top server icon, which is the logo
            var output = `
                        <div class="server-icon-container">
                            <img src="assets/img/DOScord-server-icon.png" class="server-icon" alt="DOScord logo">
                        </div>
                        `;

            // Add remaining servers in the format <img src=server[i].image class="server-icon" alt=server[i].name>
            for(var server in servers) {
                output += `
                        <img src="${servers[server].image}" class="server-icon" alt="${servers[server].name}">
                        `;
            }
            document.getElementById('Servers').innerHTML = output;
        })
        .catch(error => console.error(error));
}

window.onload = function() {
    loadServers();
  };