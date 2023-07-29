const Servers = {
    "Servers": [
        {
            "id": 1,
            "name": "Radiobush",
            "image": "assets/img/radiobush.png",
        },
        {
            "id": 2,
            "name": "Bad games with Adrien",
            "image": "assets/img/bad-games-with-adrien.png",
        }
    ]
}

const Channels = {
    "Channels": [
        {
            "id": 1,
            "server_id": 1,
            "name": "Announcements"
        },
        {
            "id": 2,
            "server_id": 1,
            "name": "The VB Tavern"
        },
        {
            "id": 3,
            "server_id": 2,
            "name": "Announcements"
        },
        {
            "id": 4,
            "server_id": 2,
            "name": "General"
        }
    ]
}

const Users = {
    "Users": [
        {
            "id": 1,
            "server_membership": [1],
            "name": "VB Enthusiast",
            "status": "Having a VB, mate!",
            "colour": "#FF00FF"
        },
        {
            "id": 2,
            "server_membership": [1, 2],
            "name": "John",
            "status": "online",
            "colour": "#0000FF"
        },
        {
            "id": 3,
            "server_membership": [1, 2],
            "name": "Sarah",
            "status": "offline",
            "colour": "#FF0000"
        },
        {
            "id": 4,
            "server_membership": [2],
            "name": "Badrian",
            "status": "Making bad games",
            "colour": "#820082"
        }
    ]
}

const Messages = {
    "Messages": [
        {
            "id": 1,
            "channel_id": 1,
            "user_id": 1,
            "message": "G'day, mates! Welcome to the Ripper Radiobush Discord server, where we're chucking out a true-blue Aussie bonzer community of game developers and enthusiasts. Strap on your cork hat, grab a cold one, and get ready for a bloody ripper time!",
            "timestamp": "2021-05-01T12:00:00Z"
        },
        {
            "id": 2,
            "channel_id": 1,
            "user_id": 1,
            "message": "Mate, if you're keen on indie game development, you've come to the right place. We've got fair dinkum talent from all over Australia (and even a few cobbers from around the globe) who are working on some grouse games. Whether you're a seasoned developer or just starting out, this server is the ultimate spot to share ideas, collaborate, and have a yarn with likeminded folks.",
            "timestamp": "2021-05-01T12:01:00Z"
        },
        {
            "id": 3,
            "channel_id": 1,
            "user_id": 1,
            "message": "Now, we know game dev can be a bit of a battler, but we're here to lend a helping hand. Our community is as tight-knit as a kangaroo's pouch, and we reckon that's pretty special. We've got channels for game design, coding, art, music, and everything in between. From brainstorming sessions to playtesting, we've got ya covered, mate!",
            "timestamp": "2021-05-01T12:02:00Z"
        },
        {
            "id": 4,
            "channel_id": 1,
            "user_id": 1,
            "message": "And let's not forget our love for the iconic VB (Victoria Bitter), the beverage that fuels our creative spirits. Our virtual pub, \"The VB Tavern\", is the place to chat, banter, and raise a glass with your fellow developers. Share your favorite VB-inspired game ideas or show off your collection of VB stubbies (empty or full, we don't judge).",
            "timestamp": "2021-05-01T12:03:00Z"
        },
        {
            "id": 5,
            "channel_id": 1,
            "user_id": 1,
            "message": "But wait, there's more! We've got bonza events lined up, like game jams, workshops, and even the occasional BBQ (virtual, of course). We believe in fostering a supportive environment, where everyone is as welcoming as a true blue Aussie at a backyard barbie.",
            "timestamp": "2021-05-01T12:04:00Z"
        },
        {
            "id": 6,
            "channel_id": 1,
            "user_id": 1,
            "message": "So, what are you waiting for, mate? Throw another shrimp on the barbie and join us in the Ripper Radiobush Discord server! We'll have a rip-snorter of a time making games, talking about VB, and celebrating the Aussie spirit in the indie game dev scene. Fair dinkum, it doesn't get more Aussie than this!\nSee you on the flip side, cobbers!",
            "timestamp": "2021-05-01T12:05:00Z"
        },
        {
            "id": 7,
            "channel_id": 2,
            "user_id": 2,
            "message": "Hello world!",
            "timestamp": "2021-05-01T12:06:00Z"
        },
        {
            "id": 8,
            "channel_id": 2,
            "user_id": 3,
            "message": "Hi there!",
            "timestamp": "2021-05-01T12:07:00Z"
        },
        {
            "id": 9,
            "channel_id": 3,
            "user_id": 4,
            "message": "Welcome to our server!",
            "timestamp": "2021-05-01T12:08:00Z"
        },
        {
            "id": 10,
            "channel_id": 4,
            "user_id": 2,
            "message": "Hello world!",
            "timestamp": "2021-05-01T12:09:00Z"
        },
        {
            "id": 11,
            "channel_id": 4,
            "user_id": 3,
            "message": "Hi there!",
            "timestamp": "2021-05-01T12:10:00Z"
        },
    ]
}

// Get operations for data
// Return a list of channels by server ID
function getChannelsForServer(serverId) {
    let channels = [];
    for (let channel of Channels["Channels"]) {
        if (channel["server_id"] === serverId) {
            channels.push(channel);
        }
    }
    return channels;
}

// Return a list of users by server ID
function getUsersForServer(serverId) {
    let users = [];
    for (let user of Users["Users"]) {
        if (user["server_membership"].includes(serverId)) {
            users.push(user);
        }
    }
    return users;
}

// Return a list of chat messages by channel ID
function getChatForChannel(channelId) {
    let messages = [];
    for (let message of Messages["Messages"]) {
        if (message["channel_id"] === channelId) {
            messages.push(message);
        }
    }
    return messages;
}

// Function to create the list of servers in the side bar
function loadServers() {
    // Add the top server icon, which is the logo
    let output = `
                <div class="server-icon-container">
                    <img src="assets/img/DOScord-server-icon.png" class="server-icon" id="home-server" alt="DOScord logo">
                </div>
                `;

    // Add remaining servers in the format <img src=server[i].image class="server-icon" alt=server[i].name>
    for (let server of Servers["Servers"]) {
        output += `
                    <img src="${server["image"]}" data="${server["name"]}" class="server-icon" alt="${server["name"]} ">
                    `;
    }
    document.getElementById('Servers').innerHTML = output;
}

// Function to add event listeners to the server icons
function addServerListeners() {
    // Attach a click listener to server-icon-container
    document.getElementById('Servers').addEventListener('click', function (e) {
        // If the click target is a server icon
        if (e.target.classList.contains('server-icon')) {
            // Find and load the server
            for (let server of Servers["Servers"]) {
                if (server["name"] === e.target.getAttribute('data')) {
                    loadServer(server);
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

// Function to load the server into the main window
function loadServer(server) {
    // Add the server name to the title
    currentServer = server;
    document.getElementById('Server-Name').innerHTML = server["name"];

    // Load the channels for the server
    let channels = getChannelsForServer(currentServer["id"]);

    // Set the channel name to the first channel in the server
    currentChannel = channels[0];
    document.getElementById('Channel-Name').innerHTML = currentChannel["name"];

    // Load the chat messages from the first channel in the server
    let chat = getChatForChannel(currentChannel["id"]);
    parseChat(chat);

    // Add the channel names to the channel list
    let channelOutput = '';
    for (let channel of channels) {
        let channelName = channel["name"];
        let classes = (channelName === currentChannel["name"]) ? 'channel-item active' : 'channel-item';
        channelOutput += `<li class="${classes}" data="${channelName}">#${channelName}</li>`;
    }
    document.getElementById('Channels').innerHTML = channelOutput;

    // Get users
    let users = getUsersForServer(currentServer["id"]);

    // Add the user list to the user list window
    addUserList(users);
}

// Function to add listeners to the channel list
function addChannelListeners() {
    document.getElementById('Channels').addEventListener('click', function (e) {
        // If the click target is a channel (list item with class channel-item)
        if (e.target.classList.contains('channel-item')) {
            // Get the data attribute of the channel
            let channelName = e.target.getAttribute('data');

            // Find the current channel
            let channels = getChannelsForServer(currentServer["id"]);
            for (let channel of channels) {
                if (channel["name"] === channelName) {
                    currentChannel = channel;
                    break;
                }
            }

            // Set the channel name to the clicked channel
            document.getElementById('Channel-Name').innerHTML = currentChannel["name"]

            // Load the chat messages from the clicked channel
            let chat = getChatForChannel(currentChannel["id"]);
            parseChat(chat);

            // Now set the clicked channel to active and the rest to inactive
            let channelElements = document.getElementsByClassName('channel-item');
            for (let channel of channelElements) {
                channel.classList.remove('active');
            }
            e.target.classList.add('active');
        }
    });
}

// Creates the chat window
function parseChat(chat) {
    // Create a hash table to contain user ids, names and colours
    let userColours = {};
    let userNames = {};

    // Get the users for the current server
    let users = getUsersForServer(currentServer["id"]);

    // Loop through the users and add them to the hash table
    for (let user of users) {
        let userId = user["id"];
        userColours[userId] = user["colour"];
        userNames[userId] = user["name"];
    }

    console.log(chat);

    // Add the chat messages to the chat window
    let output = '';
    for (let message of chat) {
        // Get the user information
        let userId = message["user_id"];
        console.log(userId);
        let username = userNames[userId];
        let userColour = userColours[userId];

        output += `<p><span class="chat-username" style="color: ${userColour}">${username}</span><br>${message["message"]}</p>`;
    }

    // Add the chat messages to the chat window
    document.getElementById('Chat').innerHTML = output;

    // Scroll to the bottom of the chat window
    document.getElementById('Chat').scrollTop = document.getElementById('Chat').scrollHeight;
}

function addUserList() {
    // Find the users in the server
    let users = getUsersForServer(currentServer["id"]);
    // Clear out the user list
    let list = document.getElementById('members-list');
    list.innerHTML = '';

    // Create a list item for each user
    let output = '';
    for (let user of users) {
        output += `<li class="member"><span style="color: ${user["colour"]}">${user["name"]}</span></li>
                    <li class="member-status">${user["status"]}</li>`;

        // Add the list items to the user list
        list.innerHTML = output;
    }
}

function addHomeListener() {
    document.getElementById('home-server').addEventListener('click', function () {
        // Set server and channel text to DOScord and restore default variables (-1 for server and channel)
        currentServer = -1;
        document.getElementById('Server-Name').innerHTML = currentServer;
        currentChannel = -1;
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
let currentServer = -1;
let currentChannel = -1;

// Things to do on page load
window.onload = function () {
    loadServers();
    addServerListeners();
    addChannelListeners();
    addHomeListener();
};

