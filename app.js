function loadServers() {
    let servers = data.Servers;
    // Add the top server icon, which is the logo
    let output = `
                <div class="server-icon-container">
                    <img src="assets/img/DOScord-server-icon.png" class="server-icon" alt="DOScord logo">
                </div>
                `;

    // Add remaining servers in the format <img src=server[i].image class="server-icon" alt=server[i].name>
    for (let server in servers) {
        output += `
                    <img src="${servers[server].image}" data="${servers[server].name}" class="server-icon" alt="${servers[server].name} ">
                    `;
    }
    document.getElementById('Servers').innerHTML = output;
}

function addServerListeners() {
    // Attach a click listener to server-icon-container
    document.getElementById('Servers').addEventListener('click', function (e) {
        // If the click target is a server icon
        if (e.target.classList.contains('server-icon')) {
            let servers = data.Servers;
            for (let server in servers) {
                if (servers[server].name === e.target.getAttribute('data')) {
                    loadServer(servers[server]);
                }
            }
        }
    });
}

function loadServer(server) {
    // Add the server name to the title
    currentServer = server.name;
    document.getElementById('Server-Name').innerHTML = currentServer;

    // Set the channel name to the first channel in the server
    currentChannel = server.channels[0].name;
    document.getElementById('Channel-Name').innerHTML = currentChannel;

    // Load the chat messages from the first channel in the server
    let chat = server.channels[0].chat;
    parseChat(chat);

    // Add the channel names to the channel list
    let channelOutput = '';
    for (let channel in server.channels) {
        let channelName = server.channels[channel].name;
        let classes = (channelName === currentChannel) ? 'channel-item active' : 'channel-item';
        channelOutput += `<li class="${classes}" data="${channelName}">#${channelName}</li>`;
    }
    document.getElementById('Channels').innerHTML = channelOutput;
}

function addChannelListeners() {
    document.getElementById('Channels').addEventListener('click', function (e) {
        // If the click target is a channel (list item with class channel-item)
        if (e.target.classList.contains('channel-item')) {
            // Get the data attribute of the channel
            let channelName = e.target.getAttribute('data');
            // Set the channel name to the clicked channel
            currentChannel = channelName;
            document.getElementById('Channel-Name').innerHTML = currentChannel;
            // Load the chat messages from the clicked channel
            let servers = data.Servers;
            for (let server in servers) {
                if (servers[server].name === currentServer) {
                    for (let channel in servers[server].channels) {
                        if (servers[server].channels[channel].name === currentChannel) {
                            let chat = servers[server].channels[channel].chat;
                            parseChat(chat);
                            break;
                        }
                    }
                }
            }

            // Now set the clicked channel to active and the rest to inactive
            let channels = document.getElementsByClassName('channel-item');
            for (let channel of channels) {
                channel.classList.remove('active');
            }
            e.target.classList.add('active');
        }
    });
}

function findChat(serverName, channelName) {
    let servers = data.Servers;
    // Awful nested for loop to find the chat
    for (let server in servers) {
        if (servers[server].name === serverName) {
            for (let channel in servers[server].channels) {
                if (servers[server].channels[channel].name === channelName) {
                    return servers[server].channels[channel].chat;
                }
            }
        }
    }
}

function parseChat(chat) {
    // Add the chat messages to the chat window
    let output = '';
    for (let message in chat) {
        output += `<p><span class="chat-username">${chat[message].user}</span><br>${chat[message].message}</p>`;
    }
    document.getElementById('Chat').innerHTML = output;
}

// Import data from data.json
import data from './assets/json/data.json' assert { type: "json" };

// Globally accessible variables
let currentServer = 'DOScord';
let currentChannel = NaN;

// Things to do on page load
window.onload = function () {
    loadServers();
    addServerListeners();
    addChannelListeners();
};

