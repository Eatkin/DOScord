const data = {
    "Servers": [
        {
            "name": "Radiobush",
            "image": "assets/img/radiobush.png",
            "channels": [
                {
                    "name": "Announcements",
                    "chat": [
                        {
                            "user": "VB Enthusiast",
                            "message": "G'day, mates! Welcome to the Ripper Radiobush Discord server, where we're chucking out a true-blue Aussie bonzer community of game developers and enthusiasts. Strap on your cork hat, grab a cold one, and get ready for a bloody ripper time!"
                        },
                        {
                            "user": "VB Enthusiast",
                            "message": "Mate, if you're keen on indie game development, you've come to the right place. We've got fair dinkum talent from all over Australia (and even a few cobbers from around the globe) who are working on some grouse games. Whether you're a seasoned developer or just starting out, this server is the ultimate spot to share ideas, collaborate, and have a yarn with likeminded folks."
                        },
                        {
                            "user": "VB Enthusiast",
                            "message": "Now, we know game dev can be a bit of a battler, but we're here to lend a helping hand. Our community is as tight-knit as a kangaroo's pouch, and we reckon that's pretty special. We've got channels for game design, coding, art, music, and everything in between. From brainstorming sessions to playtesting, we've got ya covered, mate!"
                        },
                        {
                            "user": "VB Enthusiast",
                            "message": "And let's not forget our love for the iconic VB (Victoria Bitter), the beverage that fuels our creative spirits. Our virtual pub, \"The VB Tavern\", is the place to chat, banter, and raise a glass with your fellow developers. Share your favorite VB-inspired game ideas or show off your collection of VB stubbies (empty or full, we don't judge)."
                        },
                        {
                            "user": "VB Enthusiast",
                            "message": "But wait, there's more! We've got bonza events lined up, like game jams, workshops, and even the occasional BBQ (virtual, of course). We believe in fostering a supportive environment, where everyone is as welcoming as a true blue Aussie at a backyard barbie."
                        },
                        {
                            "user": "VB Enthusiast",
                            "message": "So, what are you waiting for, mate? Throw another shrimp on the barbie and join us in the Ripper Radiobush Discord server! We'll have a rip-snorter of a time making games, talking about VB, and celebrating the Aussie spirit in the indie game dev scene. Fair dinkum, it doesn't get more Aussie than this!\nSee you on the flip side, cobbers!"
                        }
                    ]
                },
                {
                    "name": "The VB Tavern",
                    "chat": [
                        {
                            "user": "John",
                            "message": "Hello world!"
                        },
                        {
                            "user": "Sarah",
                            "message": "Hi there!"
                        }
                    ]
                }
            ],
            "users": [
                {
                    "name": "VB Enthusiast",
                    "status": "Having a VB, mate!",
                    "colour": "#FF00FF"
                },
                {
                    "name": "John",
                    "status": "online",
                    "colour": "#0000FF"
                },
                {
                    "name": "Sarah",
                    "status": "offline",
                    "colour": "#FF0000"
                }
            ]
        },
        {
            "name": "Bad games with Adrien",
            "image": "assets/img/bad-games-with-adrien.png",
            "channels": [
                {
                    "name": "Announcements",
                    "chat": [
                        {
                            "user": "Badrian",
                            "message": "Welcome to our server!"
                        }
                    ]
                },
                {
                    "name": "General",
                    "chat": [
                        {
                            "user": "John",
                            "message": "Hello world!"
                        },
                        {
                            "user": "Sarah",
                            "message": "Hi there!"
                        }
                    ]
                }
            ],
            "users": [
                {
                    "name": "Badrian",
                    "status": "Making bad games",
                    "colour": "#820082"
                },
                {
                    "name": "John",
                    "status": "online",
                    "colour": "#00FF00"
                },
                {
                    "name": "Sarah",
                    "status": "offline",
                    "colour": "#FFFF00"
                }
            ]
        }
    ]
}

function loadServers() {
    let servers = data.Servers;
    // Add the top server icon, which is the logo
    let output = `
                <div class="server-icon-container">
                    <img src="assets/img/DOScord-server-icon.png" class="server-icon" id="home-server" alt="DOScord logo">
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
            // Find and load the server
            let servers = data.Servers;
            serverIndex = -1;
            for (let server in servers) {
                serverIndex++;
                if (servers[server].name === e.target.getAttribute('data')) {
                    loadServer(servers[server]);
                    break;
                }
            }

            // Add the scroll bar to the chat window if it is not of id home-server
            if (e.target.id !== 'home-server') {
                document.getElementById('Chat').classList.add('scroll');
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

    // Add the user list to the user list window
    addUserList();
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
    // Create a hash table to contain user names and their respective colours
    let userColours = {};
    // Add the chat messages to the chat window
    let output = '';
    for (let message in chat) {
        let username = chat[message].user;
        // If the user is not in the hash table, add them with their colour
        if (!userColours.hasOwnProperty(username)) {
            // Search for the user in the data.json file
            let users = data["Servers"][serverIndex]["users"];
            for (let user of users) {
                if (user["name"] === username) {
                    userColours[username] = user["colour"];
                    break;
                }
            }
        }

        // Grab the user's colour from the hash table
        let userColour = userColours[username];

        output += `<p><span class="chat-username" style="color: ${userColour}">${username}</span><br>${chat[message].message}</p>`;
    }
    document.getElementById('Chat').innerHTML = output;

    // Scroll to the bottom of the chat window
    document.getElementById('Chat').scrollTop = document.getElementById('Chat').scrollHeight;
}

function addUserList() {
    // Find the users in the server
    let users = data["Servers"][serverIndex]["users"];
    // Clear out the user list
    let list = document.getElementById('members-list');
    list.innerHTML = '';

    // Create a hash table to contain user names and their respective colours
    let userColours = {};

    // Create a list item for each user
    let output = '';
    for (let user of users) {
        let username = user["name"];
        // If the user is not in the hash table, add them with their colour
        if (!userColours.hasOwnProperty(username)) {
            // Search for the user in the data.json file
            let users = data["Servers"][serverIndex]["users"];
            for (let user of users) {
                if (user["name"] === username) {
                    userColours[username] = user["colour"];
                    break;
                }
            }
        }

        // Grab the user's colour from the hash table
        let userColour = userColours[username];

        output += `<li class="member"><span style="color: ${user["colour"]}">${user["name"]}</span></li>
                    <li class="member-status">${user["status"]}</li>`;

        // Add the list items to the user list
        list.innerHTML = output;
    }
}

function addHomeListener() {
    document.getElementById('home-server').addEventListener('click', function () {
        // Set server and channel text to DOScord and restore default variables 
        currentServer = 'DOScord';
        document.getElementById('Server-Name').innerHTML = currentServer;
        currentChannel = NaN;
        document.getElementById('Channel-Name').innerHTML = "DOScord";

        // Set the chat to the placeholder text
        let chatPlaceholder = `<p>Welcome to DOScord!</p>
                <p>DOScord is a static website built in the style of Discord, but with a DOS theme.</p>
                <p>Feel free to explore servers, channels and chats and see what people are talking about!</p>`
        document.getElementById('Chat').innerHTML = chatPlaceholder;

        // Clear out the channel list
        document.getElementById('Channels').innerHTML = '';

        // Remove the scroll bar from the chat window
        document.getElementById('Chat').classList.remove('scroll');

        // Clear out the user list
        document.getElementById('members-list').innerHTML = '';
    });
}

// Globally accessible variables
let currentServer = 'DOScord';
let serverIndex = 0;
let currentChannel = NaN;

// Things to do on page load
window.onload = function () {
    loadServers();
    addServerListeners();
    addChannelListeners();
    addHomeListener();
};

