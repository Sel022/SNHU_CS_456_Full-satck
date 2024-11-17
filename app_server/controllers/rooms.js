var fs = require('fs');
var roomsData = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));

const rooms = (req, res) => {
    res.render('rooms',{title: 'Travlr Getaways - Rooms', roomsData});
};

module.exports = {
    rooms
};