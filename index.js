

// ENTER YOUR INFORMATION HERE
var APP_ID = 'ENTER YOUR SENDBIRD APPLICATION HERE';
var API_TOKEN = 'ENTER YOUR API-TOKEN HERE';


var USER_ID;
var ACCESS_TOKEN;
const UNIQUE_HANDLER_ID = '1234567890';
var lastChannelSelected;
var lastChannelSelectedIsOpen = false;
var lastMessageList;
var groupChannelList;
var connectedUser;
var sb = new SendBird({ appId: APP_ID });


/**
 * FRIENDS API
 * From platform API
 */
function getAllowFriendDiscovery() {
    axios.get('https://api-' + APP_ID + '.sendbird.com/v3/users/' + USER_ID + '/allow_friend_discovery', {
        headers: {
            'Api-Token': API_TOKEN
        }
    }).then((response) => {
        console.log(response ? response.data : 'No response!');
    })
}

function setAllowFriendDiscovery() {
    const value = document.getElementById('allowFriendsDiscoveryValue').value == 'yes' ? true : false;
    axios.put('https://api-' + APP_ID + '.sendbird.com/v3/users/' + USER_ID + '/allow_friend_discovery', {
        allow_friend_discovery: value
    }, {
        headers: {
            'Api-Token': API_TOKEN
        }
    }).then((response) => {
        console.log(response ? response.data : 'No response!');
    })
}

function addPersonalDiscoveryKey() {
    const myPersonalDiscoveryKey = document.getElementById('myPersonalDiscoveryKey').value;
    axios.put('https://api-' + APP_ID + '.sendbird.com/v3/users/' + USER_ID, {
        discovery_keys: [
            myPersonalDiscoveryKey
        ]
    }, {
        headers: {
            'Api-Token': API_TOKEN
        }
    }).then((response) => {
        console.log(response ? response.data : 'No response!');
    })
}


/**
 * FRIENDS API
 * From SDK
 */
function getAllowFriendDiscoverySDK() {
    sb.getAllowFriendDiscovery((error, allowed) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Allowed: ' + allowed);
        }
    });
}

function setAllowFriendDiscoverySDK() {
    const value = document.getElementById('allowFriendsDiscoveryValueSDK').value == 'yes' ? true : false;
    sb.setAllowFriendDiscovery(value, error => {
        if (error) {
            console.log(error);
        } else {
            console.log('Done');
        }
    });
}

function uploadUserUniqueKeySDK() {
    const uniqueKey = document.getElementById('userUniqueKeySDK').value
    const userUniqueKeyName = document.getElementById('userUniqueKeyNameSDK').value
    var discoveryMap = [
        {
            'friendDiscoveryKey': uniqueKey,
            'friendName': userUniqueKeyName
        },
    ]
    sb.uploadFriendDiscoveries(discoveryMap, (response, error) => {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
        }
    });
}

function ignoreThisKeysWhenDiscoveringFriends() {
    const value = document.getElementById('userUniqueKeyToIgnoreSDK').value;
    var discoveryKeys = [
        value
    ];
    sb.deleteFriendDiscoveries(discoveryKeys, (response, error) => {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
        }
    });
}

function addFriendSDK(userId = null) {
    var friendIds = [];
    if (userId) {
        friendIds.push(userId);
    } else {
        friendIds.push(document.getElementById('addUserAsFriendSDK').value);
    }
    sb.addFriends(friendIds, (response, error) => {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
        }
    });
}

function removeFriendSDK() {
    var friendIds = [
        document.getElementById('userIdRemoveSDK').value
    ];
    sb.deleteFriends(friendIds, (response, error) => {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
        }
    });
}

function getAllMyFriendsSDK() {
    var friendListQuery = sb.createFriendListQuery();
    friendListQuery.next((users, error) => {
        if (error) {
            console.log(error);
        } else {
            console.log(users);
        }
    });
}




/**
 * SDK FUNCTIONS
 */

function connect() {
    USER_ID = document.getElementById('userId').value;
    ACCESS_TOKEN = document.getElementById('accessToken').value;
    sb.connect(USER_ID, ACCESS_TOKEN, (user, error) => {
        connectedUser = user;
        document.getElementById('connectionStatus').style.display = 'none';
        document.getElementById('contentDiv').style.display = 'block';
        addUserHandler();
    });
}


function addUserHandler() {
    var userEventHandler = new sb.UserEventHandler();
    userEventHandler.onFriendsDiscovered = (users) => {
        console.log('YOU HAVE NEW FRIENDS', users);
        for (let user of users) {
            addFriendSDK(user.userId);
        }
    };
    sb.addUserEventHandler(UNIQUE_HANDLER_ID, userEventHandler);
}
